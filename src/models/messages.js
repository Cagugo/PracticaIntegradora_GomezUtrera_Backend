const { Schema, model } = require('mongoose');

const collectionName = 'messages';

const messageSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
});

const Message = model('Message', messageSchema);

module.exports = {
  Message,
  collectionName,
};
