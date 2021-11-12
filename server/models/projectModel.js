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
  employeeIds: {
    type: Array,
    required: false,
  },
  projectStructure: {
    type: Object,
    required: false,
  },
});

module.exports = mongoose.model('project', projectSchema);
