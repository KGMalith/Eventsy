let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ContactSchema = new Schema({
	contact_name: {
		type: String,
		required: true
	},
	contact_email: {
		type: String
	},
	contact_subject: {
		type: String
	},
	conference_message: {
		type: String
	},
});
module.exports = mongoose.model('Contact', ContactSchema);