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

    const entity = result.rows[0];

    // Enriched response: entity + relations (with resolved names) + sources + narratives
    if (req.query.enrich === 'true') {
      const [relResult, dlResult] = await Promise.all([
        db.query(
          'SELECT * FROM relations WHERE from_entity = $1 OR to_entity = $1',
          [id]
        ),
        db.query(
          'SELECT * FROM datalayer WHERE entity_id = $1 ORDER BY published_at DESC NULLS LAST',
          [id]
        ),
      ]);

      // Collect all connected entity IDs and batch-fetch
      const connectedIds = new Set<string>();
      for (const rel of relResult.rows) {
        connectedIds.add(rel.from_entity);
        connectedIds.add(rel.to_entity);
      }
      connectedIds.delete(id);

      let entityLookup: Record<string, any> = {};
      if (connectedIds.size > 0) {
        const entResult = await db.query(
          'SELECT id, name, type, namespace FROM entities WHERE id = ANY($1) AND is_latest = TRUE',
          [Array.from(connectedIds)]
        );
        for (const row of entResult.rows) {
          entityLookup[row.id] = { id: row.id, name: row.name, type: row.type, namespace: row.namespace };
        }
      }

      // Get inverse names from default namespace config
      const configResult = await db.query(
        `SELECT config->'relations' as relations FROM namespace_configs WHERE namespace = 'default'`
      );
      const relConfig = configResult.rows[0]?.relations || {};

      // Split relations into incoming/outgoing with resolved entity data
      const outgoing: any[] = [];
      const incoming: any[] = [];
      const narrativeContexts = new Set<string>();

      for (const rel of relResult.rows) {
        if (rel.context) narrativeContexts.add(rel.context);

        if (rel.from_entity === id) {
          outgoing.push({
            type: rel.type,
            target: entityLookup[rel.to_entity] || { id: rel.to_entity },
            context: rel.context || undefined,
            sequence: rel.narrative_sequence || undefined,
            metadata: rel.metadata && Object.keys(rel.metadata).length > 0 ? rel.metadata : undefined,
          });
        } else {
          const inverseName = relConfig[rel.type]?.inverse || rel.type;
          incoming.push({
            type: inverseName,
            original_type: rel.type,
            source: entityLookup[rel.from_entity] || { id: rel.from_entity },
            context: rel.context || undefined,
            sequence: rel.narrative_sequence || undefined,
            metadata: rel.metadata && Object.keys(rel.metadata).length > 0 ? rel.metadata : undefined,
          });
        }
      }

      return res.json({
        entity,
        relations: { outgoing, incoming },
        sources: dlResult.rows,
        narratives: Array.from(narrativeContexts),
      });
    }
    
    res.json(entity);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
