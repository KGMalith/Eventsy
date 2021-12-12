let mongoose = require('mongoose');
let Speaker = require('../../schema/speakers');
let TemporarySpeaker = require('../../schema/temporarySavedSpeaker');
let Notification = require('../../schema/notification');

const BadRequestException = require('./../../util/exceptions/badRequestException');

module.exports.getAllRequestedSpeakers = async () => {
	// eslint-disable-next-line no-useless-catch
	try {

		let speakers_array_list = [];

		let SpeakersList = await TemporarySpeaker.find({}, '_id speaker_title speaker_first_name speaker_last_name speaker_affiliation speaker_image speaker_social_media');

		for (let index = 0; index < SpeakersList.length; index++) {

			let return_data = {
				speaker_id: SpeakersList[index]._id,
				speaker_name: SpeakersList[index].speaker_title + ' ' + SpeakersList[index].speaker_first_name + ' ' + SpeakersList[index].speaker_last_name,
				speaker_affiliation: SpeakersList[index].speaker_affiliation,
				speaker_image: SpeakersList[index].speaker_image,
				speaker_social_media: SpeakersList[index].speaker_social_media
			};

			speakers_array_list.push(return_data);
		}

		return {
			msg: 'Generated all speakers',
			data: speakers_array_list
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getRequestedSpeaker = async (requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {

		let speaker = await TemporarySpeaker.findById(requestBody.speaker_id);

		if (!speaker) {
			throw new BadRequestException('Invalid spaker id');
		}

		let data = {
			speaker_id: speaker._id,
			speaker_name: speaker.speaker_title + ' ' + speaker.speaker_first_name + ' ' + speaker.speaker_last_name,
			speaker_affiliation: speaker.speaker_affiliation,
			speaker_image: speaker.speaker_image,
			speaker_social_media_links:{
				twitter_link: speaker.speaker_social_media.twitter_link,
				facebook_link: speaker.speaker_social_media.facebook_link,
				linkedin_link: speaker.speaker_social_media.linkedin_link
			}
		};

		return {
			msg: 'Requested speaker generated',
			data: data
		};

	} catch (err) {
		throw err;
	}
};

module.exports.approveRequestedSpeaker = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {
		let tempSpeaker = await TemporarySpeaker.findById(requestBody.speaker_id).session(session);

		if (!tempSpeaker) {
			throw new BadRequestException('Invalid speaker id');
		}

		let speaker_name = tempSpeaker.speaker_title + ' ' + tempSpeaker.speaker_first_name+' '+tempSpeaker.speaker_last_name;

		if (tempSpeaker.isNewRequest === true) {
			//create speaker Object
			let Obj = {
				speaker_title: tempSpeaker.speaker_title,
				speaker_first_name: tempSpeaker.speaker_first_name,
				speaker_last_name: tempSpeaker.speaker_last_name,
				speaker_affiliation: tempSpeaker.speaker_affiliation,
				speaker_image: tempSpeaker.speaker_image,
				speaker_social_media: {
					twitter_link: tempSpeaker.speaker_social_media.twitter_link,
					facebook_link: tempSpeaker.speaker_social_media.facebook_link,
					linkedin_link: tempSpeaker.speaker_social_media.linkedin_link
				},
				changes_approved_by_admin: true
			};

			let newSpeaker = new Speaker(Obj);
			newSpeaker.$session(session);
			await newSpeaker.save();

		} else {
			let speakerObj = await Speaker.findById(tempSpeaker.matching_speaker_id).session(session);

			if (!speakerObj) {
				throw new BadRequestException('Invalid matching speaker id');
			}

			//update speaker Object
			speakerObj.speaker_title = tempSpeaker.speaker_title;
			speakerObj.speaker_first_name = tempSpeaker.speaker_first_name;
			speakerObj.speaker_last_name = tempSpeaker.speaker_last_name;
			speakerObj.speaker_affiliation = tempSpeaker.speaker_affiliation;
			speakerObj.speaker_image = tempSpeaker.speaker_image;
			speakerObj.speaker_social_media.twitter_link = tempSpeaker.speaker_social_media.twitter_link;
			speakerObj.speaker_social_media.facebook_link = tempSpeaker.speaker_social_media.facebook_link;
			speakerObj.speaker_social_media.linkedin_link = tempSpeaker.speaker_social_media.linkedin_link;
			speakerObj.changes_approved_by_admin = true;

			speakerObj.$session(session);
			await speakerObj.save();
		}

		//delete temporary speaker object
		await tempSpeaker.remove();

		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: `Requested speaker "${speaker_name}" approved`
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
			msg: `Requested speaker "${speaker_name}" approved`
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}

};

module.exports.rejectRequestedSpeaker = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {
		let speakerObj = await TemporarySpeaker.findById(requestBody.speaker_id).session(session);

		if (!speakerObj) {
			throw new BadRequestException('Invalid speaker id');
		}

		let speaker_name = speakerObj.speaker_title + ' ' + speakerObj.speaker_title + ' ' + speakerObj.speaker_title;

		//delete temporary speaker object
		await speakerObj.remove();

		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: `Requested speaker "${speaker_name}" rejected`
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
			msg: `Requested speaker "${speaker_name}" rejected`
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

