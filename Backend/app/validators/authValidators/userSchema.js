const Joi = require('joi');

const schema = {
	userSignupValidationSchema: Joi.object({
		user_email: Joi.string().email().trim().required(),
		password: Joi.string().trim().required(),
		mobile_number: Joi.string().trim().required(),
		name_title:Joi.string().trim().required(),
		first_name: Joi.string().max(100).trim().required(),
		last_name: Joi.string().max(100).trim().required(),
		affliation: Joi.string().trim().when('role',{is:1,then:Joi.required(),otherwise:Joi.optional()}),
		role: Joi.number().required(),
		file_url: Joi.string().trim().when('role', { is: (1||2), then: Joi.required(), otherwise: Joi.optional() }),
	}),
	invitedUserSignupValidationSchema: Joi.object({
		password: Joi.string().trim().required(),
		user_id: Joi.string().trim().required()
	}),
	invitedUserValidationSchema: Joi.object({
		user_id: Joi.string().trim().required()
	}),
	validateEmailSchema: Joi.object({
		user_email: Joi.string().email().trim().required(),
		verification_code: Joi.number().required()
	}),
	userSigninValidationSchema: Joi.object({
		user_email: Joi.string().email().trim().required(),
		password: Joi.string().trim().required()
	}),
	forgotPasswordValidationSchema: Joi.object({
		user_email: Joi.string().email().trim().required()
	}),
	resendTokenValidationSchema: Joi.object({
		user_email: Joi.string().email().trim().required()
	}),
	resetPasswordValidationSchema: Joi.object({
		verification_code: Joi.number().required(),
		user_email: Joi.string().email().trim().required(),
		new_password: Joi.string().trim().required()
	}),
};

module.exports = schema;