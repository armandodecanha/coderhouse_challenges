import { Router } from 'express';
import apiRouter from './api/index.router.js';

const router = Router();

// Implement the /api route
router.use('/api', apiRouter);

export default router;