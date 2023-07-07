
const { Schema, model } = require('mongoose');


const collectionName = 'products';

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: [String], default: ['Sin imagen'] },
});

const Product = model('Product', productSchema);

module.exports = {
  Product,
  collectionName,
};
