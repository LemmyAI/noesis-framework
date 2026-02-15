import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

// GET /api/overview — Instance discovery + stats + schema
router.get('/', async (req: Request, res: Response) => {
  try {
    const [
      entityCount,
      relationCount,
      sourceCount,
      namespaceList,
      typeDist,
      relTypeDist,
      narrativeList,
      temporalRange,
      recentEntities,
      defaultConfig,
    ] = await Promise.all([
      db.query(`SELECT COUNT(*) as n FROM entities WHERE is_latest = TRUE`),
      db.query(`SELECT COUNT(*) as n FROM relations`),
      db.query(`SELECT COUNT(*) as n FROM datalayer`),
      db.query(`
        SELECT nc.namespace, nc.extends,
          (SELECT COUNT(*) FROM entities e WHERE e.namespace = nc.namespace AND e.is_latest = TRUE) as entity_count
        FROM namespace_configs nc
        ORDER BY nc.namespace
      `),
      db.query(`SELECT type, COUNT(*) as count FROM entities WHERE is_latest = TRUE GROUP BY type ORDER BY count DESC`),
      db.query(`SELECT type, COUNT(*) as count FROM relations GROUP BY type ORDER BY count DESC`),
      db.query(`
        SELECT context, COUNT(*) as relation_count,
          (SELECT COUNT(DISTINCT x) FROM (
            SELECT from_entity as x FROM relations r2 WHERE r2.context = r1.context
            UNION
            SELECT to_entity FROM relations r3 WHERE r3.context = r1.context
          ) sub) as entity_count
        FROM relations r1
        WHERE context IS NOT NULL
        GROUP BY context
        ORDER BY relation_count DESC
      `),
      db.query(`
        SELECT
          MIN((temporal->>'timestamp')::timestamptz) as earliest,
          MAX((temporal->>'timestamp')::timestamptz) as latest
        FROM entities
        WHERE is_latest = TRUE AND temporal->>'timestamp' IS NOT NULL
      `),
      db.query(`
        SELECT id, name, type, namespace, temporal
        FROM entities
        WHERE is_latest = TRUE AND temporal->>'timestamp' IS NOT NULL
        ORDER BY (temporal->>'timestamp')::timestamptz DESC
        LIMIT 5
      `),
      db.query(`SELECT config FROM namespace_configs WHERE namespace = 'default'`),
    ]);

    // Build relation type info with inference properties from config
    const relConfig = defaultConfig.rows[0]?.config?.relations || {};
    const relationTypes: Record<string, any> = {};
    for (const row of relTypeDist.rows) {
      const props = relConfig[row.type] || {};
      relationTypes[row.type] = {
        count: parseInt(row.count),
        transitive: props.transitive || false,
        traversable: props.traversable || false,
        inverse: props.inverse || null,
      };
    }

    // Type distribution as object
    const typeDistribution: Record<string, number> = {};
    for (const row of typeDist.rows) {
      typeDistribution[row.type] = parseInt(row.count);
    }

    res.json({
      instance: {
        name: 'NOESIS',
        version: '2.5.0',
        description: 'Narrative Ontology for Evidence-based Systems Inferencing Structure',
      },
      stats: {
        namespaces: namespaceList.rows.length,
        entities: parseInt(entityCount.rows[0].n),
        relations: parseInt(relationCount.rows[0].n),
        sources: parseInt(sourceCount.rows[0].n),
        narratives: narrativeList.rows.length,
      },
      namespaces: namespaceList.rows.map((r: any) => ({
        namespace: r.namespace,
        extends: r.extends,
        entity_count: parseInt(r.entity_count),
      })),
      narratives: narrativeList.rows.map((r: any) => ({
        context: r.context,
        relation_count: parseInt(r.relation_count),
        entity_count: parseInt(r.entity_count),
      })),
      type_distribution: typeDistribution,
      relation_types: relationTypes,
      temporal_range: {
        earliest: temporalRange.rows[0]?.earliest || null,
        latest: temporalRange.rows[0]?.latest || null,
      },
      recent_entities: recentEntities.rows,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
