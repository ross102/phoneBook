const express = require('express');
const router = express.Router();
const { isloggedIn, contactVal } = require('../middleware');
const { createContact, getContacts, updateContact, deleteContact } = require('../controllers/contacts');

//  contact/
router.post('/', isloggedIn, contactVal, createContact);
router.get('/', isloggedIn, getContacts);
router.put('/:id', isloggedIn, contactVal, updateContact);
router.delete('/:id', isloggedIn, deleteContact);

module.exports = router;
