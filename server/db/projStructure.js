const models = require('../models');
const dbUser = require('./user');
const dbProject = require('./project');

const projStructureModel = models.projStructureModel;

const createProjStructure = async (structure) => {
  try {
    if (!structure) throw new Error('Undefined Structure data passed');

    const empUsername = structure.empUsername;
    const projectName = structure.projectName;
    const employee = await dbUser.getUser(empUsername);
    const project = await dbProject.getProject(
      structure.orgUsername,
      projectName
    );

    if (!employee) throw new Error('The user does not exist');
    if (!project) throw new Error('The project does not exist');

    structure.empAccountAddress = employee.accountAddress;

    const newStructure = new projStructureModel(structure);
    await models.saveModel(newStructure);
    return { success: true };
  } catch (err) {
    console.log('DB_CREATE_PROJECT_STRUCTURE_ERROR', err);
    return { success: false };
  }
};

const getProjStructure = async (orgUsername, projectName) => {
  try {
    if (!orgUsername) throw new Error("Organization's username is undefined");
    if (!projectName) throw new Error("Project's name is undefined");
    const structure = await models.findModel(projStructureModel, {
      orgUsername: orgUsername,
      projectName: projectName,
    });
    return structure;
  } catch (err) {
    console.log('DB_GET_PROJECT_PROJ_STRUCTURE_ERROR: ', err);
    return { success: false };
  }
};

const getStructure = async (orgUsername, empUsername, projectName) => {
  try {
    if (!orgUsername || !empUsername || !projectName)
      throw new Error('Some functions arguments are not passed');

    const structure = await models.findOneModel(projStructureModel, {
      orgUsername: orgUsername,
      empUsername: empUsername,
      projectName: projectName,
    });
    return structure;
  } catch (err) {
    console.log('DB_GET_PROJECT_STRUCTURE_ERROR: ', err);
    return { success: false };
  }
};

const updateStructure = async (projectName, Data) => {
  try {
    if (!projectName) throw new Error("No project's username provided");
    if (!Data) return { success: true };
    if (Data.projectName !== projectName)
      throw new Error('Data provided is not from this project');

    await models.findOneAndUpdate(
      projStructureModel,
      { projectName: projectName, empUsername: Data.empUsername },
      { authorities: Data.authorities }
    );

    return { success: true };
  } catch (err) {
    console.log('DB_UPDATE_PROJECT_STRUCTURE_ERROR: ', err);
    return { success: false };
  }
};

module.exports = {
  createProjStructure,
  updateStructure,
  getProjStructure,
  getStructure,
};
