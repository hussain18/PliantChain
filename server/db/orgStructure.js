const models = require('../models');
const dbUser = require('./user');

const orgStructureModel = models.orgStructureModel;

const createStructure = async (structure) => {
  try {
    if (!structure) throw new Error('Undefined Structure data passed');

    const empUsername = structure.empUsername;
    const employee = await dbUser.getUser(empUsername);
    if (!employee) throw new Error('The user does not exist');
    if (employee.type !== '2') throw new Error('User type mismatch');

    structure.empAccountAddress = employee.accountAddress;

    const newStructure = new orgStructureModel(structure);
    await models.saveModel(newStructure);
    return { success: true };
  } catch (err) {
    console.log('DB_CREATE_STRUCTURE_ERROR', err);
    return { success: false };
  }
};

const getOrgStructure = async (orgUsername) => {
  try {
    if (!orgUsername) throw new Error("Organization's username is undefined");
    const structure = await models.findModel(orgStructureModel, {
      orgUsername: orgUsername,
    });
    return structure;
  } catch (err) {
    console.log('DB_GET_ORG_STRUCTURE_ERROR: ', err);
    return { success: false };
  }
};

const getStructure = async (orgUsername, empUsername) => {
  try {
    if (!orgUsername) throw new Error("Organization's username is undefined");
    const structure = await models.findOneModel(orgStructureModel, {
      orgUsername: orgUsername,
      empUsername: empUsername,
    });
    return structure;
  } catch (err) {
    console.log('DB_GET_STRUCTURE_ERROR: ', err);
    return { success: false };
  }
};

const updateStructure = async (orgUsername, Data) => {
  try {
    if (!orgUsername) throw new Error("No organization's username provided");
    if (!Data) return { success: true };
    if (Data.orgUsername !== orgUsername)
      throw new Error('Data provided is not from this organization');

    await models.findOneAndUpdate(
      orgStructureModel,
      { orgUsername: orgUsername, empUsername: Data.empUsername },
      { authorities: Data.authorities }
    );

    return { success: true };
  } catch (err) {
    console.log('DB_UPDATE_STRUCTURE_ERROR: ', err);
    return { success: false };
  }
};

module.exports = {
  createStructure,
  updateStructure,
  getOrgStructure,
  getStructure,
};
