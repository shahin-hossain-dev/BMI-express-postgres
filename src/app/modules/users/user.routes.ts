import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.get('/all-users', UserController.getAllUser);
router.post('/create-user', UserController.createUser);

export const userRoutes = router;
