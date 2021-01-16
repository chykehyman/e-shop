import Category from '../models/category';
import asyncHandler from '../middlewares/asynHandler';
import jsonRes from '../utils/jsonResponse';
import checkId from '../utils/checkId';

export const getCategories = asyncHandler(async (req, res, next) => {
  const categoryList = await Category.find();

  return jsonRes.success(
    res,
    200,
    'Categories retrieved successfully',
    categoryList
  );
});

export const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  checkId(id, next);
  const category = await Category.findById(id);
  if (!category) {
    return next(jsonRes.error(404, `Category with ID ${id} not found`));
  }

  return jsonRes.success(res, 200, 'Category retrieved successfully', category);
});

export const createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);

  return jsonRes.success(res, 201, 'Category created successfully', category);
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  checkId(id, next);
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(jsonRes.error(404, `Category with ID ${id} not found`));
  }

  return jsonRes.success(res, 200, 'Category updated successfully', category);
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  checkId(id, next);
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return next(jsonRes.error(404, `Category with ID ${id} not found`));
  }

  return jsonRes.success(res, 200, 'Category deleted successfully', category);
});
