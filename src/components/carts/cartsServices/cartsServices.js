const { Cart } = require('../../../models/carts');

const { Product } = require('../../../models/products');

class CartsService {
  constructor() {

    this.initializeCartCollection();
  }

  initializeCartCollection = async () => {
    try {

      const cartCount = await Cart.countDocuments();

      if (cartCount === 0) {
        await Cart.create({ products: [] });
        console.log('Colección "carts" inicializada correctamente');
      }
    } catch (error) {
      console.error('Error al inicializar la colección de carritos en la base de datos', error);
    }
  };

  addCart = async (res) => {
    try {

      const newCart = await Cart.create({ products: [] });
      const data = newCart;
      return res.status(201).json({ success: true, message: 'Nuevo carrito creado', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al crear el carrito' });
    }
  };

  getCartProductById = async (cid, res) => {
    try {
      const cart = await Cart.findById(cid).populate('products.productId');
      if (!cart) {
        return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
      }
      const data = cart.products;
      return res.status(200).json({ success: true, payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al obtener los productos del carrito' });
    }
  };

  addProductToCart = async (cid, pid, quantity, res) => {
    try {

      const cart = await Cart.findById(cid);
      if (!cart) {
        return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
      }

      const product = await Product.findById(pid);
      if (!product) {
        return res.status(404).json({ success: false, error: 'ID de Producto no encontrado' });
      }

      const productIndex = cart.products.findIndex((p) => p.productId.toString() === pid);

      if (productIndex === -1) {
        const newProduct = {
          productId: pid,
          quantity: quantity || 1,
        };
        cart.products.push(newProduct);
      } else {

        cart.products[productIndex].quantity += quantity || 1;
      }

      await cart.save();
      const data = cart;
      return res.status(200).json({ success: true, message: 'Producto agregado al carrito correctamente', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al agregar el producto al carrito' });
    }
  };

  deleteProductToCart = async (cid, pid, res) => {
    try {

      const cart = await Cart.findById(cid);
      if (!cart) {
        return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
      }
      const productIndex = cart.products.findIndex((p) => p.productId.toString() === pid);
      
      if (productIndex === -1) {

        return res.status(404).json({ success: false, error: 'Producto no encontrado en el carrito' });
      }
      cart.products.splice(productIndex, 1);
      
      await cart.save();
      
      const data = cart;

      return res.status(200).json({ success: true, message: 'Producto eliminado del carrito correctamente', payload: data });
    } catch (error) {

      return res.status(500).json({ success: false, error: 'Error al eliminar el producto del carrito' });
    }
  };

  deleteCart = async (cid, res) => {
    try {

      const cart = await Cart.findById(cid);
      if (!cart) {
        return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
      }
      
      await cart.deleteOne();
      
      const data = cart;
      
      return res.status(200).json({ success: true, message: 'Carrito eliminado correctamente', payload: data });
    } catch (error) {

      return res.status(500).json({ success: false, error: 'Error al eliminar el carrito' });
    }
  };
}

module.exports = new CartsService();
