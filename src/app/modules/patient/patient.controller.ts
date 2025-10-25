import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PatientServices } from './patient.services';

const getPatients = catchAsync(async (req, res, next) => {
  const result = await PatientServices.getPatientsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Patient fetched successfully',
    data: result,
  });
});

const getPatientByEmail = catchAsync(async (req, res, next) => {
  const { email } = await req.params;

  const result = await PatientServices.getSinglePatientByEmailFromDB(
    email as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetched Patient Successfully',
    data: result,
  });
});

export const PatientController = { getPatients, getPatientByEmail };
