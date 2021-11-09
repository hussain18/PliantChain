const mongoose = require('mongoose');
const user = require('./user');
const env = require('dotenv').config();

// Database Connection
const connDB = () => {
  mongoose.connect(process.env.LOCAL_DB_ADDRESS, {
    useNewUrlParser: 'true',
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  mongoose.connection.on('error', (err) => {
    console.log('DATABASE_CONNECTION_ERROR: \n', err);
  });
  mongoose.connection.on('connected', (err, res) => {
    console.log('DATABASE CONNECTION SUCCESSFUL');
  });
};

module.exports = {
  connDB,
  user,
};
