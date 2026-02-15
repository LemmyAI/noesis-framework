import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

// GET /api/relations - List relations with optional traversal
router.get('/', async (req: Request, res: Response) => {
  try {
    const { entity, type, context, depth, traversable } = req.query;

    if (!entity) {
      // List all relations with optional type/context filters
      let sql = 'SELECT * FROM relations WHERE 1=1';
      const params: any[] = [];
      let idx = 1;

      if (type) {
        sql += ` AND type = $${idx++}`;
        params.push(type);
      }
      if (context) {
        sql += ` AND context = $${idx++}`;
        params.push(context);
      }

      sql += ' ORDER BY context, narrative_sequence';
      const result = await db.query(sql, params);
      return res.json({ count: result.rows.length, relations: result.rows });
    }

    const maxDepth = depth ? parseInt(depth as string) : 2;
    const traversableOnly = traversable === 'true';

    const { relations, cycles } = await traverseRelations(
      entity as string, 
      maxDepth, 
      traversableOnly,
      type as string | undefined,
      context as string | undefined
    );

    // Enrich relations with inline entity data if requested
    if (req.query.enrich === 'true') {
      const allIds = new Set<string>();
      for (const rel of relations) {
        allIds.add(rel.from_entity);
        allIds.add(rel.to_entity);
      }
      if (allIds.size > 0) {
        const entResult = await db.query(
          'SELECT id, name, type, namespace FROM entities WHERE id = ANY($1) AND is_latest = TRUE',
          [Array.from(allIds)]
        );
        const lookup: Record<string, any> = {};
        for (const row of entResult.rows) {
          lookup[row.id] = { id: row.id, name: row.name, type: row.type, namespace: row.namespace };
        }
        for (const rel of relations) {
          rel.from_entity = lookup[rel.from_entity] || { id: rel.from_entity };
          rel.to_entity = lookup[rel.to_entity] || { id: rel.to_entity };
        }
      }
    }

    res.json({ 
      entity, 
      depth: maxDepth, 
      count: relations.length,
      relations, 
      cycles 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Traverse relations with cycle detection
async function traverseRelations(
  startEntity: string, 
  maxDepth: number,
  traversableOnly: boolean,
  filterType?: string,
  filterContext?: string
) {
  const visited = new Set<string>();
  const relations: any[] = [];
  const cycles: any[] = [];

  // Get traversable relation types from namespace config
  let traversableTypes: string[] = [];
  if (traversableOnly) {
    const configResult = await db.query(
      `SELECT config->'relations' as relations FROM namespace_configs WHERE namespace = 'default'`
    );
    if (configResult.rows.length > 0) {
      const relationsConfig = configResult.rows[0].relations;
      traversableTypes = Object.entries(relationsConfig || {})
        .filter(([_name, props]: [string, any]) => props.traversable)
        .map(([name]) => name);
    }
  }

  async function traverse(entity: string, path: string[], currentDepth: number) {
    if (currentDepth > maxDepth) return;

    let sql = 'SELECT * FROM relations WHERE (from_entity = $1 OR to_entity = $1)';
    const params: any[] = [entity];
    let pIdx = 2;

    if (traversableOnly && traversableTypes.length > 0) {
      sql += ` AND type IN (${traversableTypes.map((_, i) => `$${i + pIdx}`).join(',')})`;
      params.push(...traversableTypes);
      pIdx += traversableTypes.length;
    }

    if (filterType) {
      sql += ` AND type = $${pIdx++}`;
      params.push(filterType);
    }

    if (filterContext) {
      sql += ` AND context = $${pIdx++}`;
      params.push(filterContext);
    }

    const result = await db.query(sql, params);

    for (const rel of result.rows) {
      const nextEntity = rel.from_entity === entity ? rel.to_entity : rel.from_entity;
      const relKey = `${[rel.from_entity, rel.to_entity].sort().join('-')}-${rel.type}`;

      // Check for cycle
      if (path.includes(nextEntity)) {
        cycles.push({
          path: [...path, nextEntity],
          relation_type: rel.type,
        });
        continue;
      }

      // Avoid duplicate relations
      if (visited.has(relKey)) continue;
      visited.add(relKey);

      relations.push(rel);
      await traverse(nextEntity, [...path, nextEntity], currentDepth + 1);
    }
  }

  await traverse(startEntity, [startEntity], 0);
  return { relations, cycles };
}

export default router;
