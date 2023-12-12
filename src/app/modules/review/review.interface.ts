import { Types } from "mongoose";

export type TRatingNumber = 1 | 2 | 3 | 4 | 5;

export type TRating = {
  courseId: Types.ObjectId;
  rating: TRatingNumber;
  review: string;
};
