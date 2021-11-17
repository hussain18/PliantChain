const express = require('express');
const cors = require('cors');
const env = require('dotenv').config();
const auth = require('./auth.js');
const db = require('./db');
const api = require('./api');

app = express();
PORT = process.env.PORT || 3001;

// Express Use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
db.connDB();

app.get('/', (req, res) => {
  res.sendStatus(418);
});

// User Authentication Routers
app.use('/', api.authRouter);

// Front End Routers
app.use('/', api.frontEndRouter);

// Chain Routers
app.use('/', api.chainRouter);
app.use('/', api.chainExternalAdapter);

// Listening
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
