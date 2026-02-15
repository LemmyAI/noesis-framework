import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

// GET /api/narratives - List narrative contexts, optionally scoped by namespace
router.get('/', async (req: Request, res: Response) => {
  try {
    const { namespace, descendants } = req.query;
    const includeDescendants = descendants !== 'false'; // default true

    if (namespace) {
      // Scoped: only narratives where at least one entity belongs to the namespace
      let sql = `
        SELECT r.context, COUNT(DISTINCT r.id) as relation_count,
          COUNT(DISTINCT x.eid) as entity_count
        FROM relations r
        JOIN (
          SELECT id as eid, namespace FROM entities WHERE is_latest = TRUE
        ) x ON (x.eid = r.from_entity OR x.eid = r.to_entity)
        WHERE r.context IS NOT NULL
          AND (x.namespace = $1`;

      if (includeDescendants) {
        sql += ` OR x.namespace LIKE $1 || '.%'`;
      }

      sql += `)
        GROUP BY r.context
        ORDER BY relation_count DESC`;

      const result = await db.query(sql, [namespace]);
      return res.json({ namespace, count: result.rows.length, narratives: result.rows });
    }

    // Default: all narratives
    const result = await db.query(`
      SELECT 
        context,
        COUNT(*) as relation_count,
        MIN(narrative_sequence) as min_sequence,
        MAX(narrative_sequence) as max_sequence
      FROM relations
      WHERE context IS NOT NULL
      GROUP BY context
      ORDER BY context
    `);

    res.json({ count: result.rows.length, narratives: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/narratives/:context - Get full story with sequence
router.get('/:context', async (req: Request, res: Response) => {
  try {
    const { context } = req.params;

    // Get relations ordered by narrative_sequence
    const relationsResult = await db.query(`
      SELECT * FROM relations
      WHERE context = $1
      ORDER BY narrative_sequence ASC
    `, [context]);

    if (relationsResult.rows.length === 0) {
      return res.status(404).json({ 
        error: 'narrative_not_found', 
        context 
      });
    }

    // Get unique entities involved
    const entityIds = new Set<string>();
    relationsResult.rows.forEach((rel: any) => {
      entityIds.add(rel.from_entity);
      entityIds.add(rel.to_entity);
    });

    const entitiesResult = await db.query(
      `SELECT * FROM entities WHERE id = ANY($1) AND is_latest = TRUE`,
      [Array.from(entityIds)]
    );

    // Build story sequence
    const story = relationsResult.rows.map((rel: any) => ({
      sequence: rel.narrative_sequence,
      relation: rel,
      from_entity: entitiesResult.rows.find((e: any) => e.id === rel.from_entity),
      to_entity: entitiesResult.rows.find((e: any) => e.id === rel.to_entity),
    }));

    // Summary format: agent-friendly prose digest
    if (req.query.format === 'summary') {
      // Build causal chains from narrative sequence
      const chains: string[] = [];
      let currentChain: string[] = [];
      let lastTo: string | null = null;

      for (const step of story) {
        const fromName = step.from_entity?.name || step.relation.from_entity;
        const toName = step.to_entity?.name || step.relation.to_entity;

        if (lastTo === null || step.relation.from_entity !== lastTo) {
          // Start new chain
          if (currentChain.length > 0) chains.push(currentChain.join(' → '));
          currentChain = [fromName, toName];
        } else {
          currentChain.push(toName);
        }
        lastTo = step.relation.to_entity;
      }
      if (currentChain.length > 0) chains.push(currentChain.join(' → '));

      // Timeline bounds
      const timestamps = entitiesResult.rows
        .filter((e: any) => e.temporal?.timestamp)
        .map((e: any) => new Date(e.temporal.timestamp).getTime());
      const earliest = timestamps.length > 0 ? new Date(Math.min(...timestamps)).toISOString() : null;
      const latest = timestamps.length > 0 ? new Date(Math.max(...timestamps)).toISOString() : null;

      // Key actors: entities with most relation appearances
      const actorCount: Record<string, number> = {};
      for (const rel of relationsResult.rows) {
        actorCount[rel.from_entity] = (actorCount[rel.from_entity] || 0) + 1;
        actorCount[rel.to_entity] = (actorCount[rel.to_entity] || 0) + 1;
      }
      const keyActors = Object.entries(actorCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id, count]) => {
          const e = entitiesResult.rows.find((e: any) => e.id === id);
          return { id, name: e?.name || id, type: e?.type || 'unknown', role_count: count };
        });

      // Text summary
      const summaryParts = story.map((s: any) => {
        const from = s.from_entity?.name || s.relation.from_entity;
        const to = s.to_entity?.name || s.relation.to_entity;
        return `${from} (${s.from_entity?.type || '?'}) ${s.relation.type} ${to} (${s.to_entity?.type || '?'})`;
      });

      return res.json({
        context,
        summary: summaryParts.join('; '),
        entity_count: entitiesResult.rows.length,
        relation_count: relationsResult.rows.length,
        timeline: { earliest, latest },
        key_actors: keyActors,
        causal_chains: chains,
      });
    }

    res.json({
      context,
      relation_count: relationsResult.rows.length,
      entities: entitiesResult.rows,
      story,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
