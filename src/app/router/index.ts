import { Router } from 'express';
import { userRoutes } from '../modules/users/user.routes';

const router = Router();

const moduleRoutes = [{ path: '/users', userRoutes }];

moduleRoutes.forEach((item) => router.use(item.path, item.userRoutes));

export default router;
