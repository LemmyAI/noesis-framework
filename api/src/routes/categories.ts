import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

// GET /api/categories/tree - Full category hierarchy
router.get('/tree', async (req: Request, res: Response) => {
  try {
    const result = await db.query(`
      SELECT DISTINCT metadata->>'category' as category
      FROM entities 
      WHERE metadata->>'category' IS NOT NULL
    `);

    const tree = buildCategoryTree(result.rows.map(r => r.category));
    res.json({ tree });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/categories/:parent/children - Drill down
router.get('/:parent/children', async (req: Request, res: Response) => {
  try {
    const { parent } = req.params;

    const result = await db.query(`
      SELECT DISTINCT
        CASE 
          WHEN POSITION('.' IN SUBSTR(metadata->>'category', LENGTH($1) + 2)) > 0
          THEN SUBSTRING(
            SUBSTR(metadata->>'category', LENGTH($1) + 2) 
            FROM 1 
            FOR POSITION('.' IN SUBSTR(metadata->>'category', LENGTH($1) + 2)) - 1
          )
          ELSE SUBSTR(metadata->>'category', LENGTH($1) + 2)
        END as child,
        COUNT(*) as entity_count
      FROM entities
      WHERE metadata->>'category' LIKE $1 || '.%'
      GROUP BY child
      ORDER BY entity_count DESC
    `, [parent]);

    res.json({ parent, children: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Build nested tree from flat category list
function buildCategoryTree(categories: string[]) {
  const tree: any = {};

  for (const cat of categories) {
    if (!cat) continue;
    
    const parts = cat.split('.');
    let current = tree;

    for (const part of parts) {
      if (!current[part]) {
        current[part] = { _count: 0, _children: {} };
      }
      current[part]._count++;
      current = current[part]._children;
    }
  }

  return tree;
}

export default router;
