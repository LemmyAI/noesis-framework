import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

// GET /api/search?q=...&limit=10&type=entity|source|narrative&namespace=...
router.get('/', async (req: Request, res: Response) => {
  try {
    const { q, limit, type, namespace } = req.query;

    if (!q || (q as string).trim() === '') {
      return res.status(400).json({ error: 'missing_query', message: 'Provide ?q=search+terms' });
    }

    const searchLimit = Math.min(Math.max(parseInt(limit as string) || 20, 1), 100);
    const filterType = type as string | undefined;
    const results: any[] = [];

    // Search entities
    if (!filterType || filterType === 'entity') {
      let entitySql = `
        SELECT id, name, type, namespace, key,
          metadata->>'description' as description,
          temporal,
          ts_rank(search_vector, plainto_tsquery('english', $1)) as rank
        FROM entities
        WHERE search_vector @@ plainto_tsquery('english', $1)
          AND is_latest = TRUE
      `;
      const entityParams: any[] = [q];
      let pIdx = 2;

      if (namespace) {
        entitySql += ` AND (namespace = $${pIdx} OR namespace LIKE $${pIdx} || '.%')`;
        entityParams.push(namespace);
        pIdx++;
      }

      entitySql += ` ORDER BY rank DESC LIMIT $${pIdx}`;
      entityParams.push(searchLimit);

      const entityResult = await db.query(entitySql, entityParams);
      for (const row of entityResult.rows) {
        results.push({
          kind: 'entity',
          id: row.id,
          name: row.name,
          type: row.type,
          namespace: row.namespace,
          key: row.key || undefined,
          snippet: row.description || undefined,
          rank: parseFloat(row.rank),
        });
      }
    }

    // Search sources (datalayer)
    if (!filterType || filterType === 'source') {
      const sourceSql = `
        SELECT id, entity_id, title, source_name, excerpt, url, published_at,
          ts_rank(search_vector, plainto_tsquery('english', $1)) as rank
        FROM datalayer
        WHERE search_vector @@ plainto_tsquery('english', $1)
        ORDER BY rank DESC
        LIMIT $2
      `;
      const sourceResult = await db.query(sourceSql, [q, searchLimit]);
      for (const row of sourceResult.rows) {
        results.push({
          kind: 'source',
          id: row.id,
          title: row.title,
          source_name: row.source_name,
          entity_id: row.entity_id,
          snippet: row.excerpt || undefined,
          url: row.url || undefined,
          published_at: row.published_at || undefined,
          rank: parseFloat(row.rank),
        });
      }
    }

    // Search narratives (via relation contexts and metadata descriptions)
    if (!filterType || filterType === 'narrative') {
      // Narrative contexts aren't tsvector-indexed, so use ILIKE for now
      const narSql = `
        SELECT context, COUNT(*) as relation_count
        FROM relations
        WHERE context IS NOT NULL
          AND context ILIKE '%' || $1 || '%'
        GROUP BY context
        ORDER BY relation_count DESC
        LIMIT $2
      `;
      const narResult = await db.query(narSql, [q, searchLimit]);
      for (const row of narResult.rows) {
        results.push({
          kind: 'narrative',
          context: row.context,
          relation_count: parseInt(row.relation_count),
          rank: 0.5, // flat rank for ILIKE matches
        });
      }
    }

    // Sort merged results by rank descending
    results.sort((a, b) => b.rank - a.rank);

    res.json({
      query: q,
      count: results.length,
      results: results.slice(0, searchLimit),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
