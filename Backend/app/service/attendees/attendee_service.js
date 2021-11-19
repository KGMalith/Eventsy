let User = require('../../schema/user');
let Conference = require('../../schema/conference');

const UnauthorizedException = require('./../../util/exceptions/unautherizedException');


module.exports.getConferenceDetails = async (requestUser) => {
	// eslint-disable-next-line no-useless-catch
	try {

		let UserObj = await User.findById(requestUser.userID);

		if (!UserObj) {
			throw new UnauthorizedException();
		}

		let conferenceObjList = await Conference.find({});

		if ((conferenceObjList.length) <= 0) {
			throw new UnauthorizedException();
		}

		let payment_amount = conferenceObjList[0].registration_fees.attendee_registration_fee;

		let data_set = {
			conference_name: conferenceObjList[0].conference_name,
			conference_type: conferenceObjList[0].conference_type,
			conferene_start_date: conferenceObjList[0].conference_days.start_date,
			conference_end_date: conferenceObjList[0].conference_days.end_date,
			payment: {
				is_payment_completed: UserObj.is_payment_completed,
				payment_amount: payment_amount
			},
		};

		return {
			msg: 'Generated conference details',
			data: data_set
		};

	} catch (err) {
		throw err;
	}
};