export type TUser = {
  username: string;
  password: string;
  role: 'admin' | 'patient' | 'doctor';
};

export type TCommonUser = {
  first_name: string;
  last_name: string;
  phone: string;
  gender: 'male' | 'female';
  user_id: string;
  email: string;
};

export type TAdmin = TCommonUser & {};
