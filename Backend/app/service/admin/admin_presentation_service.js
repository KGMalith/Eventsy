let mongoose = require('mongoose');
let ReserchPaperPresentation = require('../../schema/reserchPaperPresentation');
let TemporaryReserchPaperPresentation = require('../../schema/temporarySavedResearchPaperPresentation');
let Notification = require('../../schema/notification');

const BadRequestException = require('./../../util/exceptions/badRequestException');

module.exports.getAllRequestedPresentations = async () => {
	// eslint-disable-next-line no-useless-catch
	try {

		let presentation_array_list = [];

		let PresentationList = await TemporaryReserchPaperPresentation.find({}).populate('presentation_conductor', 'speaker_title speaker_first_name speaker_last_name');

		for (let index = 0; index < PresentationList.length; index++) {

			let return_data = {
				presentation_id: PresentationList[index]._id,
				presentation_topic: PresentationList[index].presentation_topic,
				presentation_description: PresentationList[index].presentation_description,
				presentation_conductor: PresentationList[index].presentation_conductor.speaker_title + ' ' + PresentationList[index].presentation_conductor.speaker_first_name + ' ' + PresentationList[index].presentation_conductor.speaker_last_name,
				presentation_date_and_time: PresentationList[index].presentation_date_and_time
			};

			presentation_array_list.push(return_data);
		}

		return {
			msg: 'Generated all presentations',
			data: presentation_array_list
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getRequestedPresentation = async (requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {

		let presentationObj = await TemporaryReserchPaperPresentation.findById(requestBody.presentation_id).populate('presentation_conductor', 'speaker_title speaker_first_name speaker_last_name');

		if (!presentationObj) {
			throw new BadRequestException('Invalid presentation id');
		}

		let data = {
			presentation_id: presentationObj._id,
			presentation_topic: presentationObj.presentation_topic,
			presentation_description: presentationObj.presentation_description,
			presentation_conductor: presentationObj.presentation_conductor.speaker_title + ' ' + presentationObj.presentation_conductor.speaker_first_name + ' ' + presentationObj.presentation_conductor.speaker_last_name,
			presentation_date_and_time: presentationObj.presentation_date_and_time,
		};

		return {
			msg: 'Requested presentation generated',
			data: data
		};

	} catch (err) {
		throw err;
	}
};


module.exports.approveRequestedPresentation = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {
		let tempPresentation = await TemporaryReserchPaperPresentation.findById(requestBody.presentation_id).session(session);

		if (!tempPresentation) {
			throw new BadRequestException('Invalid presentation id');
		}

		let presentation_topic = tempPresentation.presentation_topic;

		if (tempPresentation.isNewRequest === true) {
			//create presentation Object
			let Obj = {
				presentation_topic: tempPresentation.presentation_topic,
				presentation_description: tempPresentation.presentation_description,
				presentation_conductor: tempPresentation.presentation_conductor,
				presentation_date_and_time: tempPresentation.presentation_date_and_time,
				changes_approved_by_admin: true
			};

			let newPresentation = new ReserchPaperPresentation(Obj);
			newPresentation.$session(session);
			await newPresentation.save();

		} else {
			let presentationObj = await ReserchPaperPresentation.findById(tempPresentation.matching_presentation_id).session(session);

			if (!presentationObj) {
				throw new BadRequestException('Invalid matching presentation id');
			}

			//update presentation Object
			presentationObj.presentation_topic = tempPresentation.presentation_topic;
			presentationObj.presentation_description = tempPresentation.presentation_description;
			presentationObj.presentation_conductor = tempPresentation.presentation_conductor;
			presentationObj.presentation_date_and_time = tempPresentation.presentation_date_and_time;
			presentationObj.changes_approved_by_admin = true;

			presentationObj.$session(session);
			await presentationObj.save();
		}

		//delete temporary presentation object
		await tempPresentation.remove();

		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: `Requested presentation "${presentation_topic}" approved`
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
			msg: `Requested presentation "${presentation_topic}" approved`
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}

};

module.exports.rejectRequestedPresentation = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {
		let presentationObj = await TemporaryReserchPaperPresentation.findById(requestBody.presentation_id).session(session);

		if (!presentationObj) {
			throw new BadRequestException('Invalid presentation id');
		}

		let presentation_topic = presentationObj.presentation_topic;

		//delete temporary presentation object
		await presentationObj.remove();

		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: `Requested presentation "${presentation_topic}" rejected`
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
			msg: `Requested presentation "${presentation_topic}" rejected`
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};


