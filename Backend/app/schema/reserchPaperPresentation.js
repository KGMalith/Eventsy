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
	}
});

module.exports = mongoose.model('ReserchPaperPresentation', ReserchPaperPresentationSchema);