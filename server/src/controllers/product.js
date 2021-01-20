import Product from '../models/product';
import Category from '../models/category';
import jsonRes from '../utils/jsonResponse';
import asyncHandler from '../middlewares/asyncHandler';
import checkId from '../utils/checkId';

const PRODUCT = 'product';

export const getProducts = asyncHandler(async (req, res, next) => {
  let filter = {};
  if (req.query.categories)
    filter = { category: req.query.categories.split(',') };
  const productList = await Product.find(filter).populate('category');

  return jsonRes.success(
    res,
    200,
    'Products retrieved successfully',
    productList
  );
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  checkId(id, PRODUCT, next);
  const product = await Product.findById(id).populate('category');
  if (!product) {
    return next(jsonRes.error(404, `Product with ID ${id} not found`));
  }

  return jsonRes.success(res, 200, 'Product retrieved successfully', product);
});

export const createProduct = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.body.category);
  if (!category) return next(jsonRes.error(400, 'Invalid category'));

  const product = await Product.create(req.body);
  return jsonRes.success(res, 201, 'Product created successfully', product);
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  checkId(id, PRODUCT, next);
  const category = await Category.findById(req.body.category);
  if (!category) return next(jsonRes.error(400, 'Invalid category'));
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(jsonRes.error(404, `Product with ID ${id} not found`));
  }

  return jsonRes.success(res, 200, 'Product updated successfully', product);
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  checkId(id, PRODUCT, next);
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(jsonRes.error(404, `Product with ID ${id} not found`));
  }

  return jsonRes.success(res, 200, 'Product deleted successfully', product);
});

export const getProductsCount = asyncHandler(async (req, res, next) => {
  const productsCount = await Product.countDocuments((count) => count);
  return jsonRes.success(
    res,
    200,
    'Products count retrieved successfully',
    productsCount
  );
});

export const getFeaturedProduct = asyncHandler(async (req, res, next) => {
  const { count = 0 } = req.query;
  const products = await Product.find({ isFeatured: true }).limit(+count);
  return jsonRes.success(
    res,
    200,
    'Featured products retrieved successfully',
    products
  );
});
