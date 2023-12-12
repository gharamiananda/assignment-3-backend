import express from "express";
import { CourseControllers } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";

const router = express.Router();

router.get("/courses/best", CourseControllers.getAllBestReviewCourses);
router.get("/courses", CourseControllers.getAllCourses);

router.post(
  "/course",
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
);

router.get("/courses/:courseId/reviews", CourseControllers.getSingleCourse);

router.put(
  "/courses/:courseId",
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse
);

export const CourseRoutes = router;
