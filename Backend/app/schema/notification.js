let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let NotificationSchema = new Schema({
	user_role:{
		type:Number, //notifing user role (Admin,reviewer etc)
		required: true
	},
	notifing_to:{
		type: Schema.Types.ObjectId, //notifing user id (if want to notify specific person)
		ref: 'User'
	},
	notification:[{
		created_by: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		message:{
			type:String
		}
	}]

});

module.exports = mongoose.model('Notification',NotificationSchema);