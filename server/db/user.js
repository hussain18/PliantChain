users = [];

const newUser = (username, password) => {
  users.push({
    username: username,
    password: password,
  });
};

const getUser = (username) => {
  return users.filter((user) => {
    user.username === username;
  });
};

const showAllUsers = () => {
  console.log(users);
};

module.exports = {
  newUser,
  getUser,
  showAllUsers,
};
