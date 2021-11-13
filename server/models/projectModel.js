const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  orgUsername: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('project', projectSchema);
