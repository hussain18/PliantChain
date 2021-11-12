const models = require('../models');

const orgStructureModel = models.orgStructureModel;

const createStructure = async (structure) => {
  try {
    if (!structure) throw new Error('Undefined Structure data passed');

    const newStructure = new orgStructureModel(structure);
    await models.saveModel(newStructure);
    return { success: true };
  } catch (err) {
    console.log('DB_CREATE_STRUCTURE_ERROR', err);
    return { success: false };
  }
};

const getStructure = async (orgUsername) => {
  try {
    if (!orgUsername) throw new Error("Organization's username is undefined");
    const structure = await models.findOneModel(orgStructureModel, {
      orgUsername: orgUsername,
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

    await models.findOneAndUpdate(
      orgStructureModel,
      { orgUsername: orgUsername },
      Data
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
  getStructure,
};
