let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ReserchPaperPresentationSchema = new Schema({
	presentation_topic: {
		type: String,
		required: true
	},
	presentation_description: {
		type: String,
	},
	presentation_conductor:{
		type:Schema.Types.ObjectId,
		ref:'Speaker'
	}, 
	presentation_date_and_time: {
		type: Date
	},
	changes_approved_by_admin: {
		type: Boolean,
		default: false
	},
});

module.exports = mongoose.model('ReserchPaperPresentation', ReserchPaperPresentationSchema);