let mongoose = require('mongoose');
let Workshop = require('../../schema/workshop');
let TemporaryWorkshop = require('../../schema/temporarySavedWorkshop');
let Notification = require('../../schema/notification');

const BadRequestException = require('./../../util/exceptions/badRequestException');

module.exports.getAllRequestedWorkshops = async () => {
	// eslint-disable-next-line no-useless-catch
	try {

		let workshops_array_list = [];

		let WorkshopList = await TemporaryWorkshop.find({}).populate('workshop_speakers', 'speaker_title speaker_first_name speaker_last_name');

		for (let index = 0; index < WorkshopList.length; index++) {

			let speakers_array = [];

			for (let i = 0; i < (WorkshopList[index].workshop_speakers).length; i++) {
				let speaker_name = (WorkshopList[index].workshop_speakers)[i].speaker_title + ' ' + (WorkshopList[index].workshop_speakers)[i].speaker_first_name + ' ' + (WorkshopList[index].workshop_speakers)[i].speaker_last_name;
				speakers_array.push(speaker_name);
			}

			let return_data = {
				workshop_id: WorkshopList[index]._id,
				workshop_name: WorkshopList[index].workshop_name,
				workshop_description: WorkshopList[index].workshop_description,
				workshop_speakers: speakers_array,
				workshop_date_and_time: WorkshopList[index].workshop_date_and_time
			};

			workshops_array_list.push(return_data);
		}

		return {
			msg: 'Generated all workshops',
			data: workshops_array_list
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getRequestedWorkshop = async (requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {

		let workshop = await TemporaryWorkshop.findById(requestBody.workshop_id).populate('workshop_speakers', 'speaker_title speaker_first_name speaker_last_name');

		if (!workshop) {
			throw new BadRequestException('Invalid workshop id');
		}

		let speakers_array = [];

		for (let i = 0; i < (workshop.workshop_speakers).length; i++) {
			let speaker_name = (workshop.workshop_speakers)[i].speaker_title + ' ' + (workshop.workshop_speakers)[i].speaker_first_name + ' ' + (workshop.workshop_speakers)[i].speaker_last_name;
			speakers_array.push(speaker_name);
		}

		let data = {
			workshop_id: workshop._id,
			workshop_name: workshop.workshop_name,
			workshop_description: workshop.workshop_description,
			workshop_speakers: speakers_array ,
			workshop_date_and_time: workshop.workshop_date_and_time,
		};

		return {
			msg: 'Requested workshop generated',
			data: data
		};

	} catch (err) {
		throw err;
	}
};

module.exports.approveRequestedWorkshop = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {
		let tempWorkshop = await TemporaryWorkshop.findById(requestBody.workshop_id).session(session);

		if (!tempWorkshop) {
			throw new BadRequestException('Invalid workshop id');
		}

		let workshop_name = tempWorkshop.workshop_name;

		if (tempWorkshop.isNewRequest === true) {
			//create workshop Object
			let Obj = {
				workshop_name: tempWorkshop.workshop_name,
				workshop_description: tempWorkshop.workshop_description,
				workshop_speakers: tempWorkshop.workshop_speakers,
				workshop_date_and_time: tempWorkshop.workshop_date_and_time,
				requested_user: tempWorkshop.requested_user,
				changes_approved_by_admin: true
			};

			let newWorkshop = new Workshop(Obj);
			newWorkshop.$session(session);
			await newWorkshop.save();

		} else {
			let workshopObj = await Workshop.findById(tempWorkshop.matching_workshop_id).session(session);

			if (!workshopObj) {
				throw new BadRequestException('Invalid matching speaker id');
			}

			//update workshop Object
			workshopObj.workshop_name = tempWorkshop.workshop_name;
			workshopObj.workshop_description = tempWorkshop.workshop_description;
			workshopObj.workshop_speakers = tempWorkshop.workshop_speakers;
			workshopObj.workshop_date_and_time = tempWorkshop.workshop_date_and_time;
			workshopObj.requested_user = tempWorkshop.requested_user;
			workshopObj.changes_approved_by_admin = true;

			workshopObj.$session(session);
			await workshopObj.save();
		}

		//delete temporary workshop object
		await tempWorkshop.remove();

		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: `Requested workshop "${workshop_name}" approved`
		};
		notificationArray.push(notify);

		//check are there any exisiting notification object
		let notificationObj = await Notification.findOne({ user_role: 4 }).session(session);

		if (notificationObj) {
			notificationObj.notification.push(notify);
			notificationObj.$session(session);
			notificationObj.save();
		} else {
			//create notification
			let notification = {
				user_role: 4,
				notification: notificationArray
			};
			let newNotification = new Notification(notification);
			newNotification.$session(session);
			await newNotification.save();
		}

		await session.commitTransaction();

		return {
			msg: `Requested workshop "${workshop_name}" approved`
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}

};

module.exports.rejectRequestedWorkshop = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {
		let workshopObj = await TemporaryWorkshop.findById(requestBody.workshop_id).session(session);

		if (!workshopObj) {
			throw new BadRequestException('Invalid workshop id');
		}

		let workshop_name = workshopObj.workshop_name;

		//delete temporary workshop object
		await workshopObj.remove();

		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: `Requested workshop "${workshop_name}" rejected`
		};
		notificationArray.push(notify);

		//check are there any exisiting notification object
		let notificationObj = await Notification.findOne({ user_role: 4 }).session(session);

		if (notificationObj) {
			notificationObj.notification.push(notify);
			notificationObj.$session(session);
			notificationObj.save();
		} else {
			//create notification
			let notification = {
				user_role: 4,
				notification: notificationArray
			};
			let newNotification = new Notification(notification);
			newNotification.$session(session);
			await newNotification.save();
		}

		await session.commitTransaction();

		return {
			msg: `Requested workshop "${workshop_name}" rejected`
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};
