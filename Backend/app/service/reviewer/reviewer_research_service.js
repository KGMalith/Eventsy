let User = require('../../schema/user');
let Notification = require('../../schema/notification');

const BadRequestException = require('./../../util/exceptions/badRequestException');

module.exports.getAllPendingResearchPaperSubmissions = async () => {
	// eslint-disable-next-line no-useless-catch
	try {
		let ReviewerList = await User.find({ role: 1, is_signup_completed: true, is_email_verified: true, 'event_details.media_file_details.media_file_status':0 });

		let array_data_set = [];

		for (let index = 0; index < ReviewerList.length; index++) {
			
			let return_data = {
				researcher_id: ReviewerList[index]._id,
				researcher_email_address: ReviewerList[index].email,
				researcher_affliation: ReviewerList[index].affliation,
				researcher_name: ReviewerList[index].name_title + ' ' + ReviewerList[index].first_name + ' ' + ReviewerList[index].last_name,
				researcher_mobile_number: ReviewerList[index].mobile_number
			}; 

			array_data_set.push(return_data);
            
		}

		return {
			msg: 'Generated all requested researchers',
			data: array_data_set
		};

	} catch (err) {
		throw err;
	}
};

module.exports.viewSingleResearchPaperSubmission = async (requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {

		let researcherObj = await User.findById(requestBody.user_id);

		if (!researcherObj) {
			throw new BadRequestException('Invalid user id');
		}

		let return_data = {
			researcher_id: researcherObj._id,
			researcher_email_address: researcherObj.email,
			researcher_affliation: researcherObj.affliation,
			researcher_name: researcherObj.name_title + ' ' + researcherObj.first_name + ' ' + researcherObj.last_name,
			researcher_mobile_number: researcherObj.mobile_number,
			media_file: researcherObj.event_details.media_file_details.media_file
		}; 

		return {
			msg: 'Generated requested researcher',
			data: return_data
		};
        
	} catch (err) {
		throw err;
	}
};

module.exports.approveResearchPaper = async (requestUser, requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {
		let researcherObj = await User.findById(requestBody.user_id);
		if (!researcherObj) {
			throw new BadRequestException('Invalid user id');
		}
        
		researcherObj.event_details.media_file_details.media_file_status = 1;
		researcherObj.save();

		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: 'Research paper accepted'
		};
		notificationArray.push(notify);

		//check are there any exisiting notification object
		let notificationObj = await Notification.findOne({ user_role: 1, notifing_to: requestBody.user_id });

		if (notificationObj) {
			notificationObj.notification.push(notify);
			notificationObj.save();
		} else {
			//create notification
			let notification = {
				user_role: 1,
				notifing_to: requestBody.user_id,
				notification: notificationArray
			};
			let newNotification = new Notification(notification);
			await newNotification.save();
		}

		return {
			msg: 'Research paper approved'
		};
	} catch (err) {
		throw err;
	}
};

module.exports.rejectResearchPaper = async (requestUser, requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {
		let researcherObj = await User.findById(requestBody.user_id);
        
		if (!researcherObj) {
			throw new BadRequestException('Invalid user id');
		}

		researcherObj.event_details.media_file_details.media_file_status = -1;
		researcherObj.save();

		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: 'Research paper rejected'
		};
		notificationArray.push(notify);

		//check are there any exisiting notification object
		let notificationObj = await Notification.findOne({ user_role: 1, notifing_to: requestBody.user_id });

		if (notificationObj) {
			notificationObj.notification.push(notify);
			notificationObj.save();
		} else {
			//create notification
			let notification = {
				user_role: 1,
				notifing_to: requestBody.user_id,
				notification: notificationArray
			};
			let newNotification = new Notification(notification);
			await newNotification.save();
		}

		return {
			msg: 'Research paper rejected'
		};
	} catch (err) {
		throw err;
	}
};