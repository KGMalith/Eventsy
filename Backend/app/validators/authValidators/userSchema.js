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
};

module.exports = schema;