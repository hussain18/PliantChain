const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const auth = require('./auth.js');
const bcrypt = require('bcrypt');
const db = require('./db');

app = express();
PORT = process.env.PORT || 3001;

// Express Use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
db.connDB();

// Auth assets
const authenticateToken = auth.authenticateToken;
const createToken = auth.createTokens;
const saltRound = 10;

app.get('/', (req, res) => {
  res.sendStatus(418);
});

// ======================================
// User Authentication Process
// ======================================
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.json(400);

  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    // Add user to database
    db.user.newUser(username, hash);

    // authenticate user
    const User = { name: username };
    const accessToken = createToken(User);
    const refreshToken = jwt.sign(
      User,
      process.env.REFRESH_ACCESS_TOKEN_SECRET
    );
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  });
});

app.post('/login', (req, res) => {
  const user = req.body;

  if (!user) return res.sendStatus(400);

  //User authentication
  auth.authenticateUser(user).then((result) => {
    if (!result) return res.sendStatus(400);

    //Token Creation
    const userName = user.username;
    const User = { name: userName };

    const accessToken = createToken(User);
    const refreshToken = jwt.sign(
      User,
      process.env.REFRESH_ACCESS_TOKEN_SECRET
    );
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  });
});

app.post('/refresh-token', (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = createToken({ name: user.name });
      return res.json({ token: accessToken });
    }
  );
});

app.get('/test-auth', authenticateToken, (req, res) => {
  res.json({ success: true });
});

// Listening
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
