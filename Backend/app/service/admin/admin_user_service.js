let mongoose = require('mongoose');

// DB Schema files
let User = require('../../schema/user');

//functions
let sendEmail = require('../../functions/email/emailTemplates');

// Other required files
let config = require('../../../config/config');

// Error Class files
const BadRequestException = require('./../../util/exceptions/badRequestException');
const UnauthorizedException = require('./../../util/exceptions/unautherizedException');

module.exports.addNewUser = async (requestBody) => {
	//initiate session
	const session = await mongoose.startSession();
	//Start trasaction
	session.startTransaction();

	try {

		let isUserExists = await User.findOne(requestBody.user_email).session(session);

		if (isUserExists) {
			throw new BadRequestException('Email already taken by another user');
		}

		if (requestBody.role !== 3 && requestBody.role !== 4 && requestBody.role !== 5) {
			throw new UnauthorizedException();
		}

		//create user Object
		let Obj = {
			email: requestBody.user_email,
			name_title: requestBody.user_name_title,
			first_name: requestBody.user_first_name,
			last_name: requestBody.user_last_name,
			role: requestBody.user_role,
			is_requested_user:true
		};

		let newUser = new User(Obj);
		newUser.$session(session);
		let newUserObj = await newUser.save();

		let invitation_URL = config.Frontend.FRONTEND_BASE_URL + config.Frontend.USER_INVITATION_URL_PATH + '/' + newUserObj._id;

		let dataBody = {
			user_name: requestBody.user_name_title + ' ' + requestBody.user_first_name + ' ' + requestBody.user_last_name,
			user_role: requestBody.user_role === 3 ? 'Reviewer' : requestBody.user_role === 4 ? 'Editor' : requestBody.user_role === 5 && 'Admin',
			receiver: requestBody.user_email,
			invitation_link: invitation_URL
		};


		let emailRespond = await sendEmail.sendUserInvitation(dataBody);

		if ((emailRespond.rejected).length > 0) {
			throw new BadRequestException('Email sending error');
		}

		await session.commitTransaction();

		return {
			msg: 'Email sent to user'
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}

};

module.exports.viewUsers = async (requestBody) => {
	// eslint-disable-next-line no-useless-catch
	try {

		let users_array_list = [];

		let userList = await User.find({ role: requestBody.user_role});

		for (let index = 0; index < userList.length; index++) {
            
			let data = {
				user_id: userList[index]._id,
				user_name: userList[index].name_title + ' ' + userList[index].first_name + ' ' + userList[index].last_name,
				user_email: userList[index].email,
				user_image: userList[index].user_image,
				is_signup_completed: userList[index].is_signup_completed
			};

			users_array_list.push(data);
		}

		return {
			msg: 'User list generated',
			data: users_array_list
		};

	} catch (err) {
		throw err;
	}
};