import { Router } from 'express';
import { userRoutes } from '../modules/users/user.routes';
// import { patientRoutes } from '../modules/patient/patient.routes';

const router = Router();

const moduleRoutes = [
  { path: '/users', route: userRoutes },
  //   { path: '/patients', route: patientRoutes },
];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
