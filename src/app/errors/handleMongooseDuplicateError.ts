import { BAD_REQUEST } from 'http-status';
import { TErrorSource } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleMongooseDuplicateError = (error: any) => {
  const allkeys = Object.keys(error.keyPattern);
  const errorSources: TErrorSource = allkeys.map((path) => ({
    path: path,
    message: 'Duplicate data',
  }));

  return {
    statusCode: BAD_REQUEST,
    message: 'Validation error',
    errorSources,
  };
};
