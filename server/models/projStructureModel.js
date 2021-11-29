const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projStructureSchema = new Schema({
  orgUsername: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
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
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('proj_structure', projStructureSchema);
