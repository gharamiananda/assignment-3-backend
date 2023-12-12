import { z } from "zod";

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

const updateCourseValidationSchema = z.object({});

export const CategoryValidations = {
  createCategoryValidationSchema,
  updateCourseValidationSchema,
};
