const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
// const auth = require('./auth.js');
const bcrypt = require('bcrypt');
// const db = require('./db');

app = express();
PORT = process.env.PORT || 3001;

// Express Use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
// db.connDB();

// Auth assets
// const authenticateToken = auth.authenticateToken;
// const createToken = auth.createTokens;
// const saltRound = 10;

app.get('/', (req, res) => {
  res.sendStatus(418);
});

// Listening
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
