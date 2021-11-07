let User = require('../../schema/user');
let Speaker = require('../../schema/speakers');
let Conference = require('../../schema/conference');
let ReserchPaperPresentation = require('../../schema/reserchPaperPresentation');
let TemporaryReserchPaperPresentation = require('../../schema/temporarySavedResearchPaperPresentation');

const BadRequestException = require('./../../util/exceptions/badRequestException');
const UnauthorizedException = require('./../../util/exceptions/unautherizedException');


module.exports.getResearchPresentationDetails = async (requestUser) => {
	// eslint-disable-next-line no-useless-catch
	try {

		let presentation_event = null;
		let UserObj = await User.findById(requestUser.userID);

		if (!UserObj) {
			throw new UnauthorizedException();
		}

		let conferenceObj = await Conference.find({});

		if ((conferenceObj.length) <= 0) {
			throw new UnauthorizedException();
		}

		let payment_amount = UserObj.role === 0 ? conferenceObj.registration_fees.attendee_registration_fee : UserObj.role === 1 ? conferenceObj.registration_fees.researcher_registration_fee : UserObj.role === 2 ? conferenceObj.registration_fees.workshop_conductor_registration_fee : null;

		if (UserObj.event_details.is_event_created) {

			let speakerObj = await Speaker.findOne({ user_id: requestUser.userID });
			if (!speakerObj) {
				throw new UnauthorizedException();
			}

			let tempPresentationObj = await TemporaryReserchPaperPresentation.findOne({ presentation_conductor: speakerObj._id });
			let presentationObj = await ReserchPaperPresentation.findOne({ presentation_conductor: speakerObj._id });

			if (tempPresentationObj) {
				presentation_event = {
					presentation_topic: tempPresentationObj.presentation_topic,
					presentation_description: tempPresentationObj.presentation_description,
					presentation_date_and_time: tempPresentationObj.presentation_date_and_time,
					presentation_status: 'Pending'
				};
			} else if (presentationObj) {
				presentation_event = {
					presentation_topic: tempPresentationObj.presentation_topic,
					presentation_description: tempPresentationObj.presentation_description,
					presentation_date_and_time: tempPresentationObj.presentation_date_and_time,
					presentation_status: 'Created'
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
			presentation_event: presentation_event
		};

		return {
			msg: 'Generated presentation details',
			data: data_set
		};

	} catch (err) {
		throw err;
	}
};