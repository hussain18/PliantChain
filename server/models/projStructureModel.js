const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projStructureSchema = new Schema({
  orgUsername: {
    type: String,
    required: true,
    unique: true,
  },
  projectName: {
    type: String,
    required: true,
    unique: true,
  },
  empUsername: {
    type: String,
    required: true,
    unique: true,
  },
  empAccountAddress: {
    type: String,
    required: true,
    unique: true,
  },
  authorities: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('proj_structure', projStructureSchema);
