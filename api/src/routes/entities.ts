import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

// GET /api/entities - List entities with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { 
      type, 
      namespace, 
      key, 
      category, 
      is_latest, 
      all_versions, 
      version,
      from,
      to,
      precision
    } = req.query;

    let sql = 'SELECT * FROM entities WHERE 1=1';
    const params: any[] = [];
    let idx = 1;

    if (type) {
      sql += ` AND type = $${idx++}`;
      params.push(type);
    }

    if (namespace) {
      sql += ` AND namespace = $${idx++}`;
      params.push(namespace);
    }

    if (key) {
      sql += ` AND key = $${idx++}`;
      params.push(key);
    }

    if (category) {
      sql += ` AND metadata->>'category' LIKE $${idx++}`;
      params.push(`${category}%`);
    }

    if (precision) {
      sql += ` AND temporal->>'precision' = $${idx++}`;
      params.push(precision);
    }

    if (from) {
      sql += ` AND (temporal->>'timestamp')::timestamptz >= $${idx++}`;
      params.push(from);
    }

    if (to) {
      sql += ` AND (temporal->>'timestamp')::timestamptz <= $${idx++}`;
      params.push(to);
    }

    // Version handling
    if (all_versions === 'true') {
      sql += ' ORDER BY id, version_number DESC';
    } else if (version) {
      sql += ` AND version_number = $${idx++}`;
      params.push(parseInt(version as string));
    } else {
      sql += ' AND is_latest = TRUE';
    }

    const result = await db.query(sql, params);
    res.json({ count: result.rows.length, entities: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/entities/by-key/:key - Find all entities with this key
router.get('/by-key/:key', async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const result = await db.query(
      'SELECT * FROM entities WHERE key = $1 AND is_latest = TRUE',
      [key]
    );
    res.json({ 
      key, 
      count: result.rows.length, 
      entities: result.rows 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/entities/:id - Get entity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { version, all_versions } = req.query;

    if (all_versions === 'true') {
      const result = await db.query(
        'SELECT * FROM entities WHERE id = $1 ORDER BY version_number DESC',
        [id]
      );
      return res.json({ count: result.rows.length, entities: result.rows });
    }

    if (version) {
      const result = await db.query(
        'SELECT * FROM entities WHERE id = $1 AND version_number = $2',
        [id, parseInt(version as string)]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ 
          error: 'version_not_found',
          entity_id: id,
          requested_version: version 
        });
      }
      return res.json(result.rows[0]);
    }

    // Default: latest version
    const result = await db.query(
      'SELECT * FROM entities WHERE id = $1 AND is_latest = TRUE',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'not_found', entity_id: id });
    }
    
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
