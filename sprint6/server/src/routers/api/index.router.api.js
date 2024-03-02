import { Router } from 'express';
import productsRouter from './products.router.api.js';
import usersRouter from './users.router.api.js';
import sessionsRouter from './sessions.router.api.js';

const apiRouter = Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/sessions', sessionsRouter);

export default apiRouter;