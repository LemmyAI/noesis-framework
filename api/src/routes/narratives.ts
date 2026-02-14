import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

// GET /api/narratives - List all narrative contexts
router.get('/', async (req: Request, res: Response) => {
  try {
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
