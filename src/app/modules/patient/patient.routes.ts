import { Router } from 'express';
import { PatientController } from './patient.controller';

const router = Router();

router.get('/all-patient', PatientController.getPatients);
router.get('/:email', PatientController.getPatientByEmail);

export const patientRoutes = router;
