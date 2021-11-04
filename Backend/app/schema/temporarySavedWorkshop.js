let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let TemporaryWorkshopSchema = new Schema({
	workshop_name: {
		type: String,
		required: true
	},
	workshop_description: {
		type: String,
	},
	workshop_speakers: [{
		type: Schema.Types.ObjectId,
		ref: 'Speaker'
	}],
	workshop_date_and_time: {
		type: Date
	},
	isNewRequest: {
		type: Boolean,
		default: false
	},
	matching_workshop_id: {
		type: Schema.Types.ObjectId,
		ref: 'Workshop'
	},
});

module.exports = mongoose.model('TemporaryWorkshop', TemporaryWorkshopSchema);