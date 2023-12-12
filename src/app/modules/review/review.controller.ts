import httpStatus from "http-status";
import { ReviewServices } from "./review.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review is created successfully",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review are retrieved successfully",
    data: result,
  });
});

const getSingleReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const result = await ReviewServices.getSingleReviewFromDB(reviewId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review is retrieved successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const result = await ReviewServices.deleteReviewIntoDB(reviewId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review is Deleted successfully",
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const result = await ReviewServices.updateReviewIntoDB(reviewId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review is updated successfully",
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
