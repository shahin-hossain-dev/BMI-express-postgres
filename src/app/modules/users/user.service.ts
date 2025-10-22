import prisma from '../../utils/dbClient';
import { handleError } from '../../utils/handleError';
import { hashPassword } from '../../utils/hashPassword';
import { TDoctor } from '../doctor/doctor.interface';
import { DoctorValidationSchema } from '../doctor/doctor.validation';
import { TPatient } from '../patient/patient.interface';
import { PatientValidationSchema } from '../patient/patient.validation';

const getAllUsers = async () => {
  try {
    const data = await prisma.user.findMany({
      select: {
        username: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        patient: true,
        doctor: true,
      },
    });

    return data;
  } catch (error: unknown) {
    handleError(error);
  }
};

const createPatientIntoDB = async (body: TPatient) => {
  try {
    const validatedData = await PatientValidationSchema.parse(body);

    // password hashing
    const hashPass = await hashPassword(validatedData.password);

    // ekhane transaction use kora hoyse. karon 2ta db akshathe hobe. 2tai success hobe. na hole konotai hobe na.

    const result = prisma.$transaction(async (tx) => {
      const createUser = await tx.user.create({
        data: {
          username: validatedData.username,
          password: hashPass,
          role: validatedData.role,
        },
      });

      const data = {
        first_name: validatedData.first_name,
        last_name: validatedData.last_name,
        email: validatedData.email,
        phone: validatedData.phone,
        user_id: createUser?.id,
        height: validatedData.height,
        weight: validatedData.weight,
        bmi: validatedData.bmi,
        gender: validatedData.gender,
        region: validatedData.region,
        date_of_birth: validatedData.date_of_birth ?? null,
        origin: validatedData.origin ?? null,
        cur_health_status: validatedData.cur_health_status,
        address: validatedData.address,
        recommendation_id: validatedData.recommendation_id ?? null,
        isSmoke: validatedData.isSmoke ?? null,
      };

      const res = await tx.patient.create({
        data: data,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              updatedAt: true,
              createdAt: true,
            },
          },
        },
      });

      return res;
    });
    return result;
  } catch (error: unknown) {
    handleError(error);
  }
};

const createDoctorIntoDB = async (payload: TDoctor) => {
  const validatedDoctor = await DoctorValidationSchema.parse(payload);
  const hashPass = await hashPassword(validatedDoctor.password);

  try {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          username: validatedDoctor?.username,
          password: hashPass,
          role: validatedDoctor?.role,
        },
      });

      const data = {
        first_name: validatedDoctor.first_name,
        last_name: validatedDoctor.last_name,
        email: validatedDoctor.email,
        phone: validatedDoctor.phone,
        gender: validatedDoctor.gender,
        user_id: user.id,
      };

      const res = await tx.doctor.create({
        data,
        include: {
          user: {
            //user password sara baki property gulo true kore dile password ignore korbe
            select: {
              id: true,
              username: true,
              role: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      // res.user.password = ''; //ignore password as response

      // console.log(res.user.password = "");

      return res;
    });

    return result;
  } catch (err: unknown) {
    handleError(err);
  }
};

export const UserServices = {
  getAllUsers,
  createPatientIntoDB,
  createDoctorIntoDB,
};
