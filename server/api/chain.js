const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../auth');

//auth asset
const authenticateToken = auth.authenticateToken;

// Routers
router.get(
  '/chain-transaction/:orgAddress/:senderAddress/:receiverAddress',
  authenticateToken,
  (req, res) => {
    res.send(req.params);
  }
);

module.exports = router;
