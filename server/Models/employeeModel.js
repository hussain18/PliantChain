const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  Position: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  orgUsername: {
    type: String,
    required: true,
  },
  empUsername: {
    type: String,
    required: true,
  },
  isLeafEmp: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('employee', employeeSchema);
