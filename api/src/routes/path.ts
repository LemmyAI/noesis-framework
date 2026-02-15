import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

// GET /api/path?from=X&to=Y&type=causes&maxDepth=6&enrich=true
router.get('/', async (req: Request, res: Response) => {
  try {
    const { from, to, type, maxDepth, enrich, traversable } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        error: 'missing_params',
        message: 'Provide ?from=entityId&to=entityId',
      });
    }

    const fromId = from as string;
    const toId = to as string;
    const filterType = type as string | undefined;
    const max = Math.min(Math.max(parseInt(maxDepth as string) || 6, 1), 10);
    const traversableOnly = traversable === 'true';

    // Same entity
    if (fromId === toId) {
      return res.json({ from: fromId, to: toId, found: true, depth: 0, paths: [] });
    }

    // Get traversable types if needed
    let traversableTypes: string[] = [];
    if (traversableOnly) {
      const configResult = await db.query(
        `SELECT config->'relations' as relations FROM namespace_configs WHERE namespace = 'default'`
      );
      if (configResult.rows.length > 0) {
        const relationsConfig = configResult.rows[0].relations;
        traversableTypes = Object.entries(relationsConfig || {})
          .filter(([, props]: [string, any]) => props.traversable)
          .map(([name]) => name);
      }
    }

    // BFS from source to target
    const paths = await findPaths(fromId, toId, max, filterType, traversableTypes);

    // Enrich paths with entity data if requested
    if (enrich === 'true' && paths.length > 0) {
      const allIds = new Set<string>();
      for (const path of paths) {
        for (const step of path) {
          allIds.add(step.from);
          allIds.add(step.to);
        }
      }
      const entityResult = await db.query(
        `SELECT id, name, type, namespace FROM entities WHERE id = ANY($1) AND is_latest = TRUE`,
        [Array.from(allIds)]
      );
      const lookup: Record<string, any> = {};
      for (const row of entityResult.rows) {
        lookup[row.id] = { id: row.id, name: row.name, type: row.type, namespace: row.namespace };
      }

      const enrichedPaths = paths.map(path => {
        const steps = path.map(step => ({
          from: lookup[step.from] || { id: step.from },
          relation: step.type,
          to: lookup[step.to] || { id: step.to },
          context: step.context,
          sequence: step.narrative_sequence,
        }));
        const summary = steps.map(s =>
          `${(s.from as any).name || s.from} →(${s.relation})→ ${(s.to as any).name || s.to}`
        ).join(', ');
        return { length: steps.length, steps, summary };
      });

      return res.json({
        from: fromId,
        to: toId,
        found: true,
        depth: enrichedPaths[0]?.length || 0,
        paths: enrichedPaths,
      });
    }

    // Non-enriched response
    if (paths.length === 0) {
      return res.json({ from: fromId, to: toId, found: false, paths: [] });
    }

    const formattedPaths = paths.map(path => {
      const steps = path.map(step => ({
        from: step.from,
        relation: step.type,
        to: step.to,
        context: step.context,
        sequence: step.narrative_sequence,
      }));
      const summary = steps.map(s => `${s.from} →(${s.relation})→ ${s.to}`).join(', ');
      return { length: steps.length, steps, summary };
    });

    res.json({
      from: fromId,
      to: toId,
      found: true,
      depth: formattedPaths[0]?.length || 0,
      paths: formattedPaths,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// BFS path finder — returns all shortest paths (capped at 10)
async function findPaths(
  fromId: string,
  toId: string,
  maxDepth: number,
  filterType?: string,
  traversableTypes?: string[]
): Promise<any[][]> {
  // parent map: entityId → array of { parent, relation }
  const parents: Record<string, Array<{ parent: string; relation: any }>> = {};
  parents[fromId] = [];

  const queue: string[] = [fromId];
  let found = false;
  let currentDepth = 0;

  while (queue.length > 0 && currentDepth < maxDepth && !found) {
    const levelSize = queue.length;
    const nextQueue: string[] = [];

    for (let i = 0; i < levelSize; i++) {
      const current = queue[i];

      // Get outgoing relations (directional: from_entity = current)
      let sql = 'SELECT * FROM relations WHERE from_entity = $1';
      const params: any[] = [current];
      let pIdx = 2;

      if (filterType) {
        sql += ` AND type = $${pIdx++}`;
        params.push(filterType);
      }

      if (traversableTypes && traversableTypes.length > 0) {
        sql += ` AND type IN (${traversableTypes.map((_, i) => `$${i + pIdx}`).join(',')})`;
        params.push(...traversableTypes);
      }

      const result = await db.query(sql, params);

      for (const rel of result.rows) {
        const next = rel.to_entity;

        if (next === fromId) continue; // no going back to start

        // If we haven't visited this node yet at this BFS level
        if (!parents[next]) {
          parents[next] = [{ parent: current, relation: rel }];
          nextQueue.push(next);
          if (next === toId) found = true;
        } else if (!found) {
          // Multiple parents at same depth = multiple shortest paths
          parents[next].push({ parent: current, relation: rel });
        }
      }
    }

    queue.length = 0;
    queue.push(...nextQueue);
    currentDepth++;
  }

  if (!found) return [];

  // Reconstruct all shortest paths via backtracking
  const allPaths: any[][] = [];
  const MAX_PATHS = 10;

  function backtrack(node: string, path: any[]) {
    if (allPaths.length >= MAX_PATHS) return;
    if (node === fromId) {
      allPaths.push([...path].reverse());
      return;
    }
    for (const { parent, relation } of parents[node] || []) {
      path.push({
        from: relation.from_entity,
        to: relation.to_entity,
        type: relation.type,
        context: relation.context,
        narrative_sequence: relation.narrative_sequence,
      });
      backtrack(parent, path);
      path.pop();
    }
  }

  backtrack(toId, []);
  return allPaths;
}

export default router;
