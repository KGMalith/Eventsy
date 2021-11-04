let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let WorkshopSchema = new Schema({
	workshop_name:{
		type:String,
		required:true
	},
	workshop_description:{
		type: String,
	},
	workshop_speakers:[{
		type: Schema.Types.ObjectId,
		ref: 'Speaker'
	}],
	workshop_date_and_time:{
		type:Date
	},
	changes_approved_by_admin: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Workshop', WorkshopSchema);