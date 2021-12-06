const { Requester, Validator } = require('@chainlink/external-adapter');
const express = require('express');
const router = express.Router();

require('dotenv').config;

// Define custom error scenarios for the API.
// Return true for the adapter to retry.
const customError = (data) => {
  if (data.Response === 'Error') return true;
  return false;
};

const customParams = {
  orgAddress: ['orgAddress'],
  senderAddress: ['senderAddress'],
  receiverAddress: ['receiverAddress'],
  jwtToken: ['jwtToken'],
};

const createRequest = (input, callback) => {
  // The Validator helps you validate the Chainlink request data
  const validator = new Validator(input, customParams);
  const jobRunID = validator.validated.id;
  const orgAddr = validator.validated.data.orgAddress;
  const senAddr = validator.validated.data.senderAddress;
  const recAddr = validator.validated.data.receiverAddress;
  const jwtToken = validator.validated.data.jwtToken;
  const url = `http://localhost:${process.env.PORT}/chain-transaction/${orgAddr}/${senAddr}/${recAddr}`;
  const method = 'get';
  const headers = {
    authorization: jwtToken,
  };

  const config = {
    url,
    method,
    headers,
  };

  // The Requester allows API calls be retry in case of timeout
  // or connection failure
  Requester.request(config, customError)
    .then((response) => {
      callback(response.status, Requester.success(jobRunID, response));
    })
    .catch((error) => {
      callback(500, Requester.errored(jobRunID, error));
    });
};

router.post('/chian-api-adapter', (req, res) => {
  console.log('POST Data: ', req.body);
  createRequest(req.body, (status, result) => {
    console.log('Result: ', result);
    res.status(status).json(result);
  });
});

module.exports = router;
