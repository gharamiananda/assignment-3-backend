import mongoose from "mongoose";
import { Review } from "../review/review.model";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import AppError from "../../errors/AppError";
import { BAD_REQUEST } from "http-status";

const createCourseIntoDB = async (payload: TCourse) => {
  if (payload.durationInWeeks) {
    throw new AppError(BAD_REQUEST, "Duration week should not provide");
  }
  const startDate: Date = new Date(payload.startDate);
  const endDate: Date = new Date(payload.endDate);

  const timeDifference: number = endDate.getTime() - startDate.getTime();

  const weeksDifference: number = timeDifference / (1000 * 60 * 60 * 24 * 7);
  payload.durationInWeeks = Math.ceil(weeksDifference);

  const result = await Course.create(payload);

  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object

  let searchTerm = ""; // SET DEFAULT VALUE

  // IF searchTerm  IS GIVEN SET IT
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const studentSearchableFields = ["title"];
  // WE ARE DYNAMICALLY DOING IT USING LOOP
  const searchQuery = Course.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  // FILTERING fUNCTIONALITY:

  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]); // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

  const filterQuery = searchQuery.find(queryObj);

  // SORTING FUNCTIONALITY:

  let sort = "-createdAt"; // SET DEFAULT VALUE

  // IF sort  IS GIVEN SET IT

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  // PAGINATION FUNCTIONALITY:

  let page = 1; // SET DEFAULT VALUE FOR PAGE
  let limit = 1; // SET DEFAULT VALUE FOR LIMIT
  let skip = 0; // SET DEFAULT VALUE FOR SKIP

  // IF limit IS GIVEN SET IT

  if (query.limit) {
    limit = Number(query.limit);
  }

  // IF page IS GIVEN SET IT

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  // FIELDS LIMITING FUNCTIONALITY:

  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH

  fields: "title";

  let fields = "-__v"; // SET DEFAULT VALUE

  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;
};

const getAllBestReviewCoursesFromDB = async (
  query: Record<string, unknown>
) => {
  const result = await Review.aggregate([
    {
      $group: {
        _id: "$courseId",

        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $sort: { averageRating: -1, reviewCount: -1 },
    },
    {
      $limit: 1,
    },

    {
      $lookup: {
        from: "courses",
        localField: "_id",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $project: {
        course: { $arrayElemAt: ["$course", 0] },
        averageRating: 1,
        reviewCount: 1,
        _id: 0,
      },
    },
  ]);

  let modifiedResult = [];

  if (result.length > 0) {
    modifiedResult = await result[0];
  }

  return modifiedResult;
};

const getSingleCourseFromDB = async (id: string) => {
  const courseId = new mongoose.Types.ObjectId(id);
  const reviewByCourseId = await Review.find({
    courseId: courseId,
  }).select({ _id: 0, __v: 0 });
  const result = await Course.findById(id);

  let modifiedResult = null;

  if (result) {
    modifiedResult = await result.toObject();
  }

  return { ...modifiedResult, review: reviewByCourseId };
};

const deleteCourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDelete: true },
    { new: true }
  );

  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, durationInWeeks, ...restPrimitiveFields } = payload;

  if (durationInWeeks) {
    throw new AppError(BAD_REQUEST, "Duration week should not provide");
  }

  const modifiedFields: Record<string, unknown> = { ...restPrimitiveFields };
  if (payload?.startDate !== undefined || payload?.endDate !== undefined) {
    const getCourse = await Course.findById(id);

    const startDate: Date = new Date(
      payload!.startDate ?? getCourse?.startDate!
    );
    const endDate: Date = new Date(payload!.endDate ?? getCourse?.endDate!);

    const timeDifference: number = endDate.getTime() - startDate.getTime();
    const weeksDifference: number = timeDifference / (1000 * 60 * 60 * 24 * 7);
    modifiedFields.durationInWeeks = Math.ceil(weeksDifference);
  }

  if (tags && tags.length > 0) {
    const deleteTags = tags
      .filter((el) => el.name && el.isDeleted)
      .map((el) => el.name);

    if (deleteTags.length > 0) {
      const deletedCourseTags = await Course.findByIdAndUpdate(
        id,
        {
          $pull: { tags: { name: { $in: deleteTags } } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    const addedTags = tags.filter((el) => el.name && !el.isDeleted);

    if (addedTags.length > 0) {
      console.log("addTags", addedTags);

      const addedCourseTags = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { tags: { $each: [...addedTags] } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
  }

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedFields[`details.${key}`] = value;
    }
  }
  const result = await Course.findByIdAndUpdate(
    id,
    { ...modifiedFields },
    { new: true }
  );

  return result;
};
export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getAllBestReviewCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseIntoDB,
  updateCourseIntoDB,
};
