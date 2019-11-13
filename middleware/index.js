const User = require('../models/user');
const Contact = require('../models/contact');
const jwt = require('jsonwebtoken');

module.exports = {
	validation: (req, res, next) => {
		// only two fields
		const { username, password } = req.body;
		if (!username || !password)
			return res.status(400).json({
				success: false,
				message: 'missing required fields'
			});
		if (!username.match(/^[a-zA-Z ]+$/) || username.length < 4) {
			return res.status(400).json({
				success: false,
				message: 'username should be at least three(4) alphabets'
			});
		}
		if (!password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)) {
			return res.status(400).json({
				success: false,
				message:
					'password should be a minimum of 6 characters, one uppercase,one lowercase,one special character and one digit,'
			});
		}

		// Check if user already registered before
		User.findOne({ username })
			.then((founduser) => {
				if (founduser) {
					return res.status(409).json({
						success: 'false',
						message: 'sorry, username already exists'
					});
				}
				return next();
			})
			.catch((error) => {
				return res.status(500).json({
					success: 'false',
					message: error.message
				});
			});
	},
	isloggedIn: (req, res, next) => {
		let token = req.headers['authorization'];
		if (!token) {
			return res.status(401).json({
				success: 'false',
				msg: 'Access Denied. No token given. '
			});
		}
		token = token.split(' '); //bearer token
		token = token[1];
		jwt.verify(token, process.env.SECRETORKEY, (err, verified) => {
			if (err) {
				return res.status(401).json({ success: false, message: err });
			}
			// req.user = verified
			return next();
		});
	},
	contactVal: (req, res, next) => {
		const { name, phone } = req.body;
		if (!name || !phone) {
			return res.status(400).json({
				success: false,
				message: 'missing required fields'
			});
		}
		if (!phone.match(/^\d{10}$/)) return res.status(400).json({ message: 'Not a valid phone number' });

		if (!name.match(/^[a-z ]{3,}$/i))
			return res.status(400).json({ message: 'name should be a minimum of three(3) alphabets' });

		// avoid duplicate contacts in phonebook
		Contact.findOne({ name })
			.then((foundname) => {
				if (foundname) {
					return res.status(409).json({
						success: 'false',
						message: 'contact name already exists'
					});
				}
				return next();
			})
			.catch((error) => {
				return res.status(500).json({
					success: 'false',
					message: error.message
				});
			});
	}
};
