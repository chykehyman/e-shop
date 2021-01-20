import Order from '../models/order';
import OrderItem from '../models/order-item';
import asyncHandler from '../middlewares/asyncHandler';
import jsonRes from '../utils/jsonResponse';
import checkId from '../utils/checkId';

const ORDER = 'order';
const USER = 'user';

export const getOrders = asyncHandler(async (req, res, next) => {
  const orderList = await Order.find()
    .populate('user', 'name')
    .populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        populate: 'category',
      },
    })
    .sort('-dateOrdered');

  return jsonRes.success(res, 200, 'Orders retrieved successfully', orderList);
});

export const getOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  checkId(id, ORDER, next);
  const order = await Order.findById(id)
    .populate('user', 'name')
    .populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        populate: 'category',
      },
    });
  if (!order) {
    return next(jsonRes.error(404, `Order with ID ${id} not found`));
  }

  return jsonRes.success(res, 200, 'Order retrieved successfully', order);
});

export const createOrder = asyncHandler(async (req, res, next) => {
  const orderItemsPromise = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  const orderItemsIds = await orderItemsPromise;
  const totalPricesArray = await Promise.all(
    orderItemsIds.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        'product',
        'price'
      );
      return orderItem.product.price * orderItem.quantity;
    })
  );
  const totalPrice = totalPricesArray.reduce((a, b) => a + b, 0);

  const order = await Order.create({
    ...req.body,
    orderItems: orderItemsIds,
    totalPrice,
  });

  return jsonRes.success(res, 201, 'Order created successfully', order);
});

export const updateOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  checkId(id, ORDER, next);
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status: req.body.status },
    { new: true }
  );

  if (!updatedOrder) {
    return next(jsonRes.error(404, `Order with ID ${id} not found`));
  }

  return jsonRes.success(res, 200, 'Order updated successfully', updatedOrder);
});

export const deleteOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  checkId(id, ORDER, next);
  const order = await Order.findByIdAndDelete(id);
  if (!order) {
    return next(jsonRes.error(404, `Order with ID ${id} not found`));
  }
  await order.orderItems.map(
    async (orderItem) => await OrderItem.findByIdAndDelete(orderItem)
  );

  return jsonRes.success(res, 200, 'Order deleted successfully', order);
});

export const getTotalSales = asyncHandler(async (req, res, next) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } },
  ]);

  return jsonRes.success(
    res,
    200,
    'Total Sales retrieved successfully',
    totalSales.pop().totalSales
  );
});

export const getOrdersCount = asyncHandler(async (req, res, next) => {
  const ordersCount = await Order.countDocuments((count) => count);
  return jsonRes.success(
    res,
    200,
    'Orders count retrieved successfully',
    ordersCount
  );
});

export const getUserOrders = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  checkId(userId, USER, next);
  const userOrders = await Order.find({ user: userId })
    .populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        populate: 'category',
      },
    })
    .sort('-dateOrdered');

  return jsonRes.success(
    res,
    200,
    'User orders retrieved successfully',
    userOrders
  );
});
