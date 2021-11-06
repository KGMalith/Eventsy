let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ConferenceSchema = new Schema({
	conference_name:{
		type:String,
		required:true
	},
	conference_sub_topic:{
		type: String
	},
	conference_type:{
		type:String     //online,physical
	},
	conference_location: {
		location_name:{
			type: String
		},
		location_desc:{
			type: String
		},
		location_google_map_link:{
			type: String
		},
		location_images:[{
			type: String
		}]
	},
	conference_days:{
		start_date:{
			type: Date
		},
		end_date:{
			type: Date
		}
	},
	conference_organizer:{
		type: String
	},
	conference_about:{
		type: String
	},
	conference_images: [{
		type: String
	}],
	registration_fees:{
		attendee_registration_fee: {
			type: Number
		},
		researcher_registration_fee: {
			type: Number
		},
		workshop_conductor_registration_fee: {
			type: Number
		},
	},
	contact_details: {
		address:{
			type: String
		},
		phone_number:{
			type: Number
		},
		email:{
			type: String
		}
	},
	changes_approved_by_admin:{
		type:Boolean
	},
	key_note_speakers: [{
		type: Schema.Types.ObjectId,
		ref: 'Speaker'
	}],
	conference_workshops:[{
		type: Schema.Types.ObjectId,
		ref: 'Workshop'
	}],
	conference_reserch_paper_presentations:[{
		type: Schema.Types.ObjectId,
		ref: 'ReserchPaperPresentation'
	}],
	is_conference_active:{
		type:Boolean,
		default:false
	}
	
});

module.exports = mongoose.model('Conference', ConferenceSchema);