const { Message } = require('../../../models/messages');

class MessagesServices {
  addUserMessage = async (payload, res) => {
    try {
      const { user, message } = payload;

      const newMessage = new Message({
        user,
        message,
      });

      await newMessage.save();
      
      const data = newMessage;
      
      return res.status(200).json({ success: true, message: 'Mensaje agregado correctamente', payload: data });
    } catch (error) {

      throw new Error('Error al agregar el mensaje');
    }
  };

  getAllMessages = async (res) => {
    try {
      const messages = await Message.find();
      const data = messages;
      return res.status(200).json({ success: true, payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al obtener los mensajes' });
    }
  };

  deleteUserMessage = async (mid, res, req) => {
    try {
      const deletedMessage = await Message.findByIdAndDelete(mid);

      if (!deletedMessage) {
        return res.status(404).json({ success: false, error: 'Mensaje no encontrado' });
      }

      const data = deletedMessage;

      return res.status(200).json({ success: true, message: 'Mensaje eliminado correctamente', payload: data });
    } catch (error) {

      return res.status(500).json({ success: false, error: 'Error al eliminar el mensaje' });
    }
  };
}

module.exports = new MessagesServices();
