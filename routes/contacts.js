const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Contact = require('../models/contact');
const { isloggedIn, contactVal } = require('../middleware');

//create
router.post('/', isloggedIn, contactVal, (req, res) => {
	const { name, phone } = req.body;
	const phoneBook = new Contact({
		name,
		phone
	});
	phoneBook.save((error) => {
		if (error) {
			throw new Error(error);
		}
		return res.status(200).json({ success: true, message: 'contact saved' });
	});
});

//get all contacts
router.get('/', isloggedIn, async (req, res) => {
	try {
		let phoneBook = await Contact.paginate(
			{},
			{
				page: req.query.page || 1,
				limit: 10,
				sort: '-_id'
			}
		);
		phoneBook.page = Number(phoneBook.page);
		res.status(200).json({ phoneBook });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.put('/:id', isloggedIn, contactVal, (req, res) => {
	let phoneBook = {
		name: req.body.name,
		phone: req.body.phone
	};
	Contact.findByIdAndUpdate(req.params.id, phoneBook, (err, updatedContact) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		return res.status(400).json({ message: 'contact updated' });
	});
});

router.delete('/:id', isloggedIn, async (req, res) => {
	try {
		await Contact.findByIdAndRemove(req.params.id);
		return res.status(200).json({ msg: 'deleted' });
	} catch (error) {
		return res.status(500).json({
			message: error.message
		});
	}
});

module.exports = router;
