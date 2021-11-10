const models = require('../models');

const UserModel = models.userModel;

const createUser = async (user) => {
  try {
    if (!user) throw new Error('Undefined user data passed');

    const newUser = new UserModel(user);
    await models.saveModel(newUser);
    return { success: true };
  } catch (err) {
    console.log('DB_CREATE_USER_ERROR', err);
    return { success: false };
  }
};

const getUser = async (username) => {
  try {
    if (!username) throw new Error('Username is undefined');
    const user = await models.findOneModel(UserModel, { username: username });
    return user;
  } catch (err) {
    console.log('DB_GET_USER_ERROR: ', err);
    return { success: false };
  }
};

const updateUser = async (username, Data) => {
  try {
    if (!username) throw new Error('No username provided');
    if (!Data) return { success: true };

    await models.findOneAndUpdate(UserModel, { username: username }, Data);

    return { success: true };
  } catch (err) {
    console.log('DB_UPDATE_USER_ERROR: ', err);
    return { success: false };
  }
};

const allUsers = async () => {
  try {
    const allUsers = await models.findModel(UserModel, {});
    return allUser;
  } catch (err) {
    console.log('DB_ALL_USERS_FETCHING_ERROR: ', err);
    return { success: false };
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  allUsers,
};
