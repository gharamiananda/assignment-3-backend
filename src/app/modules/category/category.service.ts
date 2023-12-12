import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload);

  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await Category.find().select({ __v: 0 });

  return result;
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id);

  return result;
};

const deleteCategoryIntoDB = async (id: string) => {
  const result = await Category.findByIdAndUpdate(
    id,
    { isDelete: true },
    { new: true }
  );

  return result;
};

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>
) => {
  const result = await Category.findByIdAndUpdate(id, payload);

  return result;
};
export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  deleteCategoryIntoDB,
  updateCategoryIntoDB,
};
