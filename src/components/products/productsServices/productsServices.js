const { Product } = require('../../../models/products');

class ProductsServices {

  getAllProducts = async (limit, res) => {
    try {

      let query = Product.find();

      if (limit) {

        query = query.limit(parseInt(limit));
      }

      const products = await query.exec();

      const data = products;
      return res.status(200).json({ success: true, payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al obtener los productos' });
    }
  };

  addProduct = async (payload, images, res, req) => {
    try {
      const { title, description, code, price, stock, category } = payload;

      if (!title || !description || !code || !price || !stock || !category) {

        return res.status(500).json({ success: false, error: 'Faltan campos obligatorios' });
      }

      const existingProduct = await Product.findOne({ code: code });

      if (existingProduct) {

        return res.status(400).json({ success: false, error: 'Ya existe un producto con el mismo código' });
      }

      const newProduct = new Product({
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails: images && images.length > 0 ? images.map((image) => image.filename) : ['Sin imagen'],
      });

      await newProduct.save();

      req.app.io.emit('newProduct', newProduct);

      const data = newProduct;

      return res.status(201).json({ success: true, message: 'Producto agregado correctamente', payload: data });
    } catch (error) {

      return res.status(500).json({ success: false, error: 'Error al agregar el producto' });
    }
  };

  getProductById = async (pid, res) => {
    try {

      const product = await Product.findById(pid);

      if (!product) {

        return res.status(404).json({ success: false, error: 'Producto no encontrado' });
      }

      const data = product;

      return res.status(200).json({ success: true, payload: data });
    } catch (error) {

      return res.status(500).json({ success: false, error: 'Error al obtener el producto' });
    }
  };

  updateProduct = async (pid, updateFields, res, req) => {
    try {
      const allowedFields = ['title', 'description', 'code', 'price', 'stock', 'category'];

      const invalidFields = Object.keys(updateFields).filter((field) => !allowedFields.includes(field));

      if (invalidFields.length > 0) {

        return res.status(400).json({ success: false, error: `Los siguientes campos no se pueden modificar: ${invalidFields.join(', ')}` });
      }

      const updatedProduct = await Product.findByIdAndUpdate(pid, updateFields, { new: true });

      if (!updatedProduct) {

        return res.status(404).json({ success: false, error: 'Producto no encontrado' });
      }
      req.app.io.emit('updateProduct', updatedProduct);

      const data = updatedProduct;
      return res.status(200).json({ success: true, message: 'Producto actualizado correctamente', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al actualizar el producto' });
    }
  };

  deleteProduct = async (pid, res, req) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(pid);

      if (!deletedProduct) {
        return res.status(404).json({ success: false, error: 'Producto no encontrado' });
      }

      req.app.io.emit('deleteProduct', pid);

      const data = deletedProduct;
      return res.status(200).json({ success: true, message: 'Producto eliminado correctamente', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al eliminar el producto' });
    }
  };
}

module.exports = new ProductsServices();
