let mongoose = require('mongoose');
let Workshop = require('../../schema/workshop');
let TemporaryWorkshop = require('../../schema/temporarySavedWorkshop');
let Notification = require('../../schema/notification');
let Speaker = require('../../schema/speakers');
let User = require('../../schema/user');

const BadRequestException = require('./../../util/exceptions/badRequestException');
const UnauthorizedException = require('./../../util/exceptions/unautherizedException');

module.exports.getEventPendingWorkshopProposals = async () => {
	// eslint-disable-next-line no-useless-catch
	try {

		let UserList = await User.find({ role: 2, is_signup_completed: true, is_email_verified: true, 'event_details.media_file_details.media_file_status': 1, 'event_details.is_event_created': false });

		let user_list_array = [];

		for (let index = 0; index < UserList.length; index++) {

			let return_data = {
				workshop_conductor_id: UserList[index]._id,
				workshop_conductor_email_address: UserList[index].email,
				workshop_conductor_name: UserList[index].name_title + ' ' + UserList[index].first_name + ' ' + UserList[index].last_name,
				workshop_conductor_mobile_number: UserList[index].mobile_number
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

module.exports.getEventPendingWorkshopProposal = async (requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {

		let userObj = await User.findById(requestBody.user_id);

		if (!userObj) {
			throw new BadRequestException('Invalid user id');
		}

		let return_data = {
			workshop_conductor_id: userObj._id,
			workshop_conductor_email_address: userObj.email,
			workshop_conductor_name: userObj.name_title + ' ' + userObj.first_name + ' ' + userObj.last_name,
			workshop_conductor_mobile_number: userObj.mobile_number,
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


module.exports.createWorkShop = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();
	try {
		let validIdArray = [];

		//generating all speakers id list
		let allSpeakersIdList = await Speaker.find({}, '_id').session(session);

		if (!allSpeakersIdList) {
			throw new UnauthorizedException();
		}

		//generating user object
		let UserObject = await User.findById(requestBody.user_id).session(session);

		if (!UserObject) {
			throw new BadRequestException('Invalid user id');
		}

		//check event is created for request user
		if (UserObject.event_details.is_event_created) {
			throw new BadRequestException('Event already created for this researcher');
		}

		//check send ids are available
		for (let index = 0; index < allSpeakersIdList.length; index++) {
			for (let idx = 0; idx < (requestBody.speakers_id_list).length; idx++) {
				if (allSpeakersIdList[index]._id == (requestBody.speakers_id_list)[idx]) {
					validIdArray.push(requestBody.speakers_id_list[idx]);
				}
			}
		}

		if ((validIdArray.length) !== ((requestBody.speakers_id_list).length)) {
			throw new BadRequestException('Invalid speaker Ids exists');
		}

		let workshopObj = {
			workshop_name: requestBody.workshop_name,
			workshop_description: requestBody.workshop_description,
			workshop_speakers: requestBody.speakers_id_list,
			workshop_date_and_time: requestBody.workshop_date_and_time,
			requested_user: requestBody.workshop_conductor_id,
			isNewRequest: true
		};

		//create temporary object
		let newTemporaryworkshop = new TemporaryWorkshop(workshopObj);
		newTemporaryworkshop.$session(session);
		await newTemporaryworkshop.save();

		//save user object
		UserObject.event_details.is_event_created = true;
		UserObject.$session(session);
		await UserObject.save();

		//notificaton
		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: 'New workshop added. Waiting for review'
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
			msg: 'Workshop created. request sent to admin'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.editWorkShop = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();
	try {

		//check workshop exists
		let workshop_object = await Workshop.findById(requestBody.workshop_id).session(session);

		if (!workshop_object) {
			throw new BadRequestException('Invalid workshop id');
		}

		let validIdArray = [];

		//generating all speakers id list
		let allSpeakersIdList = await Speaker.find({}, '_id').session(session);

		if (!allSpeakersIdList) {
			throw new UnauthorizedException();
		}

		//check send ids are available
		for (let index = 0; index < allSpeakersIdList.length; index++) {
			for (let idx = 0; idx < (requestBody.speakers_id_list).length; idx++) {
				if ((requestBody.speakers_id_list)[idx] == allSpeakersIdList[index]._id) {
					validIdArray.push(requestBody.speakers_id_list[idx]);
				}
			}
		}

		if (validIdArray.length != (requestBody.speakers_id_list).length) {
			throw new BadRequestException('Invalid speaker Ids exists');
		}

		let workshopObj = {
			workshop_name: requestBody.workshop_name,
			workshop_description: requestBody.workshop_description,
			workshop_speakers: requestBody.speakers_id_list,
			workshop_date_and_time: requestBody.workshop_date_and_time,
			requested_user: workshop_object.requested_user,
			matching_workshop_id: requestBody.workshop_id
		};

		//create temporary object
		let newTemporaryworkshop = new TemporaryWorkshop(workshopObj);
		newTemporaryworkshop.$session(session);
		await newTemporaryworkshop.save();

		//notificaton
		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: 'Workshop data edited. Waiting for review'
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
			msg: 'Workshop edited. request sent to admin'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.editTempWorkShop = async (requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();
	try {

		//check workshop exists
		let WorkshopObj = await TemporaryWorkshop.findById(requestBody.workshop_id).session(session);

		if (!WorkshopObj) {
			throw new BadRequestException('Invalid workshop id');
		}

		let validIdArray = [];

		//generating all speakers id list
		let allSpeakersIdList = await Speaker.find({}, '_id').session(session);

		if (!allSpeakersIdList) {
			throw new UnauthorizedException();
		}

		//check send ids are available
		for (let index = 0; index < allSpeakersIdList.length; index++) {
			for (let idx = 0; idx < (requestBody.speakers_id_list).length; idx++) {
				if ((requestBody.speakers_id_list)[idx] == allSpeakersIdList[index]._id) {
					validIdArray.push(requestBody.speakers_id_list[idx]);
				}
			}
		}

		if (validIdArray.length != (requestBody.speakers_id_list).length) {
			throw new BadRequestException('Invalid speaker Ids exists');
		}

		WorkshopObj.workshop_name = requestBody.workshop_name;
		WorkshopObj.workshop_description = requestBody.workshop_description;
		WorkshopObj.workshop_speakers = requestBody.speakers_id_list;
		WorkshopObj.workshop_date_and_time = requestBody.workshop_date_and_time;

		WorkshopObj.$session(session);
		await WorkshopObj.save();

		await session.commitTransaction();

		return {
			msg: 'Workshop edited. request sent to admin'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};


module.exports.getAllWorkshops = async () => {

	// eslint-disable-next-line no-useless-catch
	try {
		let workshopList = await Workshop.find({}).populate('workshop_speakers', '_id speaker_title speaker_first_name speaker_last_name');

		let respondArray = [];

		for (let index = 0; index < workshopList.length; index++) {
			let name_list = [];
			for (let idx = 0; idx < (workshopList[index].workshop_speakers).length; idx++) {
				let speaker_name = `${(workshopList[index].workshop_speakers)[idx].speaker_title} ${(workshopList[index].workshop_speakers)[idx].speaker_first_name} ${(workshopList[index].workshop_speakers)[idx].speaker_last_name}`;
				name_list.push(speaker_name);
			}

			let data = {
				workshop_id: workshopList[index]._id,
				workshop_name: workshopList[index].workshop_name,
				workshop_description: workshopList[index].workshop_description,
				workshop_speakers: name_list,
				workshop_date_and_time: workshopList[index].workshop_date_and_time,
			};
			respondArray.push(data);
		}

		return {
			msg: 'All workshops generated',
			data: respondArray
		};

	} catch (err) {
		throw err;
	}
};


module.exports.getAllTempWorkshops = async () => {

	// eslint-disable-next-line no-useless-catch
	try {
		let workshopList = await TemporaryWorkshop.find({}).populate('workshop_speakers', '_id speaker_title speaker_first_name speaker_last_name');

		let respondArray = [];

		for (let index = 0; index < workshopList.length; index++) {
			let name_list = [];
			for (let idx = 0; idx < (workshopList[index].workshop_speakers).length; idx++) {
				let speaker_name = `${(workshopList[index].workshop_speakers)[idx].speaker_title} ${(workshopList[index].workshop_speakers)[idx].speaker_first_name} ${(workshopList[index].workshop_speakers)[idx].speaker_last_name}`;
				name_list.push(speaker_name);
			}

			let data = {
				workshop_id: workshopList[index]._id,
				workshop_name: workshopList[index].workshop_name,
				workshop_description: workshopList[index].workshop_description,
				workshop_speakers: name_list,
				workshop_date_and_time: workshopList[index].workshop_date_and_time,
			};
			respondArray.push(data);
		}

		return {
			msg: 'All workshops generated',
			data: respondArray
		};

	} catch (err) {
		throw err;
	}
};


module.exports.getTempWorkshop = async (requestBody) => {

	// eslint-disable-next-line no-useless-catch
	try {
		let speakersArray = [];

		let workshop = await TemporaryWorkshop.findById(requestBody.workshop_id).populate('workshop_speakers', '_id speaker_title speaker_first_name speaker_last_name');

		if (!workshop) {
			throw new BadRequestException('Inavalid workshop id');
		}

		for (let idx = 0; idx < (workshop.workshop_speakers).length; idx++) {
			let data = {
				label: `${(workshop.workshop_speakers)[idx].speaker_title} ${(workshop.workshop_speakers)[idx].speaker_first_name} ${(workshop.workshop_speakers)[idx].speaker_last_name}`,
				value: (workshop.workshop_speakers)[idx]._id
			};
			speakersArray.push(data);
		}

		let respondObj = {
			workshop_id: workshop._id,
			workshop_name: workshop.workshop_name,
			workshop_description: workshop.workshop_description,
			workshop_speakers: speakersArray,
			workshop_date_and_time: workshop.workshop_date_and_time,
		};

		return {
			msg: 'workshop generated',
			data: respondObj
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getWorkshop = async (requestBody) => {

	// eslint-disable-next-line no-useless-catch
	try {
		let speakersArray = [];

		let workshop = await Workshop.findById(requestBody.workshop_id).populate('workshop_speakers', '_id speaker_title speaker_first_name speaker_last_name');
		if (!workshop) {
			throw new BadRequestException('Inavalid workshop id');
		}

		for (let idx = 0; idx < (workshop.workshop_speakers).length; idx++) {
			let data = {
				label: `${(workshop.workshop_speakers)[idx].speaker_title} ${(workshop.workshop_speakers)[idx].speaker_first_name} ${(workshop.workshop_speakers)[idx].speaker_last_name}`,
				value: (workshop.workshop_speakers)[idx]._id
			};
			speakersArray.push(data);
		}

		let respondObj = {
			workshop_id: workshop._id,
			workshop_name: workshop.workshop_name,
			workshop_description: workshop.workshop_description,
			workshop_speakers: speakersArray,
			workshop_date_and_time: workshop.workshop_date_and_time,
		};

		return {
			msg: 'workshop generated',
			data: respondObj
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getWorkshopsList = async () => {
	// eslint-disable-next-line no-useless-catch
	try {
		let workshop_data = [];

		let workshopList = await Workshop.find({}, '_id workshop_name');

		if (workshopList.length > 0) {
			for (let index = 0; index < workshopList.length; index++) {
				let data = {
					value: workshopList[index]._id,
					label: workshopList[index].workshop_name
				};
				workshop_data.push(data);
			}
		}

		return {
			msg: 'All workshops generated',
			data: workshop_data
		};

	} catch (err) {
		throw err;
	}
};