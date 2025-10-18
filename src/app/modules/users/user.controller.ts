import { UserServices } from './user.service';
import { UserValidationSchema } from './user.validation';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { PatientServices } from '../patient/patient.services';
import { TUser } from './user.interface';
import { TPatient } from '../patient/patient.interface';

// const getAllUser = async (req: Request, res: Response) => {
//   try {
//     const data = await UserServices.getAllUsers();

//     res.status(200).json({
//       success: true,
//       message: 'User Fetched Successfully',
//       data,
//     });
//   } catch (error: any) {
//     console.log(error);
//     throw Error(error.message);
//   }
// };

const getAllUser = catchAsync(async (req, res) => {
  const data = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetched Successful',
    data,
  });
});

// const createUser = catchAsync(async (req, res) => {
//   const validateData = UserValidationSchema.parse(req.body);
//   const data = await UserServices.createUser(validateData);

//   sendResponse(res, {
//     statusCode: 201,
//     success: true,
//     message: 'User Created Successfully',
//     data,
//   });
// });

const createPatient = catchAsync(async (req, res, next) => {
  const body: TPatient = req?.body;
  const result = await UserServices.createPatientIntoDB(body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Patient Created Successfully',
    data: result,
  });
});

export const UserController = { getAllUser, createPatient };
