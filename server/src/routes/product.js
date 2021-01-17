import express from 'express';
import {
  createProduct,
  deleteProduct,
  getFeaturedProduct,
  getProduct,
  getProductCount,
  getProducts,
  updateProduct,
} from '../controllers/product';

const router = express.Router();

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);
router.get('/get/count', getProductCount);
router.get('/get/featured', getFeaturedProduct);

export default router;
