/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { handleMongooseValidationError } from "../errors/handleMongooseValidationError";
import handleMongooseCastError from "../errors/handleMongooseCastError";
import { handleMongooseDuplicateError } from "../errors/handleMongooseDuplicateError";

import config from "../config";
import AppError from "../errors/AppError";
import { TErrorResponse, TErrorSource } from "../interface/error";
import { handleZodError } from "../errors/handleZodError";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("error", error);

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "",
    },
  ];
  let statusCode = 500;
  let message = "Something went wrong!";

  if (error.name === "ZodError" && error instanceof ZodError) {
    const simplifiedError: TErrorResponse = handleZodError(error);
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
    statusCode = simplifiedError.statusCode;
  } else if (error.name === "ValidationError") {
    const simplifiedError = handleMongooseValidationError(error);
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
    statusCode = simplifiedError.statusCode;
  } else if (error.name === "CastError") {
    const simplifiedError = handleMongooseCastError(error);
    message = "Invalid Id";
    errorSources = simplifiedError.errorSources;
    statusCode = simplifiedError.statusCode;
  } else if (error.code === 11000) {
    const simplifiedError = handleMongooseDuplicateError(error);
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
    statusCode = simplifiedError.statusCode;
  } else if (error instanceof AppError) {
    errorSources = [{ path: "", message: error.message }];
    statusCode = error.statusCode;
  } else if (error instanceof Error) {
    errorSources = [{ path: "", message: error.message }];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? error.stack : null,
    error,
  });
};

export default globalErrorHandler;
