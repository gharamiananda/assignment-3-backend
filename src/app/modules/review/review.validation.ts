import { z } from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string(),
    rating: z.number(),
    review: z.string(),
  }),
});

const updateReviewValidationSchema = z.object({});

export const ReviewValidations = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
