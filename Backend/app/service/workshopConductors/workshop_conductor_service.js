let User = require('../../schema/user');
let Conference = require('../../schema/conference');
let Workshop = require('../../schema/workshop');
let TemporaryWorkshop = require('../../schema/temporarySavedWorkshop');

const BadRequestException = require('./../../util/exceptions/badRequestException');
const UnauthorizedException = require('./../../util/exceptions/unautherizedException');


module.exports.getWorkshopDetails = async (requestUser) => {
	// eslint-disable-next-line no-useless-catch
	try {

		let workshop_event = null;
		let UserObj = await User.findById(requestUser.userID);

		if (!UserObj) {
			throw new UnauthorizedException();
		}

		let conferenceObjList = await Conference.find({});

		if ((conferenceObjList.length) <= 0) {
			throw new UnauthorizedException();
		}

		let payment_amount = conferenceObjList[0].registration_fees.workshop_conductor_registration_fee;

		if (UserObj.event_details.is_event_created) {

			let tempWorkshopObj = await TemporaryWorkshop.findOne({ requested_user: requestUser.userID }).populate('workshop_speakers','speaker_title speaker_first_name speaker_last_name');
			let workshopObj = await Workshop.findOne({ requested_user: requestUser.userID });

			if (tempWorkshopObj) {
				let workshop_speakers_array = [];

				for (let index = 0; index < (tempWorkshopObj.workshop_speakers).length; index++) {
					let speaker_name = (tempWorkshopObj.workshop_speakers)[index].speaker_title + ' ' + (tempWorkshopObj.workshop_speakers)[index].speaker_first_name + ' ' + (tempWorkshopObj.workshop_speakers)[index].speaker_last_name;
					workshop_speakers_array.push(speaker_name);
				}

				workshop_event = {
					workshop_name: tempWorkshopObj.workshop_name,
					workshop_description: tempWorkshopObj.presentation_description,
					workshop_date_and_time: tempWorkshopObj.presentation_date_and_time,
					workshop_speakers: workshop_speakers_array,
					workshop_status: 'Pending'
				};
			} else if (workshopObj) {
				let workshop_speakers_array = [];

				for (let index = 0; index < (workshopObj.workshop_speakers).length; index++) {
					let speaker_name = (workshopObj.workshop_speakers)[index].speaker_title + ' ' + (workshopObj.workshop_speakers)[index].speaker_first_name + ' ' + (workshopObj.workshop_speakers)[index].speaker_last_name;
					workshop_speakers_array.push(speaker_name);
				}

				workshop_event = {
					workshop_name: workshopObj.workshop_name,
					workshop_description: workshopObj.presentation_description,
					workshop_date_and_time: workshopObj.presentation_date_and_time,
					workshop_speakers: workshop_speakers_array,
					workshop_status: 'Created'
				};
			} else {
				throw new BadRequestException('Created event not found. Please try again later');
			}

		}

		let data_set = {
			media_file: UserObj.event_details.media_file_details.media_file,
			media_file_status: UserObj.event_details.media_file_details.media_file_status,
			is_event_created: UserObj.event_details.is_event_created,
			payment: {
				is_payment_completed: UserObj.is_payment_completed,
				payment_amount: payment_amount
			},
			workshop_event: workshop_event
		};

		return {
			msg: 'Generated workshop details',
			data: data_set
		};

	} catch (err) {
		throw err;
	}
};