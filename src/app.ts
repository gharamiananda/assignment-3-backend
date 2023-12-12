/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import validateRequest from "./app/middlewares/validateRequest";
import { CourseValidations } from "./app/modules/course/course.validation";
import { CourseControllers } from "./app/modules/course/course.controller";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes

app.get("/", (req, res) => {
  res.status(200).json("Welcome to course review");
});

app.use("/api", router);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
