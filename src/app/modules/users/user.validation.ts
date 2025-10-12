import * as z from 'zod';

export const UserValidationSchema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.enum(['admin', 'patient', 'doctor']).default('patient'),
});
