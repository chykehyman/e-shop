import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processed', 'shipped', 'delivered'],
    default: 'pending',
  },
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'OrderItem',
      required: true,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  totalPrice: {
    type: Number,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

orderSchema.set('toJSON', {
  virtuals: true,
});

export default model('Order', orderSchema);
