const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./db');
const env = require('dotenv').config();

// Authenticate user
const authenticateUser = async (user) => {
  const password = user.password;
  const username = user.username;

  if (!username || !password) return false;

  const dbUser = await db.user.getUser(username);
  if (!dbUser) return false;

  const hash = dbUser.password;

  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (err) {
    console.log('USER_PASSWORD_MATCHING_ERROR: \n' + err);
    return false;
  }
};

// Authenticate tokens
const authenticateToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.sendStatus(403);

    const authHeader = req.headers.authorization.split(' ')[1];

    // Note: Uncomment the following when using react
    // const authHeader = req.headers.authorization;

    const token = authHeader;
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (err) {
    console.log('TOKEN_AUTHENTICATION_ERROR: ', err);
    return res.sendStatus(500);
  }
};

// Create Tokens
const createTokens = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '100m' }); //NOTE: length of time is only for testing
};

module.exports = {
  authenticateToken,
  createTokens,
  authenticateUser,
};
