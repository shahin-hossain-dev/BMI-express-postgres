import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.get('/all-users', UserController.getAllUser);
// router.post('/create-user', UserController.createUser);
router.post('/create-patient', UserController.createPatient);

export const userRoutes = router;
