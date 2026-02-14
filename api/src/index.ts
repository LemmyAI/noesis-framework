import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import db from './db';
import entitiesRouter from './routes/entities';
import relationsRouter from './routes/relations';
import namespacesRouter from './routes/namespaces';
import categoriesRouter from './routes/categories';
import narrativesRouter from './routes/narratives';
import datalayerRouter from './routes/datalayer';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', async (req: Request, res: Response) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'healthy', database: 'connected' });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', database: 'disconnected' });
  }
});

// API routes (under /api prefix)
app.use('/api/entities', entitiesRouter);
app.use('/api/relations', relationsRouter);
app.use('/api/namespaces', namespacesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/narratives', narrativesRouter);
app.use('/api/datalayer', datalayerRouter);

// API root
app.get('/api', (req: Request, res: Response) => {
  res.json({
    name: 'NOESIS API',
    version: '2.5.0',
    endpoints: [
      'GET /api/entities',
      'GET /api/entities/:id',
      'GET /api/entities/by-key/:key',
      'GET /api/relations',
      'GET /api/namespaces',
      'GET /api/namespaces/:ns/config',
      'GET /api/categories/tree',
      'GET /api/categories/:parent/children',
      'GET /api/narratives',
      'GET /api/narratives/:context',
      'GET /api/datalayer',
      'GET /api/datalayer/:id',
      'GET /api/datalayer/by-entity/:entityId',
    ],
  });
});

// Serve static site
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// SPA fallback — serve index.html for non-API routes
app.get('*', (req: Request, res: Response) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(publicPath, 'index.html'));
  } else {
    res.status(404).json({ error: 'not_found' });
  }
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`NOESIS running on port ${PORT}`);
  console.log(`  Site: http://localhost:${PORT}/`);
  console.log(`  API:  http://localhost:${PORT}/api`);
});

export default app;
