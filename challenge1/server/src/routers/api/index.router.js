import { Router } from 'express';
import productsRouter from './products.router.js';
import usersRouter from './users.router.js';

const apiRouter = Router();

// Defining the /api routes
apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;