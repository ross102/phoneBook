const express = require('express');
const router = express.Router();
const { validation } = require('../middleware');
const { registerUser, loginUser } = require('../controllers');

router.post('/register', validation, registerUser);
router.post('/login', loginUser);

module.exports = router;
