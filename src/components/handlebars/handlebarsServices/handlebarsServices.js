const { connection } = require('../../../config/mongo');

class HandlebarsServices {

  getHome = async (res) => {
    try {

      const productos = await this.getCollectionData('products');

      return res.status(200).render('home', { success: true, title: 'Home', productos, style: 'index.css' });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars' });
    }
  };

  getRealTimeProducts = async (res) => {
    try {

      const productos = await this.getCollectionData('products');

      return res.status(200).render('realTimeProducts', { success: true, title: 'Real Time Products', productos, style: 'index.css' });
    } catch (error) {

      return res.status(500).json({ success: false, error: 'Error Handlebars' });
    }
  };

  getChat = async (res) => {
    try {

      const productos = await this.getCollectionData('products');

      return res.status(200).render('chat', { success: true, title: 'Chat', productos, style: 'index.css' });
    } catch (error) {
      
      return res.status(500).json({ success: false, error: 'Error Handlebars' });
    }
  };

  getCollectionData = async (collectionName) => {

    const database = connection;
    const collection = database.collection(collectionName);
    const productos = await collection.find().toArray();

    return productos;
  };
}

module.exports = new HandlebarsServices();
