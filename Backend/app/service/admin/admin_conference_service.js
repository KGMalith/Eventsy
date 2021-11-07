let mongoose = require('mongoose');
let Conference = require('../../schema/conference');
let TemporarySavedConference = require('../../schema/temporarySavedConference');
let Notification = require('../../schema/notification');

const BadRequestException = require('./../../util/exceptions/badRequestException');

module.exports.getAllRequestedConferences = async () => {
	// eslint-disable-next-line no-useless-catch
	try {

		let conferece_array_list = [];

		let ConfereceList = await TemporarySavedConference.find({}, '_id conference_name conference_days conference_about conference_type conference_location');

		for (let index = 0; index < ConfereceList.length; index++) {
            
			let return_data = {
				conference_id: ConfereceList[index]._id,
				conference_name: ConfereceList[index].conference_name,
				conference_type: ConfereceList[index].conference_type,
				conference_location_name: ConfereceList[index].conference_location.location_name,
				conference_start_date: ConfereceList[index].conference_days.start_date,
				conference_end_date: ConfereceList[index].conference_days.end_date,
				conference_about: ConfereceList[index].conference_about
			};

			conferece_array_list.push(return_data);
		}

		return {
			msg: 'Generated all conferences',
			data: conferece_array_list
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getAllConferences = async () => {
	// eslint-disable-next-line no-useless-catch
	try {

		let conferece_array_list = [];

		let ConfereceList = await Conference.find({}, '_id conference_name conference_days conference_about conference_type conference_location');

		for (let index = 0; index < ConfereceList.length; index++) {

			let return_data = {
				conference_id: ConfereceList[index]._id,
				conference_name: ConfereceList[index].conference_name,
				conference_type: ConfereceList[index].conference_type,
				conference_location_name: ConfereceList[index].conference_location.location_name,
				conference_start_date: ConfereceList[index].conference_days.start_date,
				conference_end_date: ConfereceList[index].conference_days.end_date,
				conference_about: ConfereceList[index].conference_about
			};

			conferece_array_list.push(return_data);
		}

		return {
			msg: 'Generated all conferences',
			data: conferece_array_list
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getRequestedConference = async (requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {
		let workshop_list = [];
		let presentation_list = [];
		let conference = await TemporarySavedConference.findById(requestBody.conference_id).populate('conference_workshops', 'workshop_name').populate('conference_reserch_paper_presentations', 'presentation_topic');

		if (!conference) {
			throw new BadRequestException('Invalid conference id');
		}

		for (let index = 0; index < (conference.conference_workshops).length; index++) {
			workshop_list.push((conference.conference_workshops)[index].workshop_name);
		}

		for (let index = 0; index < (conference.conference_reserch_paper_presentations).length; index++) {
			presentation_list.push((conference.conference_reserch_paper_presentations)[index].presentation_topic);
		}

		let data = {
			conference_id: conference._id,
			conference_name: conference.conference_name,
			conference_sub_topic: conference.conference_sub_topic,
			conference_type: conference.conference_type,
			conference_location: {
				location_name: conference.conference_location.location_name,
				location_desc: conference.conference_location.location_desc,
				location_google_map_link: conference.conference_location.location_google_map_link,
				location_images: conference.conference_location.location_images
			},
			conference_days: conference.conference_days,
			conference_organizer: conference.conference_organizer,
			conference_about: conference.conference_about,
			conference_images: conference.conference_images,
			registration_fees: {
				attendee_registration_fee: conference.registration_fees.attendee_registration_fee,
				researcher_registration_fee: conference.registration_fees.researcher_registration_fee,
				workshop_conductor_registration_fee: conference.registration_fees.workshop_conductor_registration_fee
			},
			contact_details: {
				address: conference.contact_details.address,
				phone_number: conference.contact_details.phone_number,
				email: conference.contact_details.email
			},
			conference_workshops: workshop_list,
			conference_reserch_paper_presentations: presentation_list
		};

		return {
			msg: 'Requested conference generated',
			data: data
		};

	} catch (err) {
		throw err;
	}
};

module.exports.getConference = async (requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {
		let workshop_list = [];
		let presentation_list = [];
		let conference = await Conference.findById(requestBody.conference_id).populate('conference_workshops', 'workshop_name').populate('conference_reserch_paper_presentations', 'presentation_topic');

		if (!conference) {
			throw new BadRequestException('Invalid conference id');
		}

		for (let index = 0; index < (conference.conference_workshops).length; index++) {
			workshop_list.push((conference.conference_workshops)[index].workshop_name);
		}

		for (let index = 0; index < (conference.conference_reserch_paper_presentations).length; index++) {
			presentation_list.push((conference.conference_reserch_paper_presentations)[index].presentation_topic);
		}

		let data = {
			conference_id: conference._id,
			conference_name: conference.conference_name,
			conference_sub_topic: conference.conference_sub_topic,
			conference_type: conference.conference_type,
			conference_location: {
				location_name: conference.conference_location.location_name,
				location_desc: conference.conference_location.location_desc,
				location_google_map_link: conference.conference_location.location_google_map_link,
				location_images: conference.conference_location.location_images
			},
			conference_days: conference.conference_days,
			conference_organizer: conference.conference_organizer,
			conference_about: conference.conference_about,
			conference_images: conference.conference_images,
			registration_fees: {
				attendee_registration_fee: conference.registration_fees.attendee_registration_fee,
				researcher_registration_fee: conference.registration_fees.researcher_registration_fee,
				workshop_conductor_registration_fee: conference.registration_fees.workshop_conductor_registration_fee
			},
			contact_details: {
				address: conference.contact_details.address,
				phone_number: conference.contact_details.phone_number,
				email: conference.contact_details.email
			},
			conference_workshops: workshop_list,
			conference_reserch_paper_presentations: presentation_list
		};

		return {
			msg: 'Requested conference generated',
			data: data
		};

	} catch (err) {
		throw err;
	}
};

module.exports.approveConference = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {
		let tempConference = await TemporarySavedConference.findById(requestBody.conference_id).session(session);

		if (!tempConference) {
			throw new BadRequestException('Invalid conference id');
		}

		let conference_name = tempConference.conference_name;

		if (tempConference.isNewRequest === true) {
			//create coference Object
			let Obj = {
				conference_name: tempConference.conference_name,
				conference_sub_topic: tempConference.conference_sub_topic,
				conference_type: tempConference.conference_type,
				conference_location: {
					location_name: tempConference.conference_location.location_name,
					location_desc: tempConference.conference_location.location_desc,
					location_google_map_link: tempConference.conference_location.location_google_map_link,
					location_images: tempConference.conference_location.location_images
				},
				conference_days: tempConference.conference_days,
				conference_organizer: tempConference.conference_organizer,
				conference_about: tempConference.conference_about,
				conference_images: tempConference.conference_images,
				registration_fees: {
					attendee_registration_fee: tempConference.registration_fees.attendee_registration_fee,
					researcher_registration_fee: tempConference.registration_fees.researcher_registration_fee,
					workshop_conductor_registration_fee: tempConference.registration_fees.workshop_conductor_registration_fee
				},
				contact_details: {
					address: tempConference.contact_details.address,
					phone_number: tempConference.contact_details.phone_number,
					email: tempConference.contact_details.email
				},
				conference_workshops: tempConference.conference_workshops,
				conference_reserch_paper_presentations: tempConference.conference_reserch_paper_presentations,
				changes_approved_by_admin: true
			};

			let newConference = new Conference(Obj);
			newConference.$session(session);
			await newConference.save();

		} else {
			let conferenceObj = await Conference.findById(tempConference.matching_conference_id).session(session);

			if (!conferenceObj) {
				throw new BadRequestException('Invalid matching conference id');
			}

			//update conference Object
			conferenceObj.conference_name = tempConference.conference_name;
			conferenceObj.conference_sub_topic = tempConference.conference_sub_topic;
			conferenceObj.conference_type = tempConference.conference_type;
			conferenceObj.conference_location.location_name = tempConference.conference_location.location_name;
			conferenceObj.conference_location.location_desc = tempConference.conference_location.location_desc;
			conferenceObj.conference_location.location_google_map_link = tempConference.conference_location.location_google_map_link;
			conferenceObj.conference_location.location_images = tempConference.conference_location.location_images;
			conferenceObj.conference_days = tempConference.conference_days;
			conferenceObj.conference_organizer = tempConference.conference_organizer;
			conferenceObj.conference_about = tempConference.conference_about;
			conferenceObj.conference_images = tempConference.conference_images;
			conferenceObj.registration_fees.attendee_registration_fee = tempConference.registration_fees.attendee_registration_fee;
			conferenceObj.registration_fees.researcher_registration_fee = tempConference.registration_fees.researcher_registration_fee;
			conferenceObj.registration_fees.workshop_conductor_registration_fee = tempConference.registration_fees.workshop_conductor_registration_fee;
			conferenceObj.contact_details.address = tempConference.contact_details.address;
			conferenceObj.contact_details.phone_number = tempConference.contact_details.phone_number;
			conferenceObj.contact_details.email = tempConference.contact_details.email;
			conferenceObj.conference_workshops = tempConference.conference_workshops;
			conferenceObj.conference_reserch_paper_presentations = tempConference.conference_reserch_paper_presentations;
			conferenceObj.changes_approved_by_admin = true;

			conferenceObj.$session(session);
			await conferenceObj.save();
		}

		//delete temporary conference object
		await tempConference.remove();

		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: `Requested conference "${conference_name}" approved`
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
			msg: 'Requested conference approved'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}

};

module.exports.rejectConference = async (requestUser, requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {
		let conference = await TemporarySavedConference.findById(requestBody.conference_id).session(session);

		if (!conference) {
			throw new BadRequestException('Invalid conference id');
		}

		let conference_name = conference.conference_name;

		//delete temporary conference object
		await conference.remove();

		let notificationArray = [];
		let notify = {
			created_by: requestUser.userID,
			message: 'Requested conference rejected'
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
			msg: `Requested conference "${conference_name}" rejected`
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};