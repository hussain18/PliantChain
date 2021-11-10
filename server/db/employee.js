const models = require('../models');

const employeeModel = models.employeeModel;

const createEmployee = async (employee) => {
  try {
    if (!employee) throw new Error('Undefined employee data passed');

    const newEmployee = new employeeModel(employee);
    await models.saveModel(newEmployee);
    return { success: true };
  } catch (err) {
    console.log('DB_CREATE_EMPLOYEE_ERROR', err);
    return { success: false };
  }
};

const getOrgEmployees = async (orgUsername) => {
  try {
    if (!orgUsername) throw new Error("Organization's username is undefined");
    const employees = await models.findModel(employeeModel, {
      username: orgUsername,
    });
    return employees;
  } catch (err) {
    console.log('DB_GET_ORG_EMPLOYEES_ERROR: ', err);
    return { success: false };
  }
};

const getEmployee = async (empUsername) => {
  try {
    if (!empUsername) throw new Error("Employee's username is undefined");
    const employee = await models.findOneModel(employeeModel, {
      username: empUsername,
    });
    return employee;
  } catch (err) {
    console.log('DB_GET_EMPLOYEE_ERROR: ', err);
    return { success: false };
  }
};

module.exports = {
  createEmployee,
  getOrgEmployees,
  getEmployee,
};
