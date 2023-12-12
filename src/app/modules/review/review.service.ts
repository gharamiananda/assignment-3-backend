import { TRating } from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDB = async (payload: TRating) => {
  const result = await Review.create(payload);

  return result;
};

const getAllReviewsFromDB = async (query: Record<string, unknown>) => {
  const result = await Review.find();

  return result;
};

const getSingleReviewFromDB = async (id: string) => {
  const result = await Review.findById(id);

  return result;
};

const deleteReviewIntoDB = async (id: string) => {
  const result = await Review.findByIdAndUpdate(
    id,
    { isDelete: true },
    { new: true }
  );

  return result;
};

const updateReviewIntoDB = async (id: string, payload: Partial<TRating>) => {
  const result = await Review.findByIdAndUpdate(id, payload);

  return result;
};
export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
  getSingleReviewFromDB,
  deleteReviewIntoDB,
  updateReviewIntoDB,
};
