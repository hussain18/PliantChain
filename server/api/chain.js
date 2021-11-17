const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../auth');

//auth asset
const authenticateToken = auth.authenticateToken;

// Routers
router.get(
  '/chain-transaction/:orgAddress/:senderAddress/:receiverAddress',
  //   '/chain-transaction',
  //   authenticateToken,
  (req, res) => {
    // console.log('GET: /chain-transaction is just called', req.query);
    console.log('GET: /chain-transaction is just called', req.params);
    res.send(req.params);
  }
);

module.exports = router;
