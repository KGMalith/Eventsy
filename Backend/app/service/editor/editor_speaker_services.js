let mongoose = require('mongoose');
let Speaker = require('../../schema/speakers');
let TemporarySpeaker = require('../../schema/temporarySavedSpeaker');
let Notification = require('../../schema/notification');

const BadRequestException = require('../../util/exceptions/badRequestException');

module.exports.createSpeaker = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	// Start trasaction
	session.startTransaction();
	try {

		// //define object
		let speaker = {
			speaker_title: requestBody.speaker_title,
			speaker_first_name: requestBody.speaker_first_name,
			speaker_last_name: requestBody.speaker_last_name,
			speaker_affiliation: requestBody.speaker_affiliation,
			speaker_social_media: {
				twitter_link: requestBody.twitter_link,
				facebook_link: requestBody.facebook_link,
				linkedin_link: requestBody.linkedin_link,
			},
			isNewRequest: true,
			speaker_image: requestBody.image_link
		};

		//create temporary object
		let newTemporarySpeaker = new TemporarySpeaker(speaker);
		newTemporarySpeaker.$session(session);
		await newTemporarySpeaker.save();

		//notificaton
		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: 'New speaker added. Waiting for review'
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
			msg: 'Speaker created successfully, Approval request sent to admin'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;

	} finally {
		session.endSession();
	}
};

module.exports.editSpeaker = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {
		let SpeakerObj = await Speaker.findById(requestBody.speaker_id).session(session);

		//check are there any speaker exist by speaker id
		if (!SpeakerObj) {
			throw new BadRequestException('Inavalid speaker id');
		}

		let temporarySpeaker = {
			speaker_title: requestBody.speaker_title,
			speaker_first_name: requestBody.speaker_first_name,
			speaker_last_name: requestBody.speaker_last_name,
			speaker_affiliation: requestBody.speaker_affiliation,
			matching_speaker_id: SpeakerObj._id,
			speaker_image: requestBody.image_link ? requestBody.image_link : SpeakerObj.speaker_image,
			speaker_social_media: {
				twitter_link: requestBody.twitter_link,
				facebook_link: requestBody.facebook_link,
				linkedin_link: requestBody.linkedin_link,
			},
			isNewRequest: false
		};

		//create temporary object
		let newTemporarySpeaker = new TemporarySpeaker(temporarySpeaker);
		newTemporarySpeaker.$session(session);
		await newTemporarySpeaker.save();

		//notificaton
		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: 'Speaker details updated. Waiting for review'
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
			msg: 'Speaker update requested'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.editTemporarySpeaker = async (requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {
		let SpeakerObj = await TemporarySpeaker.findById(requestBody.speaker_id).session(session);

		//check are there any speaker exist by speaker id
		if (!SpeakerObj) {
			throw new BadRequestException('Inavalid speaker id');
		}

		//update temporary created speaker
		SpeakerObj.speaker_title = requestBody.speaker_title;
		SpeakerObj.speaker_first_name = requestBody.speaker_first_name;
		SpeakerObj.speaker_last_name = requestBody.speaker_last_name;
		SpeakerObj.speaker_affiliation = requestBody.speaker_affiliation;
		SpeakerObj.speaker_image = requestBody.image_link ? requestBody.image_link : SpeakerObj.speaker_image;
		SpeakerObj.speaker_social_media.twitter_link = requestBody.twitter_link;
		SpeakerObj.speaker_social_media.facebook_link = requestBody.facebook_link;
		SpeakerObj.speaker_social_media.linkedin_link = requestBody.linkedin_link;

		await SpeakerObj.save();

		await session.commitTransaction();
		return {
			msg: 'Speaker update requested'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.getAllSpeakers = async () => {

	// eslint-disable-next-line no-useless-catch
	try {
		let speakerList = await Speaker.find({});

		let spakers_array = [];
		for (let index = 0; index < speakerList.length; index++) {
			let data_set = {
				speaker_id: speakerList[index]._id,
				speaker_name: speakerList[index].speaker_title + ' ' + speakerList[index].speaker_first_name + ' ' + speakerList[index].speaker_last_name,
				speaker_affiliation: speakerList[index].speaker_affiliation,
				speaker_image: speakerList[index].speaker_image,
				speaker_social_media_links:{
					twitter_link: speakerList[index].twitter_link,
					facebook_link: speakerList[index].facebook_link,
					linkedin_link: speakerList[index].linkedin_link
				}
			};
			spakers_array.push(data_set);
		}

		return {
			msg: 'All speakers generated',
			data: spakers_array
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getAllTemporarySpeakers = async () => {

	// eslint-disable-next-line no-useless-catch
	try {
		let speakerList = await TemporarySpeaker.find({});

		let spakers_array = [];
		for (let index = 0; index < speakerList.length; index++) {
			let data_set = {
				speaker_id: speakerList[index]._id,
				speaker_name: speakerList[index].speaker_title + ' ' + speakerList[index].speaker_first_name + ' ' + speakerList[index].speaker_last_name,
				speaker_affiliation: speakerList[index].speaker_affiliation,
				speaker_image: speakerList[index].speaker_image,
				speaker_social_media_links: {
					twitter_link: speakerList[index].twitter_link,
					facebook_link: speakerList[index].facebook_link,
					linkedin_link: speakerList[index].linkedin_link
				}
			};
			spakers_array.push(data_set);
		}

		return {
			msg: 'All speakers generated',
			data: spakers_array
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getSingleTemporarySpeaker = async (requestBody) => {

	// eslint-disable-next-line no-useless-catch
	try {
		let speaker = await TemporarySpeaker.findById(requestBody.speaker_id);
		
		if (!speaker) {
			throw new BadRequestException('Inavalid speaker id');
		}

		let data_set = {
			speaker_id: speaker._id,
			speaker_name: speaker.speaker_title + ' ' + speaker.speaker_first_name + ' ' + speaker.speaker_last_name,
			speaker_affiliation: speaker.speaker_affiliation,
			speaker_image: speaker.speaker_image,
			speaker_social_media_links: {
				twitter_link: speaker.twitter_link,
				facebook_link: speaker.facebook_link,
				linkedin_link: speaker.linkedin_link
			}
		};

		return {
			msg: 'speaker generated',
			data: data_set
		};

	} catch (err) {
		throw err;
	}
};


module.exports.getSingleSpeaker = async (requestBody) => {

	// eslint-disable-next-line no-useless-catch
	try {
		let speaker = await Speaker.findById(requestBody.speaker_id);
		
		if (!speaker) {
			throw new BadRequestException('Inavalid speaker id');
		}

		let data_set = {
			speaker_id: speaker._id,
			speaker_name: speaker.speaker_title + ' ' + speaker.speaker_first_name + ' ' + speaker.speaker_last_name,
			speaker_affiliation: speaker.speaker_affiliation,
			speaker_image: speaker.speaker_image,
			speaker_social_media_links: {
				twitter_link: speaker.twitter_link,
				facebook_link: speaker.facebook_link,
				linkedin_link: speaker.linkedin_link
			}
		};

		return {
			msg: 'speaker generated',
			data: data_set
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getAllSpeakersList = async () => {

	// eslint-disable-next-line no-useless-catch
	try {
		let speaker_data = [];
		let speakerList = await Speaker.find({}, '_id speaker_title speaker_first_name speaker_last_name');

		if (speakerList.length > 0) {
			for (let index = 0; index < speakerList.length; index++) {
				let data = {
					value: speakerList[index]._id,
					label: `${speakerList[index].speaker_title} ${speakerList[index].speaker_first_name} ${speakerList[index].speaker_last_name}`
				};
				speaker_data.push(data);
			}
		}

		return {
			msg: 'All speakers generated',
			data: speaker_data
		};

	} catch (err) {
		throw err;
	}
};