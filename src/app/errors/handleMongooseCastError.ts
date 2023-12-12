import mongoose from 'mongoose';
import { TErrorResponse, TErrorSource } from '../interface/error';
import { BAD_REQUEST } from 'http-status';

const handleMongooseCastError = (
  error: mongoose.Error.CastError,
): TErrorResponse => {
  const errorSources: TErrorSource = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode: BAD_REQUEST,
    message: 'Validation error',
    errorSources,
  };
};

export default handleMongooseCastError;
