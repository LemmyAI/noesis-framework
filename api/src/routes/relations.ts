import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

// GET /api/relations - List relations with optional traversal
router.get('/', async (req: Request, res: Response) => {
  try {
    const { entity, type, context, depth, traversable } = req.query;

    if (!entity) {
      const result = await db.query('SELECT * FROM relations ORDER BY context, narrative_sequence');
      return res.json({ count: result.rows.length, relations: result.rows });
    }

    const maxDepth = depth ? parseInt(depth as string) : 2;
    const traversableOnly = traversable === 'true';

    const { relations, cycles } = await traverseRelations(
      entity as string, 
      maxDepth, 
      traversableOnly
    );

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
  traversableOnly: boolean
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

    let sql = 'SELECT * FROM relations WHERE from_entity = $1 OR to_entity = $1';
    const params: any[] = [entity];

    if (traversableOnly && traversableTypes.length > 0) {
      sql += ` AND type IN (${traversableTypes.map((_, i) => `$${i + 2}`).join(',')})`;
      params.push(...traversableTypes);
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
