const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Contact = require('../models/contact');
const { isloggedIn } = require('../middleware');

module.exports = router;
