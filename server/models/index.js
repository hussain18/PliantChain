const mongoose = require('mongoose');
const userModel = require('./userModel');
const employeeModel = require('./employeeModel');
const orgStructureModel = require('./orgStructureModel');
const projectModel = require('./projectModel');

const saveModel = async (model) => {
  try {
    if (!model) throw new Error('No/Null/Undefined Model passed');
    await model.save(model);
  } catch (err) {
    console.log('MODEL_SAVING_ERROR: \n', err);
  }
};

const findOneModel = async (model, condition) => {
  try {
    const record = await model.findOne(condition).exec();
    return record;
  } catch (err) {
    return handleError(err);
  }
};

const findModel = async (model, condition) => {
  try {
    const records = await model.find(condition).exec();
    return records;
  } catch (err) {
    return handleError(err);
  }
};

const findOneAndUpdate = async (model, filter, update) => {
  let updated = await model.findOneAndUpdate(filter, update);
  return updated;
};

module.exports = {
  userModel,
  employeeModel,
  projectModel,
  orgStructureModel,
  saveModel,
  findOneModel,
  findModel,
  findOneAndUpdate,
};
