let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let TemporarySpeakerSchema = new Schema({
	speaker_title: {
		type: String
	},
	speaker_first_name: {
		type: String
	},
	speaker_last_name: {
		type: String
	},
	speaker_affiliation: {
		type: String
	},
	speaker_image: {
		type: String
	},
	speaker_social_media: {
		twitter_link: {
			type: String
		},
		facebook_link: {
			type: String
		},
		linkedin_link: {
			type: String
		}
	},
	isNewRequest: {
		type: Boolean,
		default: false
	},
	matching_speaker_id: {
		type: Schema.Types.ObjectId,
		ref: 'Speaker'
	},

});

module.exports = mongoose.model('TemporarySpeaker', TemporarySpeakerSchema);