const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  completeName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  accountAddress: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
