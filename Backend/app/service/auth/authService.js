let mongoose = require('mongoose');

// DB Schema files
let User = require('../../schema/user');
let VerificationToken = require('../../schema/verificationTokenSchema');
let Speaker = require('../../schema/speakers');

// Other required files
let randomstring = require('randomstring');
const { hashSync, genSaltSync } = require('bcrypt');

//functions
let sendEmail = require('../../functions/email/emailTemplates');

// Error Class files
const BadRequestException = require('./../../util/exceptions/badRequestException');
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
			affliation: requestBody.role === 1 && requestBody.affiliation,
			role: requestBody.role,
			media_file_details:{
				media_file: media_file_url,
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

		await sendEmail.sendVerificationToken(dataBody);

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

