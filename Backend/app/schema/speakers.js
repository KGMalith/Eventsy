let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let SpeakerSchema = new Schema({
	user_id:{
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	speaker_title:{
		type:String
	},
	speaker_first_name:{
		type: String
	},
	speaker_last_name:{
		type: String
	},
	speaker_affiliation:{
		type: String
	},
	speaker_image:{
		type: String
	},
	speaker_social_media:{
		twitter_link:{
			type: String
		},
		facebook_link:{
			type: String
		},
		linkedin_link:{
			type: String
		}
	},
	changes_approved_by_admin: {
		type: Boolean,
		default: false
	},
});

module.exports = mongoose.model('Speaker', SpeakerSchema);