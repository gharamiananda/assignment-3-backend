import { ZodError, ZodIssue } from "zod";
import { BAD_REQUEST } from "http-status";
import { TErrorSource } from "../interface/error";

export const handleZodError = (error: ZodError) => {
  const errorSources: TErrorSource = error.issues.map((err: ZodIssue) => ({
    path: err.path[err.path.length - 1],
    message: err.message,
  }));
  return {
    statusCode: BAD_REQUEST,
    message: "Validation error",
    errorSources,
  };
};
