const { Schema, model } = require('mongoose');

const collectionName = 'carts';

const cartSchema = new Schema({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const Cart = model('Cart', cartSchema);

module.exports = {
  Cart,
  collectionName,
};
