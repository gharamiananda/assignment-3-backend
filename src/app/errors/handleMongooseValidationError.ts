import { BAD_REQUEST } from 'http-status';
import { TErrorSource } from '../interface/error';
import mongoose from 'mongoose';

export const handleMongooseValidationError = (
  error: mongoose.Error.ValidationError,
) => {
  const errorSources: TErrorSource = Object.values(error.errors).map(
    (err: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: err.path,
      message: err.message,
    }),
  );

  return {
    statusCode: BAD_REQUEST,
    message: 'Validation error',
    errorSources,
  };
};
