import { Schema, model } from "mongoose";
import { TRating } from "./review.interface";

const ratings: number[] = [1, 2, 3, 4, 5];

const reviewSchema = new Schema<TRating>({
  review: {
    type: String,
    required: true,
  },

  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  rating: {
    type: Number,
    enum: {
      values: ratings,
      message: "{VALUE} is not a valid rating value",
    },

    required: true,
  },
});

export const Review = model<TRating>("Review", reviewSchema);
