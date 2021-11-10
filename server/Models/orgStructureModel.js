const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orgStructureSchema = new Schema({
  orgUsername: {
    type: String,
    required: true,
    unique: true,
  },
  structure: {
    required: true,
  },
});

module.exports = mongoose.model('org_structure', orgStructureSchema);
