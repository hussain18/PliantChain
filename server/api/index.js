const authRouter = require('./auth');
const frontEndRouter = require('./frontEnd');
const chainRouter = require('./chain');
const chainExternalAdapter = require('./chainExternalAdapter');

module.exports = {
  authRouter,
  frontEndRouter,
  chainRouter,
  chainExternalAdapter,
};
