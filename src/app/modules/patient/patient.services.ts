import prisma from '../../utils/dbClient';
import { handleError } from '../../utils/handleError';

const getPatientsFromDB = async () => {
  try {
    const data = await prisma.patient.findMany({
      include: {
        user: {
          select: {
            username: true,
            createdAt: true,
            role: true,
            updatedAt: true,
          },
        },
      },
    });
    return data;
  } catch (err: unknown) {
    handleError(err);
  }
};

const getSinglePatientByEmailFromDB = async (email: string) => {
  try {
    const data = await prisma.patient.findMany({
      where: { email },
      include: {
        user: {
          select: {
            username: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return data;
  } catch (err: unknown) {
    handleError(err);
  }
};

export const PatientServices = {
  getPatientsFromDB,
  getSinglePatientByEmailFromDB,
};
