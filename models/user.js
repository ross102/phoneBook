const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	password: String,
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);
