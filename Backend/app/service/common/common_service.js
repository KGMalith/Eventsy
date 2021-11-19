let mongoose = require('mongoose');
let Conference = require('../../schema/conference');
let Contact = require('../../schema/contact');
let User = require('../../schema/user');
let Speaker = require('../../schema/speakers');

const BadRequestException = require('./../../util/exceptions/badRequestException');
const UnauthorizedException = require('./../../util/exceptions/unautherizedException');

module.exports.generateMainPageData = async () => {
	// eslint-disable-next-line no-useless-catch
	try {
		let conferenceList = await Conference.find({}).populate({ path: 'conference_workshops', populate: ({ path: 'workshop_speakers' }) }).populate({ path: 'conference_reserch_paper_presentations', populate: ({ path: 'presentation_conductor' }) }).populate('key_note_speakers');

		if (conferenceList.length < 1){
			throw new UnauthorizedException();
		}

		let respondObj = {
			conference_name: conferenceList[0].conference_name,
			conference_sub_topic: conferenceList[0].conference_sub_topic,
			conference_type: conferenceList[0].conference_type,
			conference_location: {
				location_name: conferenceList[0].conference_location.location_name,
				location_desc: conferenceList[0].conference_location.location_desc,
				location_google_map_link: conferenceList[0].conference_location.location_google_map_link,
				location_images: conferenceList[0].conference_location.location_images
			},
			conference_days: {
				start_date: conferenceList[0].conference_days.start_date,
				end_date: conferenceList[0].conference_days.end_date
			},
			conference_organizer: conferenceList[0].conference_organizer,
			conference_about: conferenceList[0].conference_about,
			conference_images: conferenceList[0].conference_images,
			registration_fees: {
				attendee_registration_fee: conferenceList[0].registration_fees.attendee_registration_fee,
				researcher_registration_fee: conferenceList[0].registration_fees.researcher_registration_fee,
				workshop_conductor_registration_fee: conferenceList[0].registration_fees.workshop_conductor_registration_fee
			},
			contact_details: {
				address: conferenceList[0].contact_details.address,
				phone_number: conferenceList[0].contact_details.phone_number,
				email: conferenceList[0].contact_details.email
			},
			conference_workshops: conferenceList[0].conference_workshops,
			conference_reserch_paper_presentations: conferenceList[0].conference_reserch_paper_presentations,
			key_note_speakers: conferenceList[0].key_note_speakers
		};

		return {
			msg: 'conferece data generated',
			data: respondObj
		};

	} catch (err) {
		throw err;
	}
};

module.exports.submitContactMessage = async (requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();
	try {

		let dataObj = {
			contact_name: requestBody.contact_name,
			contact_email: requestBody.contact_email,
			contact_subject: requestBody.contact_subject,
			conference_message: requestBody.conference_message
		};

		let contactMessage = new Contact(dataObj);
		contactMessage.$session(session);
		await contactMessage.save();

		await session.commitTransaction();

		return {
			msg: 'Contact message submitted successfully'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.downloads = async () => {
	// eslint-disable-next-line no-useless-catch
	try {

		let presentations_list = [];
		let workshops_list = [];

		let conferenceList = await Conference.find({}).populate({ path: 'conference_workshops', populate: ({ path: 'requested_user', match: { 'event_details.is_event_created': true} }) }).populate({ path: 'conference_reserch_paper_presentations', populate: ({ path: 'presentation_conductor', match: { 'event_details.is_event_created': true} }) });
		
		if (conferenceList.length < 1) {
			let return_data = {
				presentations: presentations_list,
				workshops: workshops_list
			};

			return {
				msg: 'Downloads loaded successfully',
				data: return_data
			};
		}

		for (let index = 0; index < (conferenceList[0].conference_workshops).length; index++) {
			
			let workshop = {
				workshop_name: (conferenceList[0].conference_workshops)[index].workshop_name,
				download_link: (conferenceList[0].conference_workshops)[index].requested_user.event_details.media_file_details.media_file
			};

			workshops_list.push(workshop);
		}

		for (let index = 0; index < (conferenceList[0].conference_reserch_paper_presentations).length; index++) {

			let presentation = {
				workshop_name: (conferenceList[0].conference_reserch_paper_presentations)[index].presentation_topic,
				download_link: (conferenceList[0].conference_reserch_paper_presentations)[index].requested_user.event_details.media_file_details.media_file
			};

			presentations_list.push(presentation);
		}
		
		let return_data = {
			presentations: presentations_list,
			workshops: workshops_list
		};

		return {
			msg: 'Downloads loaded successfully',
			data: return_data
		};

	} catch (err) {
		throw err;
	}
};

module.exports.researchPaperPresentations = async () => {
	// eslint-disable-next-line no-useless-catch
	try {

		let presentations_list = [];

		let conferenceList = await Conference.find({}).populate({ path: 'conference_reserch_paper_presentations', populate: { path: 'presentation_conductor'} });

		if (conferenceList.length < 1) {
			let return_data = {
				presentations: presentations_list,
			};

			return {
				msg: 'Presentations loaded successfully',
				data: return_data
			};
		}
		
		for (let index = 0; index < (conferenceList[0].conference_reserch_paper_presentations).length; index++) {
			
			let data_set = {
				presentation_topic: (conferenceList[0].conference_reserch_paper_presentations)[index].presentation_topic,
				presentation_description: (conferenceList[0].conference_reserch_paper_presentations)[index].presentation_description,
				presentation_conductor: (conferenceList[0].conference_reserch_paper_presentations)[index].presentation_conductor,
				presentation_date_and_time: (conferenceList[0].conference_reserch_paper_presentations)[index].presentation_date_and_time
			};

			presentations_list.push(data_set);
		}

		return {
			msg: 'Presentations loaded successfully',
			data: presentations_list
		};

	} catch (err) {
		throw err;
	}
};

module.exports.workshops = async () => {
// eslint-disable-next-line no-useless-catch
	try {

		let workshops_list = [];

		let conferenceList = await Conference.find({}).populate({ path: 'conference_workshops', populate: { path: 'workshop_speakers' } });

		if (conferenceList.length < 1) {
			let return_data = {
				presentations: workshops_list,
			};

			return {
				msg: 'Workshops loaded successfully',
				data: return_data
			};
		}

		for (let index = 0; index < (conferenceList[0].conference_reserch_paper_presentations).length; index++) {

			let workshop_speakers = [];

			for (let i = 0; i < ((conferenceList[0].conference_reserch_paper_presentations)[index]).length; i++) {

				let speaker_name = ((conferenceList[0].conference_reserch_paper_presentations)[index])[i].speaker_title + ' ' + ((conferenceList[0].conference_reserch_paper_presentations)[index])[i].speaker_first_name + ' ' + ((conferenceList[0].conference_reserch_paper_presentations)[index])[i].speaker_last_name;
				workshop_speakers.push(speaker_name);
			}

			let data_set = {
				workshop_name: (conferenceList[0].conference_reserch_paper_presentations)[index].workshop_name,
				workshop_description: (conferenceList[0].conference_reserch_paper_presentations)[index].workshop_description,
				workshop_speakers: workshop_speakers,
				workshop_date_and_time: (conferenceList[0].conference_reserch_paper_presentations)[index].workshop_date_and_time
			};

			workshops_list.push(data_set);
		}

		return {
			msg: 'Workshops loaded successfully',
			data: workshops_list
		};

	} catch (err) {
		throw err;
	}
};

module.exports.generateUserData = async (requestUser) => {
	// eslint-disable-next-line no-useless-catch
	try {

		let userObj = await User.findById(requestUser.userID);
		if (!userObj) {
			throw new BadRequestException('Invalid user id');
		}

		return {
			msg: 'Contact message submitted successfully',
			data: userObj
		};

	} catch (err) {
		throw err;
	}
};

module.exports.updateUserData = async (requestUser,requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {

		let userObj = await User.findById(requestUser.userID);
		if (!userObj) {
			throw new BadRequestException('Invalid user id');
		}

		if (userObj.role === 1 && requestBody.user_image){
			await Speaker.findOneAndUpdate({ user_id: requestUser.userID }, { speaker_image: requestBody.user_image});
		}

		userObj.mobile_number = requestBody.mobile_number;
		userObj.user_image = requestBody.user_image && requestBody.user_image;
		userObj.name_title = requestBody.name_title;
		userObj.first_name = requestBody.first_name;
		userObj.last_name = requestBody.last_name;
		userObj.affliation = requestBody.affliation && requestBody.affliation;
		userObj.save();

		return {
			msg: 'User profile updated successfully'
		};

	} catch (err) {
		throw err;
	}
};