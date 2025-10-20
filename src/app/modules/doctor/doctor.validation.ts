import z from 'zod';
import { UserValidationSchema } from '../users/user.validation';

const ValidationSchema = z.object({
  first_name: z.string().min(3).max(50),
  last_name: z.string().min(3).max(50),
  phone: z.string().min(11).max(11),
  email: z.string().max(50),
  gender: z.enum(['male', 'female']),
});

// 2ta validation akshathe merge kora hoyese
export const DoctorValidationSchema =
  UserValidationSchema.merge(ValidationSchema);
