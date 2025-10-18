import prisma from '../../utils/dbClient';
import { TPatient } from '../patient/patient.interface';
import { PatientValidationSchema } from '../patient/patient.validation';

const getAllUsers = async () => {
  try {
    const data = await prisma.user.findMany();

    return data;
  } catch (error: any) {
    throw Error(error.message);
  }
};

// const createUser = async (body: User) => {
//   try {
//     const createData = await prisma.user.create({ data: body });
//     return createData;
//   } catch (error: any) {
//     throw Error(error.message);
//   }
// };

const createPatientIntoDB = async (body: TPatient) => {
  try {
    const { username, password, role } = body;

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

      const validatedData = PatientValidationSchema.parse(data);

      const res = await tx.patient.create({
        data: validatedData,
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

export const UserServices = { getAllUsers, createPatientIntoDB };
