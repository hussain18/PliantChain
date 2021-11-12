const express = require('express');
const router = express.Router();
const auth = require('../auth');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Auth assets
const authenticateToken = auth.authenticateToken;
const createToken = auth.createTokens;
const saltRound = 10;

// Routers
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.json(400);

  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    req.body.password = hash;

    // Add user to database
    db.user.createUser(req.body).catch((err) => res.sendStatus(400));

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

router.post('/login', (req, res) => {
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

router.post('/refresh-token', (req, res) => {
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

router.get('/test-auth', authenticateToken, (req, res) => {
  res.json({ success: true });
});

module.exports = router;
