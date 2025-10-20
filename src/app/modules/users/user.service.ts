import prisma from '../../utils/dbClient';
import { TDoctor } from '../doctor/doctor.interface';
import { DoctorValidationSchema } from '../doctor/doctor.validation';
import { TPatient } from '../patient/patient.interface';
import { PatientValidationSchema } from '../patient/patient.validation';

const getAllUsers = async () => {
  try {
    const data = await prisma.user.findMany({ include: { patient: true } });

    return data;
  } catch (error: any) {
    throw Error(error.message);
  }
};

const createPatientIntoDB = async (body: TPatient) => {
  try {
    const { username, password, role } = body;

    // ekhane transaction use kora hoyse. karon 2ta db akshathe hobe. 2tai success hobe. na hole konotai hobe na.

    const validatedData = await PatientValidationSchema.parse(body);

    const result = prisma.$transaction(async (tx) => {
      const createUser = await tx.user.create({
        data: { username, password, role },
      });

      const data = {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone,
        user_id: createUser?.id,
        height: body.height,
        weight: body.weight,
        bmi: body.bmi,
        gender: body.gender,
        region: body.region,
        date_of_birth: body.date_of_birth ?? null,
        origin: body.origin ?? null,
        cur_health_status: body.cur_health_status,
        address: body.address,
        recommendation_id: body.recommendation_id ?? null,
        isSmoke: body.isSmoke ?? null,
      };

      const res = await tx.patient.create({
        data: data,
        include: {
          user: true,
        },
      });

      return res;
    });
    return result;
  } catch (error: any) {
    throw Error(error);
  }
};

const createDoctorIntoDB = async (body: TDoctor) => {
  try {
    const doctorValidation = await DoctorValidationSchema.parse(body);

    const resp = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          username: body?.username,
          password: body?.password,
          role: body?.role,
        },
      });

      const data = {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone,
        gender: body.gender,
        user_id: user.id,
      };

      const result = await tx.doctor.create({ data, include: { user: true } });

      return result;
    });

    return resp;
  } catch (error: any) {
    throw Error(error);
  }
};

export const UserServices = {
  getAllUsers,
  createPatientIntoDB,
  createDoctorIntoDB,
};
