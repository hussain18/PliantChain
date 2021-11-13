const models = require('../models');

const projectModel = models.projectModel;

const createProject = async (project) => {
  try {
    if (!project) throw new Error('Undefined project data passed');

    const newProject = new projectModel(project);
    await models.saveModel(newProject);
    return { success: true };
  } catch (err) {
    console.log('DB_CREATE_PROJECT_ERROR: ', err);
    return { success: false };
  }
};

const getProject = async (orgUsername, projectName) => {
  try {
    if (!projectName) throw new Error('Project name is undefined');

    const project = await models.findOneModel(projectModel, {
      projectName: projectName,
      orgUsername: orgUsername,
    });
    return project;
  } catch (err) {
    console.log('DB_GET_PROJECT_ERROR: ', err);
    return { success: false };
  }
};

const getOrgProjects = async (orgUsername) => {
  try {
    if (!orgUsername) throw new Error("Organization's username is undefined");
    const projects = await models.findModel(projectModel, {
      orgUsername: orgUsername,
    });
    return projects;
  } catch (err) {
    console.log('DB_GET_ORG_PROJECTS_ERROR: ', err);
    return { success: false };
  }
};

module.exports = {
  createProject,
  getProject,
  getOrgProjects,
};
