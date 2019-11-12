const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
	name: String,
	phone: Number,
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Contact', contactSchema);
