import { Schema, model } from "mongoose";
import { TCourse, TTags, TDetails } from "./course.interface";

const tagSchema = new Schema<TTags>({
  name: {
    type: String,

    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,

    required: true,
  },
  description: {
    type: String,

    required: true,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  instructor: {
    type: String,

    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,

    required: true,
  },
  tags: { type: [tagSchema], _id: false },

  startDate: {
    type: String,

    required: true,
  },
  endDate: {
    type: String,

    required: true,
  },
  language: {
    type: String,

    required: true,
  },
  provider: {
    type: String,

    required: true,
  },
  durationInWeeks: {
    type: Number,

    required: true,
  },
  details: { type: detailsSchema, _id: false },
});

export const Course = model<TCourse>("Course", courseSchema);
