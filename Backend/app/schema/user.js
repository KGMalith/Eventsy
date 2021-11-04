let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
	email:{
		type:String,
		index:true,
		unique:true,
		required:true
	},
	password:{
		type: String,

	},
	mobile_number:{
		type:String
	},
	name_title:{
		type: String
	},
	first_name:{
		type:String
	},
	last_name:{
		type:String
	},
	affliation:{
		type: String
	},
	role:{
		type:Number,
		required:true
		// 0 => normal user(attendee) ,  1=> resercher , 2 =>workshp conductor , 3=> reviewer , 4=> editor , 5=> admin  
	},
	user_image: {
		type: String
	},
	is_signup_completed:{
		type: Boolean,
		default: false
	},
	is_email_verified:{
		type: Boolean,
		default: false
	},
	is_requested_user:{
		type:Boolean,
		default:false
	},
	event_details:{
		media_file_details: {
			media_file: {
				type: String
			},
			media_file_status: {
				type: Number,
				default: 0
				// 0 => pending ,  1=> accepted , -1 => rejected 
			}
		},
		is_event_created:{
			type: Boolean,
			default: false
		}
	}
	
});

module.exports = mongoose.model('User',UserSchema);