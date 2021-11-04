let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let TemporaryReserchPaperPresentationSchema = new Schema({
	presentation_topic: {
		type: String,
		required: true
	},
	presentation_description: {
		type: String,
	},
	presentation_conductor: {
		type: Schema.Types.ObjectId,
		ref: 'Speaker'
	},
	presentation_date_and_time: {
		type: Date
	},
	isNewRequest: {
		type: Boolean,
		default: false
	},
	matching_presentation_id: {
		type: Schema.Types.ObjectId,
		ref: 'ReserchPaperPresentation'
	},
});

module.exports = mongoose.model('TemporaryReserchPaperPresentation', TemporaryReserchPaperPresentationSchema);