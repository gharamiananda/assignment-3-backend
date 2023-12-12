import express from "express";
import { ReviewControllers } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidations } from "./review.validation";

const router = express.Router();

router.get("/", ReviewControllers.getAllReviews);
router.post(
  "/",
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewControllers.createReview
);

router.get("/:reviewId", ReviewControllers.getSingleReview);

router.patch(
  "/:reviewId",
  //   validateRequest(AcademicSemesterValidations.),
  ReviewControllers.updateReview
);

export const ReviewRoutes = router;
