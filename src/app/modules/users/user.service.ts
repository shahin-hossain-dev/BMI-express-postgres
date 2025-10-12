import prisma from '../../utils/dbClient';
import { User } from './user.interface';

const getAllUsers = async () => {
  try {
    const data = await prisma.user.findMany();

    return data;
  } catch (error: any) {
    throw Error(error.message);
  }
};

const createUser = async (body: User) => {
  try {
    const createData = await prisma.user.create({ data: body });
    return createData;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const UserServices = { getAllUsers, createUser };
