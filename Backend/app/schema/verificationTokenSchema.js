let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let TokenSchema = new Schema({
	user_email: {
		type: String,
		index: true,
		unique: true,
		default: null
	},
	token: {
		type: Number
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		expires: 86400
		//expires in 24 hrs (seconds)
	}
});

module.exports = mongoose.model('VerificationToken',TokenSchema);