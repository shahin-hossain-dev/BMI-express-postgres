export type User = {
  username: string;
  password: string;
  role: 'admin' | 'patient' | 'doctor';
};

export type commonUser = {
  first_name: string;
  last_name: string;
  phone: number;
  gender: 'male' | 'female';
  user_id: string;
  email: string;
};

export type Patient = commonUser & {
  height: number;
  weight: number;
  bmi: number;
  isSmoke: boolean;
  region: string;
  date_of_birth: string;
  origin: string;
  cur_health_status: string;
  address: string;
  recommendation_id: string;
};

export type Admin = commonUser & {};

export type Doctor = commonUser & {};
