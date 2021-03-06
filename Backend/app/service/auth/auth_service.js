let mongoose = require('mongoose');

// DB Schema files
let User = require('../../schema/user');
let VerificationToken = require('../../schema/verificationTokenSchema');
let Speaker = require('../../schema/speakers');
let Notification = require('../../schema/notification');
let Conference = require('../../schema/conference');

// Other required files
let randomstring = require('randomstring');
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
let jwt = require('jsonwebtoken');
let config = require('../../../config/config');

//functions
let sendEmail = require('../../functions/email/emailTemplates');

// Error Class files
const BadRequestException = require('../../util/exceptions/badRequestException');
const UnauthorizedException = require('../../util/exceptions/unautherizedException');

module.exports.userSignup = async (requestBody) => {

	let userEmail = requestBody.user_email;
	let password = requestBody.password;

	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {

		//check whether the email is already taken
		let isDuplicatedEmail = await User.findOne({
			email: userEmail,
			is_signup_completed:true
		}).session(session);

		if (isDuplicatedEmail) {
			throw new BadRequestException('Email is already taken');
		}

		//check user roles are within  atendees, reserchers and workshop conductors otherwise send error
		if (requestBody.role !== 0 && requestBody.role !== 1 && requestBody.role !== 2) {
			throw new UnauthorizedException();
		}

		let ConferenceList = await Conference.find({}).session(session);

		if (ConferenceList.length <= 0){
			throw new BadRequestException('Conference currently unavailable. Please signup once conference available');
		}

		//Encrypt password
		let salt = genSaltSync(10);
		let encrypted_password = hashSync(password, salt);
		
		//media file url assign
		let media_file_url = null;

		if (requestBody.role === 1 || requestBody.role === 2){
			media_file_url = requestBody.file_url;
		}
	
		//create user Object and assign values
		let user = {
			email: userEmail,
			password: encrypted_password,
			mobile_number: requestBody.mobile_number,
			name_title: requestBody.name_title,
			first_name: requestBody.first_name,
			last_name: requestBody.last_name,
			affiliation: requestBody.role === 1 && requestBody.affiliation,
			role: requestBody.role,
			event_details:{
				media_file_details: {
					media_file: media_file_url,
				}
			}
			
		};

		//save created user object to database
		let newUser = new User(user);
		newUser.$session(session);
		let createdUser = await newUser.save();

		//if user is an researcher save his data as new speaker
		if (requestBody.role === 1){
			let speaker = {
				user_id: createdUser._id,
				speaker_title: requestBody.name_title,
				speaker_first_name: requestBody.first_name,
				speaker_last_name: requestBody.last_name,
				speaker_affiliation: requestBody.affiliation,
				changes_approved_by_admin: true,
			};
			let newSpeaker = new Speaker(speaker);
			newSpeaker.$session(session);
			await newSpeaker.save();
		}

		//delete existing token generated to specific user
		await VerificationToken.deleteMany({ user_email: userEmail }).session(session);

		//generate token
		const code = randomstring.generate({
			length: 6,
			charset: 'numeric'
		});

		let tokenBody = {
			user_email: userEmail,
			token: parseInt(code)
		};

		//token save in db
		let newToken = new VerificationToken(tokenBody);
		newToken.$session(session);
		await newToken.save();

		let dataBody = {
			user_name: requestBody.name_title + ' ' + requestBody.first_name + ' ' + requestBody.last_name,
			verification_code: code,
			receiver: userEmail
		};

		let emailRespond =  await sendEmail.sendVerificationToken(dataBody);

		if ((emailRespond.rejected).length > 0) {
			throw new BadRequestException('Email sending error');
		}

		//commit the transaction 
		await session.commitTransaction();
		return {
			msg: 'Signup completed.'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.invitedUserSignUp = async (requestBody) => {

	let password = requestBody.password;

	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {

		let UserObj = await User.findById(requestBody.user_id).session(session);

		if (!UserObj){
			throw new BadRequestException('Invalid URL request');
		}

		if (UserObj.is_requested_user && UserObj.is_signup_completed){
			throw new BadRequestException('User alredy signup successfully');
		}

		//Encrypt password
		let salt = genSaltSync(10);
		let encrypted_password = hashSync(password, salt);

		//update user Object and assign values
		UserObj.password = encrypted_password;
		UserObj.is_signup_completed = true;
		UserObj.is_email_verified = true;
		UserObj.$session(session);
		await UserObj.save();

		//commit the transaction 
		await session.commitTransaction();
		return {
			msg: 'Signup completed.'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.invitedUserValidate = async (requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {
		
		let UserObj = await User.findById(requestBody.user_id);

		if (!UserObj) {
			throw new BadRequestException('Invalid URL request');
		}

		if (!(UserObj.is_requested_user)) {
			throw new BadRequestException('Invalid URL request');
		}

		if (UserObj.is_signup_completed){
			throw new BadRequestException('User alredy signup successfully');
		}

		return {
			msg: 'URL validated',
		};

	} catch (err) {
		throw err;
	}
};

module.exports.validateEmail = async (requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//starting transaction
	session.startTransaction();
	try {
		//convert code to int
		let code = parseInt(requestBody.verification_code);
		//get token object
		let tokenObj = await VerificationToken.findOne({ user_email: requestBody.user_email, token: code }).session(session);

		//check token is exist
		if (!tokenObj) {
			throw new BadRequestException('Verification token invalid or expired!');
		}

		//get user Obj
		let userObj = await User.findOne({ email: requestBody.user_email }).session(session);

		if (!userObj) {
			throw new BadRequestException('Invalid user!');
		}

		//save user object
		userObj.is_email_verified = true;
		userObj.is_signup_completed = true;
		userObj.$session(session);
		await userObj.save();

		if (userObj.role === 1 || userObj.role === 2){
			let notificationArray = [];
			let notify = {
				created_by: userObj._id,
				message: userObj.role === 1 ? 'New research paper submited' : userObj.role === 2 && 'New workshop proposal submitted'
			};
			notificationArray.push(notify);

			//check are there any exisiting notification object
			let notificationObj = await Notification.findOne({ user_role: 3 }).session(session);

			if (notificationObj) {
				notificationObj.notification.push(notify);
				notificationObj.$session(session);
				notificationObj.save();
			} else {
				//create notification
				let notification = {
					user_role: 3,
					notification: notificationArray
				};
				let newNotification = new Notification(notification);
				newNotification.$session(session);
				await newNotification.save();
			}
		}

		//delete generated token
		await VerificationToken.deleteMany({ user_email: requestBody.user_email }).session(session);

		await session.commitTransaction();

		return {
			msg: 'Email validated successfully'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	}
	finally {
		session.endSession();
	}

};

module.exports.userSignin = async (requestBody) => {

	let userEmail = requestBody.user_email;
	let userPassword = requestBody.password;

	// eslint-disable-next-line no-useless-catch
	try {
		//check email is exists
		let userObject = await User.findOne({
			email: userEmail
		});

		//check user object is exists
		if (!userObject) {
			throw new BadRequestException('Invalid email or password provided');
		}

		//check invited user signup completed
		if (userObject.is_requested_user === true && userObject.is_signup_completed === false) {
			throw new BadRequestException('Please use URL link sent to your email to complete your signup');
		}

		//check user signup completed and email verified
		if (userObject.is_requested_user === false && userObject.is_signup_completed === false && userObject.is_email_verified === false) {
			return{
				signup_not_completed:true,
				msg: 'Email not verified',
				data: userEmail
			};
		}

		//check password is matching
		let passwordMatchResult = compareSync(userPassword, userObject.password);

		if (!passwordMatchResult) {
			throw new BadRequestException('Invalid email or password provided');
		}

		const tokenBody = {
			email_verified: userObject.is_email_verified,
			user_email: userObject.email,
			user_role: userObject.role,
			user_id: userObject._id
		};

		const jsonToken = jwt.sign({ result: tokenBody }, config.JWT.secret, {
			expiresIn: '24h'
		});

		const data = {
			user_name: userObject.first_name + ' ' + userObject.last_name,
			user_role: userObject.role,
			is_email_activated: userObject.is_email_verified,
			token: jsonToken
		};

		return {
			msg: 'User signin successfully!',
			data: data
		};

	} catch (err) {
		throw err;
	}
};

module.exports.forgotPassword = async (requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//starting transaction
	session.startTransaction();

	try {

		let userObj = await User.findOne({ email: requestBody.user_email }).session(session);

		if (!userObj) {
			throw new BadRequestException('Invalid user email');
		}

		if (userObj.is_requested_user === true && userObj.is_signup_completed === false) {
			throw new BadRequestException('Please use URL link sent to your email to complete your signup');
		}

		//delete existing token generated to specific user
		await VerificationToken.deleteMany({ user_email: requestBody.user_email }).session(session);

		//generate new token
		const code = randomstring.generate({
			length: 6,
			charset: 'numeric'
		});

		let tokenBody = {
			user_email: requestBody.user_email,
			token: parseInt(code)
		};

		let newTokenObj = new VerificationToken(tokenBody);
		newTokenObj.$session(session);
		await newTokenObj.save();

		let emailBody = {
			user_name: userObj.first_name,
			verification_code: code,
			receiver: requestBody.user_email
		};

		let emailRespond = await sendEmail.sendForgotPasswordVerificationToken(emailBody);

		if ((emailRespond.rejected).length > 0) {
			throw new BadRequestException('Email sending error');
		}

		await session.commitTransaction();

		return {
			msg: 'Verification code sent to email'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.resendToken = async (requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//starting transaction
	session.startTransaction();

	try {

		let userObj = await User.findOne({ email: requestBody.user_email }).session(session);

		if (!userObj) {
			throw new BadRequestException('Invalid user email');
		}

		if (userObj.is_requested_user === true && userObj.is_signup_completed === false) {
			throw new BadRequestException('Please use URL link sent to your email to complete your signup');
		}

		//delete existing token generated to specific user
		await VerificationToken.deleteMany({ user_email: requestBody.user_email }).session(session);

		//generate new token
		const code = randomstring.generate({
			length: 6,
			charset: 'numeric'
		});

		let tokenBody = {
			user_email: requestBody.user_email,
			token: parseInt(code)
		};

		let newTokenObj = new VerificationToken(tokenBody);
		newTokenObj.$session(session);
		await newTokenObj.save();

		let emailBody = {
			user_name: userObj.first_name,
			verification_code: code,
			receiver: requestBody.user_email
		};

		let emailRespond = await sendEmail.reSendPasswordVerificationToken(emailBody);

		if ((emailRespond.rejected).length > 0) {
			throw new BadRequestException('Email sending error');
		}

		await session.commitTransaction();

		return {
			msg: 'Verification code resend to email'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.resetPassword = async (requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//starting transaction
	session.startTransaction();

	try {
		//convert code to int
		let code = parseInt(requestBody.verification_code);

		//get token object
		let tokenObj = await VerificationToken.findOne({ user_email: requestBody.user_email, token: code }).session(session);

		//check token is exist
		if (!tokenObj) {
			throw new BadRequestException('Verification token invalid or expired!');
		}
		//get user Obj
		let userObj = await User.findOne({ email: requestBody.user_email }).session(session);

		if (!userObj) {
			throw new BadRequestException('Invalid user!');
		}

		//encrypt password
		let salt = genSaltSync(10);
		let encrypted_password = hashSync(requestBody.new_password, salt);

		userObj.is_email_verified = true;
		userObj.password = encrypted_password;

		userObj.$session(session);
		await userObj.save();

		await VerificationToken.deleteMany({ user_email: requestBody.user_email }).session(session);

		await session.commitTransaction();

		return {
			msg: 'Password reset successfully'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};