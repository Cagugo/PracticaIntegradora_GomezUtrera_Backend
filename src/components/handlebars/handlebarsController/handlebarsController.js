const HandlebarsServices = require('../handlebarsServices/handlebarsServices');

class HandlebarsController {

  getHome = async (req, res) => {
    await HandlebarsServices.getHome(res);
  };

  getRealTimeProducts = async (req, res) => {
    await HandlebarsServices.getRealTimeProducts(res);
  };
  getChat = async (req, res) => {
    await HandlebarsServices.getChat(res);
  };
}

module.exports = new HandlebarsController();
