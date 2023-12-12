import { z } from "zod";

export type TDetails = {
  level: string;
  description: string;
};

const tagValidationCourseSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean().optional(),
});

const detailsValidationCourseSchema = z.object({
  level: z.string(),
  description: z.string(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(tagValidationCourseSchema),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),

    details: detailsValidationCourseSchema,
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z
      .array(
        z.object({
          name: z.string().optional(),
          isDeleted: z.boolean().optional(),
        })
      )
      .optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),

    details: z
      .object({
        level: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
