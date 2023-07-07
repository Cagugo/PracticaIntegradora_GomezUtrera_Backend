const MessagesServices = require('../messagesServices/messagesServices');

class MessagesController {

  addUserMessage = async (req, res, next) => {

    const payload = req.body;

    await MessagesServices.addUserMessage(payload, res);
  };
  getAllMessages = async (req, res, next) => {

    await MessagesServices.getAllMessages(res);
  };
  deleteUserMessage = async (req, res, next) => {

    const { mid } = req.params;

    await MessagesServices.deleteUserMessage(mid, res, req);
  };
}

module.exports = new MessagesController();
