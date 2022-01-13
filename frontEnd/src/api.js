<<<<<<< HEAD
require('dotenv').config();

const axios = require('axios').default;

const SERVER_URL = 'http://localhost:3001';
=======
import axios from 'axios';
require('dotenv').config();

const SERVER_URL = 'http://localhost:2021';
>>>>>>> d4d9aeb24c00c988499557af7c1dba19c1a7ab55
const LOCAL_TOKEN = 'refreshToken.authorize';
let REFRESH_TOKEN = null;
const HEADERS = { 'Content-type': 'application/json' };

// Getting Authority status
const getAuth = () => {
  if (!REFRESH_TOKEN) {
    REFRESH_TOKEN = window.localStorage.getItem(LOCAL_TOKEN);
  }
  return REFRESH_TOKEN;
};

// Getting Refreshed Tokens
const getToken = async () => {
  const refreshToken =
    REFRESH_TOKEN || window.localStorage.getItem(LOCAL_TOKEN);
  const res = await axios.post(SERVER_URL + '/refresh-token', {
    token: refreshToken,
  });
  return res.data.token;
};

const saveRefreshToken = (token) => {
  window.localStorage.setItem(LOCAL_TOKEN, token);
};

const removeAuth = () => {
  window.localStorage.removeItem(LOCAL_TOKEN);
};

// Authenticating requests
const login = async (userData) => {
  try {
    const opts = {
      url: SERVER_URL + '/login',
      body: userData,
    };
    const tokens = await POST(opts);
    const refreshToken = await tokens.refreshToken;
    saveRefreshToken(refreshToken);
  } catch (err) {
    console.log('LOGIN_ERROR: \n' + err);
  }
};

const signup = async (userData) => {
  try {
    const opts = {
      url: SERVER_URL + '/signup',
      body: userData,
    };
    const tokens = await POST(opts);
    const refreshToken = await tokens.refreshToken;
    saveRefreshToken(refreshToken);
  } catch (err) {
    console.log('SIGNUP_ERROR: \n' + err);
  }
};

// Authorized Requests
const authRequest = async (url, request, body = {}) => {
  try {
    const opts = {
      url: SERVER_URL + url,
      body: body,
      headers: {
        authorization: await getToken(),
      },
    };

    const res = await request(opts);
    return res;
  } catch (err) {
    console.log('AUTHORIZED_REQUEST_ERROR: \n', err);
  }
};

// Basic requests
async function GET(opts) {
  const URL = opts.url;
  const header = opts.headers ? opts.headers : HEADERS;
  const res = await axios.get(URL, { headers: header });
  return res.data;
}

async function POST(opts) {
  const URL = opts.url;
  const header = opts.headers ? opts.headers : HEADERS;
  const body = opts.body;
  const res = await axios.post(URL, body, { headers: header });
  return res.data;
}

async function PATCH(opts) {
  const URL = opts.url;
  const header = opts.headers ? opts.headers : HEADERS;
  const body = opts.body;
  const res = await axios.patch(URL, body, { headers: header });
  return res.data;
}

<<<<<<< HEAD
module.exports = {
  signup,
  login,
  authRequest,
  GET,
  POST,
  PATCH,
  getAuth,
  removeAuth,
};
=======
export { signup, login, authRequest, GET, POST, PATCH, getAuth, removeAuth };
>>>>>>> d4d9aeb24c00c988499557af7c1dba19c1a7ab55
