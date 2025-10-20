import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.get('/all-users', UserController.getAllUser);
// router.post('/create-user', UserController.createUser);
router.post('/create-patient', UserController.createPatient);

router.post('/create-doctor', UserController.createDoctor);

export const userRoutes = router;
