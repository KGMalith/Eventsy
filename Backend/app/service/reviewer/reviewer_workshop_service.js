let User = require('../../schema/user');
let Notification = require('../../schema/notification');

const BadRequestException = require('./../../util/exceptions/badRequestException');

module.exports.getAllWorkshopProposalSubmissions = async () => {
	// eslint-disable-next-line no-useless-catch
	try {
		let WorkshopConductorList = await User.find({ role: 2, is_signup_completed: true, is_email_verified: true, 'event_details.media_file_details.media_file_status': 0 });

		let array_data_set = [];

		for (let index = 0; index < WorkshopConductorList.length; index++) {

			let return_data = {
				workshop_conductor_id: WorkshopConductorList[index]._id,
				workshop_conductor_email_address: WorkshopConductorList[index].email,
				workshop_conductor_image: WorkshopConductorList[index].user_image,
				workshop_conductor_name: WorkshopConductorList[index].name_title + ' ' + WorkshopConductorList[index].first_name + ' ' + WorkshopConductorList[index].last_name
			};

			array_data_set.push(return_data);

		}

		return {
			msg: 'Generated all requested workshop conductors list',
			data: array_data_set
		};

	} catch (err) {
		throw err;
	}
};

module.exports.viewSingleWorkshopProposalSubmission = async (requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {

		let WorkshopConductorObj = await User.findById(requestBody.user_id);

		if (!WorkshopConductorObj) {
			throw new BadRequestException('Invalid user id');
		}

		let return_data = {
			workshop_conductor_id: WorkshopConductorObj._id,
			workshop_conductor_email_address: WorkshopConductorObj.email,
			workshop_conductor_name: WorkshopConductorObj.name_title + ' ' + WorkshopConductorObj.first_name + ' ' + WorkshopConductorObj.last_name,
			workshop_conductor_mobile_number: WorkshopConductorObj.mobile_number,
			media_file: WorkshopConductorObj.event_details.media_file_details.media_file
		};

		return {
			msg: 'Generated requested workshop conductor',
			data: return_data
		};

	} catch (err) {
		throw err;
	}
};

module.exports.approveWorkshopProposal = async (requestUser, requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {
		let WorkshopConductorObj = await User.findById(requestBody.user_id);
		if (!WorkshopConductorObj) {
			throw new BadRequestException('Invalid user id');
		}

		WorkshopConductorObj.event_details.media_file_details.media_file_status = 1;
		WorkshopConductorObj.save();

		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: 'Workshop proposal accepted'
		};
		notificationArray.push(notify);

		//check are there any exisiting notification object
		let notificationObj = await Notification.findOne({ user_role: 2, notifing_to: requestBody.user_id });

		if (notificationObj) {
			notificationObj.notification.push(notify);
			notificationObj.save();
		} else {
			//create notification
			let notification = {
				user_role: 2,
				notifing_to: requestBody.user_id,
				notification: notificationArray
			};
			let newNotification = new Notification(notification);
			await newNotification.save();
		}

		return {
			msg: 'Workshop proposal approved'
		};
	} catch (err) {
		throw err;
	}
};

module.exports.rejectWorkshopProposal = async (requestUser, requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {
		let WorkshopConductorObj = await User.findById(requestBody.user_id);

		if (!WorkshopConductorObj) {
			throw new BadRequestException('Invalid user id');
		}

		WorkshopConductorObj.event_details.media_file_details.media_file_status = -1;
		WorkshopConductorObj.save();

		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: 'Workshop proposal rejected'
		};
		notificationArray.push(notify);

		//check are there any exisiting notification object
		let notificationObj = await Notification.findOne({ user_role: 2, notifing_to: requestBody.user_id });

		if (notificationObj) {
			notificationObj.notification.push(notify);
			notificationObj.save();
		} else {
			//create notification
			let notification = {
				user_role: 2,
				notifing_to: requestBody.user_id,
				notification: notificationArray
			};
			let newNotification = new Notification(notification);
			await newNotification.save();
		}

		return {
			msg: 'Workshop proposal rejected'
		};
	} catch (err) {
		throw err;
	}
};