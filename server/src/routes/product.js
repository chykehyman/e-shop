import express from 'express';
import {
  createProduct,
  deleteProduct,
  getFeaturedProduct,
  getProduct,
  getProducts,
  getProductsCount,
  updateProduct,
  uploadProductGallery,
} from '../controllers/product';
import fileUpload from '../utils/fileUpload';

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(fileUpload.single('image'), createProduct);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);
router.get('/get/count', getProductsCount);
router.get('/get/featured', getFeaturedProduct);
router.put(
  '/:id/gallery-upload',
  fileUpload.array('images'),
  uploadProductGallery
);

export default router;
