import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

// GET /api/datalayer - List source evidence with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { entity_id, source_type, source_name, from, to } = req.query;

    let sql = 'SELECT * FROM datalayer WHERE 1=1';
    const params: any[] = [];
    let idx = 1;

    if (entity_id) {
      sql += ` AND entity_id = $${idx++}`;
      params.push(entity_id);
    }

    if (source_type) {
      sql += ` AND source_type = $${idx++}`;
      params.push(source_type);
    }

    if (source_name) {
      sql += ` AND source_name = $${idx++}`;
      params.push(source_name);
    }

    if (from) {
      sql += ` AND published_at >= $${idx++}`;
      params.push(from);
    }

    if (to) {
      sql += ` AND published_at <= $${idx++}`;
      params.push(to);
    }

    sql += ' ORDER BY published_at DESC NULLS LAST, fetched_at DESC';

    const result = await db.query(sql, params);
    res.json({ count: result.rows.length, sources: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/datalayer/:id - Get specific source by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM datalayer WHERE id = $1', [parseInt(id)]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'not_found', source_id: id });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/datalayer/by-entity/:entityId - All sources for an entity
router.get('/by-entity/:entityId', async (req: Request, res: Response) => {
  try {
    const { entityId } = req.params;
    const result = await db.query(
      'SELECT * FROM datalayer WHERE entity_id = $1 ORDER BY published_at DESC NULLS LAST',
      [entityId]
    );
    res.json({
      entity_id: entityId,
      count: result.rows.length,
      sources: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
