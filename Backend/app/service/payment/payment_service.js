let mongoose = require('mongoose');
let User = require('../../schema/user');
let Speaker = require('../../schema/speakers');
let Conference = require('../../schema/conference');
let Workshop = require('../../schema/workshop');
let ReserchPaperPresentation = require('../../schema/reserchPaperPresentation');
var md5 = require('md5');

const BadRequestException = require('./../../util/exceptions/badRequestException');
const UnauthorizedException = require('./../../util/exceptions/unautherizedException');
const config = require('../../../config/config');

module.exports.initPayment = async (requestUser) => {
	// eslint-disable-next-line no-useless-catch
	try {
		let UserObj = await User.findById(requestUser.userID);

		if (!UserObj) {
			throw new UnauthorizedException();
		}

		let conferenceObj = await Conference.find({});

		//check conference available
		if ((conferenceObj.length) <= 0) {
			throw new UnauthorizedException();
		}

		//if user role resercher or workshp conductor check their requested event created
		if ((requestUser.userRole === 1 || requestUser.userRole === 2) && !(UserObj.event_details.is_event_created)) {
			throw new UnauthorizedException();
		}

		//check payment already completed
		if (UserObj.is_payment_completed) {
			throw new BadRequestException('Payment already completed');
		}

		//check billing details submitted
		if (!(UserObj.billing_contact_details.is_billing_contact_details_completed)){
			throw new BadRequestException('Billing contact details not submitted');
		}
        
		if (requestUser.userRole === 1){

			let speakerObj = await Speaker.findOne({ user_id: requestUser.userID });
			if (!speakerObj) {
				throw new UnauthorizedException();
			}

			let presentationObj = await ReserchPaperPresentation.findOne({ presentation_conductor: speakerObj._id });

			if (!presentationObj) {
				throw new BadRequestException('Research presentation event not created. Please try again later');
			}  

		}

		if (requestUser.userRole === 2){
			let workshopObj = await Workshop.findOne({ requested_user: requestUser.userID});

			if (!workshopObj) {
				throw new BadRequestException('Workshop event not created. Please try again later');
			} 

		}

		let user_id = UserObj._id;
		let payment_amount = UserObj.role === 0 ? conferenceObj.registration_fees.attendee_registration_fee : UserObj.role === 1 ? conferenceObj.registration_fees.researcher_registration_fee : UserObj.role === 2 ? conferenceObj.registration_fees.workshop_conductor_registration_fee : null;

		if (payment_amount === 0){
			//update user
			await User.findByIdAndUpdate(requestUser.userID, { is_payment_completed:true});

			return {
				msg: 'payment completed'
			};
		}else{
			let hash_code = (md5(config.Payhere.MERCHANT_ID + user_id + (Number(payment_amount)).toFixed(2) + config.Payhere.CURRENCY_CODE + (md5(config.Payhere.PAYHERE_SECRET)).toUpperCase())).toUpperCase();

			let data_object = {
				sandbox: true,
				merchant_id: config.Payhere.MERCHANT_ID,
				order_id: user_id,
				hash: hash_code,
				billing_contact_details: UserObj.billing_contact_details,
				email: UserObj.email,
				notify_url: config.Backend.BACKEND_BASE_URL + config.Backend.PAYMENT_NOTIFICATION_URL_PATH,
				amount: (Number(payment_amount)).toFixed(2),
				currency: config.Payhere.CURRENCY_CODE
			};

			return {
				msg: 'payment initiated',
				data: data_object
			};
		}

	} catch (err) {
		throw err;
	}
};

module.exports.markPaymentStatus = async (requestBody) => {

	const userID = requestBody.order_id;
	const paymentStatus = requestBody.status_code;
	const hash = requestBody.md5sig;

	//initiate session
	const session = await mongoose.startSession();
	//start the transaction
	session.startTransaction();

	if (paymentStatus != 2) {
		throw new BadRequestException('Unsuccessful payment status');
	}

	try {

		let userObj = await User.findById(userID);

		if (!userObj) {
			throw new BadRequestException('Invalid user id');
		}

		let conferenceObj = await Conference.find({});

		if ((conferenceObj.length) <= 0) {
			throw new UnauthorizedException();
		}

		let payment_amount = userObj.role === 0 ? conferenceObj.registration_fees.attendee_registration_fee : userObj.role === 1 ? conferenceObj.registration_fees.researcher_registration_fee : userObj.role === 2 ? conferenceObj.registration_fees.workshop_conductor_registration_fee : null;


		let generatedHash = (md5(config.Payhere.MERCHANT_ID + userID + (Number(payment_amount)).toFixed(2) + config.Payhere.CURRENCY_CODE + paymentStatus + (md5(config.Payhere.PAYHERE_SECRET)).toUpperCase())).toUpperCase();

		if (!generatedHash || generatedHash.toString() !== hash.toString()) {

			throw new BadRequestException('Hash did not match');
		}

		userObj.is_payment_completed = true;
		userObj.$session(session);
		await userObj.save();

		await session.commitTransaction();
		return {
			message: 'Payment marked as successfull'
		};
	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};