const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validation } = require('../middleware');

//register
router.post('/register', validation, (req, res) => {
	const { username, password } = req.body;
	//register user
	const newUser = new User({
		username,
		password
	});
	// hash password
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) console.log(err);
			newUser.password = hash;
			newUser
				.save()
				.then((user) => {
					res.status(200).json({
						success: 'true',
						message: 'registration successful'
					});
				})
				.catch((error) => {
					return res.status(500).json({
						success: 'false',
						msg: error.message
					});
				});
		});
	});
});

//login
router.post('/login', (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: 'missing required fields' });
	}
	User.findOne({ username })
		.then((user) => {
			if (!user) {
				return res.status(400).json({ message: 'username not found' });
			}
			bcrypt.compare(password, user.password).then((isMatch) => {
				if (isMatch) {
					req.session.username = req.body.username;
					// create Jwt payload
					const payload = {
						id: user.id,
						username: user.username
					};
					// sign token
					jwt.sign(
						payload,
						process.env.SECRETORKEY,
						{
							expiresIn: 31556926
						},
						(err, token) => {
							if (err) throw err;
							return res.status(200).json({
								success: true,
								token: 'Bearer ' + token
							});
						}
					);
				} else {
					return res.status(400).json({
						success: 'false',
						message: 'Incorrect password'
					});
				}
			});
		})
		.catch((error) => {
			return res.status(500).json({
				success: 'false',
				msg: error.message
			});
		});
});

module.exports = router;
