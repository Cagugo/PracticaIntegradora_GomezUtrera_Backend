const cartsService = require('../cartsServices/cartsServices');

class CartsController {

  addCart = async (req, res, next) => {
    await cartsService.addCart(res);
  };

  getCartProductById = async (req, res, next) => {
    const { cid } = req.params;
    await cartsService.getCartProductById(cid, res);
  };

  addProductToCart = async (req, res, next) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    await cartsService.addProductToCart(cid, pid, quantity, res);
  };

  deleteProductToCart = async (req, res, next) => {
    const { cid, pid } = req.params;
    await cartsService.deleteProductToCart(cid, pid, res);
  };

  deleteCart = async (req, res, next) => {
    const { cid } = req.params;
    await cartsService.deleteCart(cid, res);
  };
}

module.exports = new CartsController();
