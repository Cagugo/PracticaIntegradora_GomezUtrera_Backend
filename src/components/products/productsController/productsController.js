const ProductsServices = require('../productsServices/productsServices');

class ProductsController {

  getAllProducts = async (req, res, next) => {
    const limit = req.query.limit;
    await ProductsServices.getAllProducts(limit, res);
  };

  addProduct = async (req, res, next) => {
    const payload = req.body;
    const images = req.files;
    await ProductsServices.addProduct(payload, images, res, req);
  };

  getProductById = async (req, res, next) => {
    const { pid } = req.params;
    await ProductsServices.getProductById(pid, res);
  };

  updateProduct = async (req, res, next) => {
    const { pid } = req.params;
    const updateFields = req.body;
    await ProductsServices.updateProduct(pid, updateFields, res, req);
  };

  deleteProduct = async (req, res, next) => {

    const { pid } = req.params;

    await ProductsServices.deleteProduct(pid, res, req);
  };
}

module.exports = new ProductsController();
