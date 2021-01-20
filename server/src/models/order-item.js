import { Schema, model } from 'mongoose';

const orderItemSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

orderItemSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

orderItemSchema.set('toJSON', {
  virtuals: true,
});

export default model('OrderItem', orderItemSchema);
