const { Router } = require('express');

const carritoController = require('./cartsController/cartsController');

module.exports = (app) => {

  const router = new Router();

  app.use('/api/carts', router);

  router.post('/', carritoController.addCart);
  router.get('/:cid', carritoController.getCartProductById);
  router.post('/:cid/product/:pid', carritoController.addProductToCart);
  router.delete('/:cid/product/:pid', carritoController.deleteProductToCart);
  router.delete('/:cid', carritoController.deleteCart);
};
