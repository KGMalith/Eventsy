let mongoose = require('mongoose');
let ReserchPaperPresentation = require('../../schema/reserchPaperPresentation');
let TemporaryReserchPaperPresentation = require('../../schema/temporarySavedResearchPaperPresentation');
let Notification = require('../../schema/notification');
let Speaker = require('../../schema/speakers');
let User = require('../../schema/user');

const BadRequestException = require('./../../util/exceptions/badRequestException');

module.exports.getEventPendingResearchPapers = async () => {
	// eslint-disable-next-line no-useless-catch
	try {
		
		let UserList = await User.find({ role: 1, is_signup_completed: true, is_email_verified: true,'event_details.media_file_details.media_file_status':1,'event_details.is_event_created':false});

		let user_list_array = [];

		for (let index = 0; index < UserList.length; index++) {
			
			let return_data = {
				researcher_id: UserList[index]._id,
				researcher_email_address: UserList[index].email,
				researcher_affliation: UserList[index].affliation,
				researcher_name: UserList[index].name_title + ' ' + UserList[index].first_name + ' ' + UserList[index].last_name,
				researcher_mobile_number: UserList[index].mobile_number
			}; 

			user_list_array.push(return_data);
		}

		return {
			msg: 'All event pending requests generated',
			data: user_list_array
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getEventPendingResearchPaper = async (requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {

		let userObj = await User.findById(requestBody.user_id);

		if (!userObj) {
			throw new BadRequestException('Invalid user id');
		}

		let return_data = {
			researcher_id: userObj._id,
			researcher_email_address: userObj.email,
			researcher_affliation: userObj.affliation,
			researcher_name: userObj.name_title + ' ' + userObj.first_name + ' ' + userObj.last_name,
			researcher_mobile_number: userObj.mobile_number,
			media_file: userObj.event_details.media_file_details.media_file
		};

		return {
			msg: 'Event pending request generated',
			data: return_data
		};

	} catch (err) {
		throw err;
	}
};

module.exports.createPresentation = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();
	try {

		//generating user object
		let UserObject = await User.findById(requestBody.user_id).session(session);

		if (!UserObject) {
			throw new BadRequestException('Invalid user id');
		}

		//check event is created for request user
		if (UserObject.event_details.is_event_created){
			throw new BadRequestException('Event already created for this researcher');
		}

		let SpeakerObj = Speaker.findOne({ user_id: UserObject._id});

		if (!SpeakerObj){
			throw new BadRequestException('Invalid user id');
		}

		let presentationObj = {
			presentation_topic: requestBody.presentation_topic,
			presentation_description: requestBody.presentation_description,
			presentation_conductor: SpeakerObj._id,
			presentation_date_and_time: requestBody.presentation_date_and_time,
			isNewRequest: true
		};

		//create temporary object
		let newTemporarypresentation = new TemporaryReserchPaperPresentation(presentationObj);
		newTemporarypresentation.$session(session);
		await newTemporarypresentation.save();

		//update presentation event as created in user object
		UserObject.event_details.is_event_created = true;
		UserObject.$session(session);
		await UserObject.save();

		//notificaton
		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: 'New presentation added. Waiting for review'
		};
		notificationArray.push(notify);

		//check are there any exisiting notification object
		let notificationObj = await Notification.findOne({ user_role: 5 }).session(session);

		if (notificationObj) {
			notificationObj.notification.push(notify);
			notificationObj.$session(session);
			notificationObj.save();
		} else {
			//create notification
			let notification = {
				user_role: 5,
				notification: notificationArray
			};
			let newNotification = new Notification(notification);
			newNotification.$session(session);
			await newNotification.save();
		}

		await session.commitTransaction();

		return {
			msg: 'Presentation created. request sent to admin'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.editPresentation = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();
	try {

		let PresentationObj = await ReserchPaperPresentation.findById(requestBody.presentation_id).session(session);

		if (!PresentationObj) {
			throw new BadRequestException('Invalid presentation id');
		}

		let presentationObj = {
			presentation_topic: requestBody.presentation_topic,
			presentation_description: requestBody.presentation_description,
			presentation_conductor: PresentationObj.presentation_conductor,
			presentation_date_and_time: requestBody.presentation_date_and_time,
			matching_presentation_id: requestBody.presentation_id,
			isNewRequest:false
		};

		//create temporary object
		let newTemporarypresentation = new TemporaryReserchPaperPresentation(presentationObj);
		newTemporarypresentation.$session(session);
		await newTemporarypresentation.save();

		//notificaton
		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: 'one presentation edited. Waiting for review'
		};
		notificationArray.push(notify);

		//check are there any exisiting notification object
		let notificationObj = await Notification.findOne({ user_role: 5 }).session(session);

		if (notificationObj) {
			notificationObj.notification.push(notify);
			notificationObj.$session(session);
			notificationObj.save();
		} else {
			//create notification
			let notification = {
				user_role: 5,
				notification: notificationArray
			};
			let newNotification = new Notification(notification);
			newNotification.$session(session);
			await newNotification.save();
		}

		await session.commitTransaction();

		return {
			msg: 'Presentation edited. request sent to admin'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};


module.exports.editTempPresentation = async (requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();
	try {

		let presentationObj = await TemporaryReserchPaperPresentation.findById(requestBody.presentation_id).session(session);

		if (!presentationObj) {
			throw new BadRequestException('Invalid presentation id');
		}

		presentationObj.presentation_topic = requestBody.presentation_topic;
		presentationObj.presentation_description = requestBody.presentation_description;
		presentationObj.presentation_date_and_time = requestBody.presentation_date_and_time;

		await presentationObj.save();

		await session.commitTransaction();

		return {
			msg: 'Presentation edited. request sent to admin'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.getAllPresentations = async () => {

	// eslint-disable-next-line no-useless-catch
	try {
		
		let presentationList = await ReserchPaperPresentation.find({}).populate('presentation_conductor', 'speaker_title speaker_first_name speaker_last_name');

		let presentation_array = [];

		for (let index = 0; index < presentationList.length; index++) {
			
			let data_set = {
				presentation_id: presentationList[index]._id,
				presentation_topic: presentationList[index].presentation_topic,
				presentation_description: presentationList[index].presentation_description,
				presentation_conductor: presentationList[index].presentation_conductor.speaker_title + ' ' + presentationList[index].presentation_conductor.speaker_first_name + ' ' + presentationList[index].presentation_conductor.speaker_last_name,
				presentation_date_and_time: presentationList[index].presentation_date_and_time
			};
			presentation_array.push(data_set);
		}

		return {
			msg: 'All presentations generated',
			data: presentation_array
		};

	} catch (err) {
		throw err;
	}
};


module.exports.getAllTempPresentations = async () => {

	// eslint-disable-next-line no-useless-catch
	try {
		
		let presentationList = await TemporaryReserchPaperPresentation.find({}).populate('presentation_conductor', 'speaker_title speaker_first_name speaker_last_name');

		let presentation_array = [];

		for (let index = 0; index < presentationList.length; index++) {

			let data_set = {
				presentation_id: presentationList[index]._id,
				presentation_topic: presentationList[index].presentation_topic,
				presentation_description: presentationList[index].presentation_description,
				presentation_conductor: presentationList[index].presentation_conductor.speaker_title + ' ' + presentationList[index].presentation_conductor.speaker_first_name + ' ' + presentationList[index].presentation_conductor.speaker_last_name,
				presentation_date_and_time: presentationList[index].presentation_date_and_time
			};
			presentation_array.push(data_set);
		}

		return {
			msg: 'All presentations generated',
			data: presentation_array
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getSingleTempPresentation = async (requestBody) => {

	// eslint-disable-next-line no-useless-catch
	try {
		
		let presentation = await TemporaryReserchPaperPresentation.findById(requestBody.presentation_id).populate('presentation_conductor', 'speaker_title speaker_first_name speaker_last_name');
		
		if (!presentation) {
			throw new BadRequestException('Inavalid presentation id');
		}

		let respondData = {
			presentation_id: presentation._id,
			presentation_topic: presentation.presentation_topic,
			presentation_description: presentation.presentation_description,
			presentation_conductor: presentation.presentation_conductor.speaker_title + ' ' + presentation.presentation_conductor.speaker_first_name + ' ' + presentation.presentation_conductor.speaker_last_name,
			presentation_date_and_time: presentation.presentation_date_and_time
		};

		return {
			msg: 'presentation generated',
			data: respondData
		};

	} catch (err) {
		throw err;
	}
};


module.exports.getSinglePresentation = async (requestBody) => {

	// eslint-disable-next-line no-useless-catch
	try {
		let presentation = await ReserchPaperPresentation.findById(requestBody.presentation_id).populate('presentation_conductor', 'speaker_title speaker_first_name speaker_last_name');
		
		if (!presentation) {
			throw new BadRequestException('Inavalid presentation id');
		}
		
		let respondData = {
			presentation_id: presentation._id,
			presentation_topic: presentation.presentation_topic,
			presentation_description: presentation.presentation_description,
			presentation_conductor: presentation.presentation_conductor.speaker_title + ' ' + presentation.presentation_conductor.speaker_first_name + ' ' + presentation.presentation_conductor.speaker_last_name,
			presentation_date_and_time: presentation.presentation_date_and_time
		};

		return {
			msg: 'presentation generated',
			data: respondData
		};

	} catch (err) {
		throw err;
	}
};