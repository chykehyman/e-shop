import express from 'express';
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  getOrdersCount,
  getTotalSales,
  getUserOrders,
  updateOrder,
} from '../controllers/order';

const router = express.Router();

router.route('/').get(getOrders).post(createOrder);
router.route('/:id').get(getOrder).put(updateOrder).delete(deleteOrder);
router.get('/get/total-sales', getTotalSales);
router.get('/get/count', getOrdersCount);
router.get('/get/user-orders/:userId', getUserOrders);

export default router;
