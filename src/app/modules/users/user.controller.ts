import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { UserValidationSchema } from './user.validation';
import sendResponse from '../../utils/sendResponse';

const getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await UserServices.getAllUsers();

    res.status(200).json({
      success: true,
      message: 'User Fetched Successfully',
      data,
    });
  } catch (error: any) {
    console.log(error);
    throw Error(error.message);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const validateData = UserValidationSchema.parse(req.body);

    const data = await UserServices.createUser(validateData);

    // res.status(201).json({
    //   success: true,
    //   message: 'Created Successfully',
    //   data: data,
    // });
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User Created Successfully',
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something wrong',
      error: error.message,
    });
  }
};

export const UserController = { getAllUser, createUser };
