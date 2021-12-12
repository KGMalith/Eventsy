let mongoose = require('mongoose');
let Conference = require('../../schema/conference');
let TemporarySavedConference = require('../../schema/temporarySavedConference');
let Notification = require('../../schema/notification');
let Workshop = require('../../schema/workshop');
let ReserchPaperPresentation = require('../../schema/reserchPaperPresentation');
let Speaker = require('../../schema/speakers');

const BadRequestException = require('./../../util/exceptions/badRequestException');
const UnauthorizedException = require('./../../util/exceptions/unautherizedException');


module.exports.createConference = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {
		let conference_location_images = [];
		let conference_images = [];
		let validSpeakerIdArray = [];
		let validWorkshopIdArray = [];
		let validPresentationIdArray = [];

		//convert conference name to lower case
		let conferenceName = (requestBody.conference_name).toLowerCase();
		
		// check conference is already exists
		let conferenceList = await Conference.find({}).session(session);

		if ((conferenceList.length) > 0) {
			throw new BadRequestException('Conference already exists. Cannot add new conference');
		}

		// check conference is already exists in temporary created list
		let isConferenceNameDuplicatedTemp = await TemporarySavedConference.findOne({
			conference_name: conferenceName
		}).session(session);

		if (isConferenceNameDuplicatedTemp) {
			throw new BadRequestException('Same Conference name already requested to create.Please check in requested conferences section');
		}

		//check conference location images uploaded successfully
		if ((requestBody.conference_location_images_array).length > 0) {
			if ((requestBody.conference_location_images_array).length > 10) {
				throw new BadRequestException('Maximum accepted file count is 10');
			}
			conference_location_images = requestBody.conference_location_images_array;
		}

		//check conference images uploaded successfully
		if ((requestBody.conference_images_array).length > 0) {
			if ((requestBody.conference_images_array).length > 10) {
				throw new BadRequestException('Maximum accepted file count is 10');
			}
			conference_images = requestBody.conference_images_array;
		}

		//generating all speakers id list
		let allSpeakersIdList = await Speaker.find({}, '_id').session(session);

		if (!allSpeakersIdList) {
			throw new UnauthorizedException();
		}

		//check send ids are available
		for (let index = 0; index < allSpeakersIdList.length; index++) {
			for (let idx = 0; idx < (requestBody.key_note_speakers).length; idx++) {
				if (allSpeakersIdList[index]._id == (requestBody.key_note_speakers)[idx]) {
					validSpeakerIdArray.push(requestBody.key_note_speakers[idx]);
				}
			}
		}

		if ((validSpeakerIdArray.length) !== ((requestBody.key_note_speakers).length)) {
			throw new BadRequestException('Invalid speaker Ids exists');
		}

		//generating all workshop id list
		let allWorkshopsIdList = await Workshop.find({}, '_id').session(session);

		if (!allWorkshopsIdList) {
			throw new UnauthorizedException();
		}

		//check send ids are available
		for (let index = 0; index < allWorkshopsIdList.length; index++) {
			for (let idx = 0; idx < (requestBody.conference_workshops).length; idx++) {
				if (allWorkshopsIdList[index]._id == (requestBody.conference_workshops)[idx]) {
					validWorkshopIdArray.push(requestBody.conference_workshops[idx]);
				}
			}
		}

		if ((validWorkshopIdArray.length) !== ((requestBody.conference_workshops).length)) {
			throw new BadRequestException('Invalid workshop Ids exists');
		}

		//generating all presentation id list
		let allPresentationIdList = await ReserchPaperPresentation.find({}, '_id').session(session);

		if (!allPresentationIdList) {
			throw new UnauthorizedException();
		}

		//check send ids are available
		for (let index = 0; index < allPresentationIdList.length; index++) {
			for (let idx = 0; idx < (requestBody.conference_reserch_paper_presentations).length; idx++) {
				if (allPresentationIdList[index]._id == (requestBody.conference_reserch_paper_presentations)[idx]) {
					validPresentationIdArray.push(requestBody.conference_reserch_paper_presentations[idx]);
				}
			}
		}

		if ((validPresentationIdArray.length) !== ((requestBody.conference_reserch_paper_presentations).length)) {
			throw new BadRequestException('Invalid presentation Ids exists');
		}

		//create temporary conference object
		let conference = {
			conference_name: conferenceName,
			conference_sub_topic: requestBody.conference_sub_topic,
			conference_type: requestBody.conference_type,
			conference_location: {
				location_name: requestBody.conference_location_name,
				location_desc: requestBody.conference_location_desc,
				location_google_map_link: requestBody.conference_location_google_map_link,
				location_images: conference_location_images
			},
			conference_days: {
				start_date: requestBody.conference_start_date,
				end_date: requestBody.conference_end_date
			},
			conference_organizer: requestBody.conference_organizer,
			conference_about: requestBody.conference_about,
			conference_images: conference_images,
			registration_fees: {
				attendee_registration_fee: requestBody.attendee_registration_fee,
				researcher_registration_fee: requestBody.researcher_registration_fee,
				workshop_conductor_registration_fee: requestBody.workshop_conductor_fee
			},
			contact_details: {
				address: requestBody.contact_address,
				phone_number: requestBody.contact_number,
				email: requestBody.contact_email
			},
			key_note_speakers: requestBody.key_note_speakers,
			conference_workshops: requestBody.conference_workshops,
			conference_reserch_paper_presentations: requestBody.conference_reserch_paper_presentations,
			isNewRequest: true,
		};

		//create object using schema and save to database
		let temporaryConferenceObj = new TemporarySavedConference(conference);
		temporaryConferenceObj.$session(session);
		await temporaryConferenceObj.save();

		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: 'New conference created. Waiting for review'
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
			msg: 'Conference created successfully, Approval request sent to admin'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.editConference = async (requestUser, requestBody) => {

	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {

		let conference_location_images = [];
		let conference_images = [];
		let validSpeakerIdArray = [];
		let validWorkshopIdArray = [];
		let validPresentationIdArray = [];

		//convert conference name to lower case
		let conferenceName = (requestBody.conference_name).toLowerCase();

		//check are there existing conference
		let conferenceObj = await Conference.findById(requestBody.conference_id).session(session);

		if (!conferenceObj) {
			throw new BadRequestException('Invalid conference id');
		}

		//assign default images to array
		conference_location_images = conferenceObj.conference_location.location_images;
		conference_images = conferenceObj.conference_images;

		//check conference location images uploaded successfully
		if ((requestBody.conference_location_images_array).length > 0) {
			if ((requestBody.conference_location_images_array).length > 10) {
				throw new BadRequestException('Maximum accepted file count is 10');
			}
			conference_location_images = requestBody.conference_location_images_array;
		}

		//check conference images uploaded successfully
		if ((requestBody.conference_images_array).length > 0) {
			if ((requestBody.conference_images_array).length > 10) {
				throw new BadRequestException('Maximum accepted file count is 10');
			}
			conference_images = requestBody.conference_images_array;
		}

		//generating all speakers id list
		let allSpeakersIdList = await Speaker.find({}, '_id').session(session);

		if (!allSpeakersIdList) {
			throw new UnauthorizedException();
		}

		//check send ids are available
		for (let index = 0; index < allSpeakersIdList.length; index++) {
			for (let idx = 0; idx < (requestBody.key_note_speakers).length; idx++) {
				if (allSpeakersIdList[index]._id == (requestBody.key_note_speakers)[idx]) {
					validSpeakerIdArray.push(requestBody.key_note_speakers[idx]);
				}
			}
		}

		if ((validSpeakerIdArray.length) !== ((requestBody.key_note_speakers).length)) {
			throw new BadRequestException('Invalid speaker Ids exists');
		}


		//generating all workshop id list
		let allWorkshopIdList = await Workshop.find({}, '_id').session(session);

		if (!allWorkshopIdList) {
			throw new UnauthorizedException();
		}

		//check send ids are available
		for (let index = 0; index < allWorkshopIdList.length; index++) {
			for (let idx = 0; idx < (requestBody.conference_workshops).length; idx++) {
				if (allWorkshopIdList[index]._id == (requestBody.conference_workshops)[idx]) {
					validWorkshopIdArray.push(requestBody.conference_workshops[idx]);
				}
			}
		}

		if ((validWorkshopIdArray.length) !== ((requestBody.conference_workshops).length)) {
			throw new BadRequestException('Invalid workshop Ids exists');
		}

		//generating all presentation id list
		let allPresentationIdList = await ReserchPaperPresentation.find({}, '_id').session(session);

		if (!allPresentationIdList) {
			throw new UnauthorizedException();
		}

		//check send ids are available
		for (let index = 0; index < allPresentationIdList.length; index++) {
			for (let idx = 0; idx < (requestBody.conference_reserch_paper_presentations).length; idx++) {
				if (allPresentationIdList[index]._id == (requestBody.conference_reserch_paper_presentations)[idx]) {
					validPresentationIdArray.push(requestBody.conference_reserch_paper_presentations[idx]);
				}
			}
		}

		if ((validPresentationIdArray.length) !== ((requestBody.conference_reserch_paper_presentations).length)) {
			throw new BadRequestException('Invalid workshop Ids exists');
		}


		//create temporary coference Object
		let temporaryObj = {
			conference_name: conferenceName,
			conference_sub_topic: requestBody.conference_sub_topic,
			conference_type: requestBody.conference_type,
			conference_location: {
				location_name: requestBody.conference_location_name,
				location_desc: requestBody.conference_location_desc,
				location_google_map_link: requestBody.conference_location_google_map_link,
				location_images: conference_location_images
			},
			conference_days: {
				start_date: requestBody.conference_start_date,
				end_date: requestBody.conference_end_date
			},
			conference_organizer: requestBody.conference_organizer,
			conference_about: requestBody.conference_about,
			conference_images: conference_images,
			registration_fees: {
				attendee_registration_fee: requestBody.attendee_registration_fee,
				researcher_registration_fee: requestBody.researcher_registration_fee,
				workshop_conductor_registration_fee: requestBody.workshop_conductor_fee
			},
			contact_details: {
				address: requestBody.contact_address,
				phone_number: requestBody.contact_number,
				email: requestBody.contact_email
			},
			key_note_speakers: requestBody.key_note_speakers,
			conference_workshops: requestBody.conference_workshops,
			conference_reserch_paper_presentations: requestBody.conference_reserch_paper_presentations,
			matching_conference_id: conferenceObj._id
		};

		let newTemporaryObj = new TemporarySavedConference(temporaryObj);
		newTemporaryObj.$session(session);
		await newTemporaryObj.save();

		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: 'One conference is edited. Waiting for review'
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
			msg: 'Conference update requested'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;

	} finally {
		session.endSession();
	}

};

module.exports.editTempConference = async (requestBody) => {

	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {
		let conference_location_images = [];
		let conference_images = [];
		let validSpeakerIdArray = [];
		let validWorkshopIdArray = [];
		let validPresentationIdArray = [];

		//convert conference name to lower case
		let conferenceName = (requestBody.conference_name).toLowerCase();
		//check are there existing conference
		let conferenceObj = await TemporarySavedConference.findById(requestBody.conference_id).session(session);
		if (!conferenceObj) {
			throw new BadRequestException('Invalid conference id');
		}

		//assign default images to array
		conference_location_images = conferenceObj.conference_location.location_images;
		conference_images = conferenceObj.conference_images;
		

		//check conference location images uploaded successfully
		if ((requestBody.conference_location_images_array).length > 0) {
			if ((requestBody.conference_location_images_array).length > 10) {
				throw new BadRequestException('Maximum accepted file count is 10');
			}
			conference_location_images = requestBody.conference_location_images_array;
		}

		//check conference images uploaded successfully
		if ((requestBody.conference_images_array).length > 0) {
			if ((requestBody.conference_images_array).length > 10) {
				throw new BadRequestException('Maximum accepted file count is 10');
			}
			conference_images = requestBody.conference_images_array;
		}

		//generating all speakers id list
		let allSpeakersIdList = await Speaker.find({}, '_id').session(session);

		if (!allSpeakersIdList) {
			throw new UnauthorizedException();
		}

		//check send ids are available
		for (let index = 0; index < allSpeakersIdList.length; index++) {
			for (let idx = 0; idx < (requestBody.key_note_speakers).length; idx++) {
				if (allSpeakersIdList[index]._id == (requestBody.key_note_speakers)[idx]) {
					validSpeakerIdArray.push(requestBody.key_note_speakers[idx]);
				}
			}
		}

		if ((validSpeakerIdArray.length) !== ((requestBody.key_note_speakers).length)) {
			throw new BadRequestException('Invalid speaker Ids exists');
		}

		//generating all workshop id list
		let allWorkshopIdList = await Workshop.find({}, '_id').session(session);

		if (!allWorkshopIdList) {
			throw new UnauthorizedException();
		}

		//check send ids are available
		for (let index = 0; index < allWorkshopIdList.length; index++) {
			for (let idx = 0; idx < (requestBody.conference_workshops).length; idx++) {
				if (allWorkshopIdList[index]._id == (requestBody.conference_workshops)[idx]) {
					validWorkshopIdArray.push(requestBody.conference_workshops[idx]);
				}
			}
		}

		if ((validWorkshopIdArray.length) !== ((requestBody.conference_workshops).length)) {
			throw new BadRequestException('Invalid speaker Ids exists');
		}

		//generating all presentation id list
		let allPresentationIdList = await ReserchPaperPresentation.find({}, '_id').session(session);

		if (!allPresentationIdList) {
			throw new UnauthorizedException();
		}

		//check send ids are available
		for (let index = 0; index < allPresentationIdList.length; index++) {
			for (let idx = 0; idx < (requestBody.conference_reserch_paper_presentations).length; idx++) {
				if (allPresentationIdList[index]._id == (requestBody.conference_reserch_paper_presentations)[idx]) {
					validPresentationIdArray.push(requestBody.conference_reserch_paper_presentations[idx]);
				}
			}
		}

		if ((validPresentationIdArray.length) !== ((requestBody.conference_reserch_paper_presentations).length)) {
			throw new BadRequestException('Invalid speaker Ids exists');
		}

		//update temporary conference Object
		conferenceObj.conference_name = conferenceName;
		conferenceObj.conference_sub_topic = requestBody.conference_sub_topic;
		conferenceObj.conference_type = requestBody.conference_type;
		conferenceObj.conference_location.location_name = requestBody.conference_location_name;
		conferenceObj.conference_location.location_desc = requestBody.conference_location_desc;
		conferenceObj.conference_location.location_google_map_link = requestBody.conference_location_google_map_link;
		conferenceObj.conference_location.location_images = conference_location_images;
		conferenceObj.conference_days.start_date = requestBody.conference_start_date;
		conferenceObj.conference_days.end_date = requestBody.conference_end_date;
		conferenceObj.conference_organizer = requestBody.conference_organizer;
		conferenceObj.conference_about = requestBody.conference_about;
		conferenceObj.conference_images = conference_images;
		conferenceObj.registration_fees.attendee_registration_fee = requestBody.attendee_registration_fee;
		conferenceObj.registration_fees.researcher_registration_fee = requestBody.researcher_registration_fee;
		conferenceObj.registration_fees.workshop_conductor_registration_fee = requestBody.workshop_conductor_fee;
		conferenceObj.contact_details.address = requestBody.contact_address;
		conferenceObj.contact_details.phone_number = requestBody.contact_number;
		conferenceObj.contact_details.email = requestBody.contact_email;
		conferenceObj.key_note_speakers = requestBody.key_note_speakers,
		conferenceObj.conference_workshops = requestBody.conference_workshops;
		conferenceObj.conference_reserch_paper_presentations = requestBody.conference_reserch_paper_presentations;

		//save changes
		await conferenceObj.save();

		await session.commitTransaction();

		return {
			msg: 'Conference update requested'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;

	} finally {
		session.endSession();
	}

};

module.exports.getAllConferences = async () => {

	// eslint-disable-next-line no-useless-catch
	try {

		let conference_array_list = [];

		let ConferenceList = await Conference.find({}, '_id conference_about conference_days conference_location.location_name conference_name conference_organizer conference_type');

		for (let index = 0; index < ConferenceList.length; index++) {
			
			let data_set = {
				conference_id: ConferenceList[index]._id,
				conference_name: ConferenceList[index].conference_name,
				conference_type: ConferenceList[index].conference_type,
				conference_location_name: ConferenceList[index].conference_location.location_name,
				conference_start_date: ConferenceList[index].conference_days.start_date,
				conference_end_date: ConferenceList[index].conference_days.end_date,
				conference_organizer: ConferenceList[index].conference_organizer,
				conference_about: ConferenceList[index].conference_about,
			};

			conference_array_list.push(data_set);
		}

		return {
			msg: 'All conferences generated',
			data: conference_array_list
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getAllTempConferences = async () => {

	// eslint-disable-next-line no-useless-catch
	try {

		let conference_array_list = [];
		
		let ConferenceList = await TemporarySavedConference.find({}, '_id conference_about conference_days conference_location.location_name conference_name conference_organizer conference_type');

		for (let index = 0; index < ConferenceList.length; index++) {

			let data_set = {
				conference_id: ConferenceList[index]._id,
				conference_name: ConferenceList[index].conference_name,
				conference_type: ConferenceList[index].conference_type,
				conference_location_name: ConferenceList[index].conference_location.location_name,
				conference_start_date: ConferenceList[index].conference_days.start_date,
				conference_end_date: ConferenceList[index].conference_days.end_date,
				conference_organizer: ConferenceList[index].conference_organizer,
				conference_about: ConferenceList[index].conference_about,
			};

			conference_array_list.push(data_set);
		}
		
		return {
			msg: 'All temporary created conferences generated',
			data: conference_array_list
		};

	} catch (err) {
		throw err;
	}
};


module.exports.getSingleTempConference = async (requestBody) => {

	// eslint-disable-next-line no-useless-catch
	try {
		let workshop_data = [];
		let presentation_data = [];
		let speaker_data = [];

		let conference = await TemporarySavedConference.findById(requestBody.conference_id).populate('key_note_speakers').populate('conference_workshops').populate('conference_reserch_paper_presentations');
		if (!conference) {
			throw new BadRequestException('Inavalid conference id');
		}

		for (let index = 0; index < conference.conference_workshops.length; index++) {
			let data = {
				value: conference.conference_workshops[index]._id,
				label: conference.conference_workshops[index].workshop_name
			};
			workshop_data.push(data);
		}


		for (let index = 0; index < conference.conference_reserch_paper_presentations.length; index++) {
			let data = {
				value: conference.conference_reserch_paper_presentations[index]._id,
				label: conference.conference_reserch_paper_presentations[index].presentation_topic
			};
			presentation_data.push(data);
		}


		for (let index = 0; index < conference.key_note_speakers.length; index++) {
			let data = {
				value: conference.key_note_speakers[index]._id,
				label: conference.key_note_speakers[index].speaker_title + conference.key_note_speakers[index].speaker_first_name + ' ' + conference.key_note_speakers[index].speaker_last_name
			};
			speaker_data.push(data);
		}

		let returnData = {
			conference_about: conference.conference_about,
			conference_days: conference.conference_days,
			conference_images: conference.conference_images,
			conference_location: conference.conference_location,
			conference_name: conference.conference_name,
			conference_organizer: conference.conference_organizer,
			conference_reserch_paper_presentations: presentation_data,
			conference_sub_topic: conference.conference_sub_topic,
			conference_type: conference.conference_type,
			conference_workshops: workshop_data,
			contact_details: conference.contact_details,
			key_note_speakers: speaker_data,
			registration_fees: conference.registration_fees,
			conference_id: conference._id
		};

		return {
			msg: 'conference generated',
			data: returnData
		};

	} catch (err) {
		throw err;
	}
};


module.exports.getSingleConference = async (requestBody) => {

	// eslint-disable-next-line no-useless-catch
	try {

		let workshop_data = [];
		let presentation_data = [];
		let speaker_data = [];

		let conference = await Conference.findById(requestBody.conference_id).populate('key_note_speakers').populate('conference_workshops').populate('conference_reserch_paper_presentations');
		if (!conference) {
			throw new BadRequestException('Inavalid conference id');
		}

		for (let index = 0; index < conference.conference_workshops.length; index++) {
			let data = {
				value: conference.conference_workshops[index]._id,
				label: conference.conference_workshops[index].workshop_name
			};
			workshop_data.push(data);
		}


		for (let index = 0; index < conference.conference_reserch_paper_presentations.length; index++) {
			let data = {
				value: conference.conference_reserch_paper_presentations[index]._id,
				label: conference.conference_reserch_paper_presentations[index].presentation_topic
			};
			presentation_data.push(data);
		}


		for (let index = 0; index < conference.key_note_speakers.length; index++) {
			let data = {
				value: conference.key_note_speakers[index]._id,
				label: conference.key_note_speakers[index].speaker_title + conference.key_note_speakers[index].speaker_first_name + ' ' + conference.key_note_speakers[index].speaker_last_name
			};
			speaker_data.push(data);
		}

		let returnData = {
			conference_about: conference.conference_about,
			conference_days: conference.conference_days,
			conference_images: conference.conference_images,
			conference_location: conference.conference_location,
			conference_name: conference.conference_name,
			conference_organizer: conference.conference_organizer,
			conference_reserch_paper_presentations: presentation_data,
			conference_sub_topic: conference.conference_sub_topic,
			conference_type: conference.conference_type,
			conference_workshops: workshop_data,
			contact_details: conference.contact_details,
			key_note_speakers: speaker_data,
			registration_fees: conference.registration_fees,
			conference_id: conference._id
		};

		return {
			msg: 'conference generated',
			data: returnData
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getSingleConferenceForPreview = async (requestBody) => {

	// eslint-disable-next-line no-useless-catch
	try {
		let conference = await Conference.findById(requestBody.conference_id).populate('key_note_speakers');
		
		if (!conference) {
			throw new BadRequestException('Inavalid conference id');
		}

		let returnData = {
			conference_id: conference._id,
			conference_name: conference.conference_name,
			conference_sub_topic: conference.conference_sub_topic,
			conference_type: conference.conference_type,
			conference_location_name: conference.conference_location.location_name,
			conference_location_desc: conference.conference_location.location_desc,
			conference_location_google_map_link: conference.conference_location.location_google_map_link,
			conference_location_images: conference.conference_location.location_images,
			conference_start_date: conference.conference_days.start_date,
			conference_end_date: conference.conference_days.end_date,
			conference_organizer: conference.conference_organizer,
			conference_about: conference.conference_about,
			conference_images: conference.conference_images,
			conference_attendee_registration_fee: conference.registration_fees.attendee_registration_fee,
			conference_researcher_registration_fee: conference.registration_fees.researcher_registration_fee,
			conference_workshop_conductor_registration_fee: conference.registration_fees.workshop_conductor_registration_fee,
			conference_contact_address: conference.contact_details.address,
			conference_contact_phone_number: conference.contact_details.phone_number,
			conference_contact_email: conference.contact_details.email,
			conference_key_note_speakers: conference.key_note_speakers
		};

		return {
			msg: 'conference generated',
			data: returnData
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getSingleTempConferenceForPreview = async (requestBody) => {

	// eslint-disable-next-line no-useless-catch
	try {
		
		let conference = await TemporarySavedConference.findById(requestBody.conference_id).populate('key_note_speakers');
		
		if (!conference) {
			throw new BadRequestException('Inavalid conference id');
		}

		let returnData = {
			conference_id: conference._id,
			conference_name: conference.conference_name,
			conference_sub_topic: conference.conference_sub_topic,
			conference_type: conference.conference_type,
			conference_location_name: conference.conference_location.location_name,
			conference_location_desc: conference.conference_location.location_desc,
			conference_location_google_map_link: conference.conference_location.location_google_map_link,
			conference_location_images: conference.conference_location.location_images,
			conference_start_date: conference.conference_days.start_date,
			conference_end_date: conference.conference_days.end_date,
			conference_organizer: conference.conference_organizer,
			conference_about: conference.conference_about,
			conference_images: conference.conference_images,
			conference_attendee_registration_fee: conference.registration_fees.attendee_registration_fee,
			conference_researcher_registration_fee: conference.registration_fees.researcher_registration_fee,
			conference_workshop_conductor_registration_fee: conference.registration_fees.workshop_conductor_registration_fee,
			conference_contact_address: conference.contact_details.address,
			conference_contact_phone_number: conference.contact_details.phone_number,
			conference_contact_email: conference.contact_details.email,
			conference_key_note_speakers: conference.key_note_speakers
		};

		return {
			msg: 'conference generated',
			data: returnData
		};

	} catch (err) {
		throw err;
	}
};