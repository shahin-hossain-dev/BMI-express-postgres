import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { TPatient } from '../patient/patient.interface';
import { TDoctor } from '../doctor/doctor.interface';

const getAllUser = catchAsync(async (req, res) => {
  const data = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetched Successful',
    data,
  });
});

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

const createDoctor = catchAsync(async (req, res, next) => {
  const body: TDoctor = await req.body;

  console.log(body);

  const result = await UserServices.createDoctorIntoDB(body);

  sendResponse(res, {
    success: true,
    message: 'Doctor Created Succuss',
    statusCode: 201,
    data: result,
  });
});

export const UserController = { getAllUser, createPatient, createDoctor };
