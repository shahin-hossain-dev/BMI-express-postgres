import { z } from 'zod';

export const GenderEnum = z.enum(['male', 'female']); // match your Prisma enum

export const PatientValidationSchema = z.object({
  first_name: z.string().min(1).max(50),
  last_name: z.string().min(1).max(50),
  email: z.string().email().max(50),
  phone: z.string().min(11).max(11),
  user_id: z.string().uuid(),
  height: z.number().int().positive(),
  weight: z.number().int().positive(),
  bmi: z.number().positive(),
  gender: GenderEnum,
  region: z.string().max(50).nullable(),
  date_of_birth: z.string().nullable(),
  origin: z.string().nullable(),
  cur_health_status: z.string(),
  address: z.string().min(1).max(200),
  recommendation_id: z.string().nullable(),
  isSmoke: z.boolean().nullable(),
});
