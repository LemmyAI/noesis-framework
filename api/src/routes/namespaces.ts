import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

// GET /api/namespaces - List all namespaces as tree
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await db.query(`
      WITH RECURSIVE tree AS (
        SELECT namespace, extends, 0 as level, config
        FROM namespace_configs 
        WHERE extends IS NULL
        
        UNION ALL
        
        SELECT n.namespace, n.extends, t.level + 1, n.config
        FROM namespace_configs n
        JOIN tree t ON n.extends = t.namespace
      )
      SELECT * FROM tree ORDER BY level, namespace
    `);

    const tree = buildNamespaceTree(result.rows);
    res.json({ namespaces: result.rows, tree });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/namespaces/:ns/config - Get merged config with inheritance
router.get('/:ns/config', async (req: Request, res: Response) => {
  try {
    const { ns } = req.params;
    const config = await resolveMergedConfig(ns);
    
    if (!config) {
      return res.status(404).json({ error: 'namespace_not_found', namespace: ns });
    }
    
    res.json(config);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Build tree structure from flat list
function buildNamespaceTree(rows: any[]) {
  const tree: any = {};
  
  for (const row of rows) {
    // Namespaces use dot notation: "news.week7", "history.civil-war"
    const parts = row.namespace.split('.');
    let current = tree;
    
    for (const part of parts) {
      if (!current[part]) {
        current[part] = { 
          _namespace: row.namespace,
          _extends: row.extends,
          _level: row.level,
          _children: {} 
        };
      }
      current = current[part]._children;
    }
  }
  
  return tree;
}

// Resolve merged config by walking up inheritance chain
async function resolveMergedConfig(namespace: string) {
  const chain: any[] = [];
  let current = namespace;

  while (current) {
    const result = await db.query(
      'SELECT * FROM namespace_configs WHERE namespace = $1',
      [current]
    );
    
    if (result.rows.length === 0) break;
    
    const row = result.rows[0];
    chain.push({ 
      namespace: current, 
      config: row.config || {} 
    });
    current = row.extends;
  }

  if (chain.length === 0) return null;

  // Merge from root to leaf (child overrides parent)
  const merged: any = {
    namespace,
    chain: chain.map(c => c.namespace).reverse(),
    core_types: [],
    type_hierarchy: {},
    relations: {},
    interfaces: {},
    colors: {},
  };

  // Reverse to go from root to leaf
  for (const item of chain.reverse()) {
    const cfg = item.config;
    merged.core_types.push(...(cfg.core_types || []));
    Object.assign(merged.type_hierarchy, cfg.type_hierarchy || {});
    Object.assign(merged.relations, cfg.relations || {});
    Object.assign(merged.interfaces, cfg.interfaces || {});
    Object.assign(merged.colors, cfg.colors || {});
  }

  return merged;
}

export default router;
