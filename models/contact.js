const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const ContactSchema = new Schema({
	name: String,
	phone: Number,
	created: {
		type: Date,
		default: Date.now
	}
});

ContactSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Contact', ContactSchema);
