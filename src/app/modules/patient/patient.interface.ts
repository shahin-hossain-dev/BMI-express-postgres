import { TCommonUser, TUser } from '../users/user.interface';

export type TPatient = TUser &
  TCommonUser & {
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
    phone: string;
  };
