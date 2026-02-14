import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
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

// API routes
app.use('/api/entities', entitiesRouter);
app.use('/api/relations', relationsRouter);
app.use('/api/namespaces', namespacesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/narratives', narrativesRouter);
app.use('/api/datalayer', datalayerRouter);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'NOESIS API',
    version: '1.0.0',
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

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`NOESIS API running on port ${PORT}`);
});

export default app;
