const Joi = require('joi');

const schema = {
	submitMessage: Joi.object({
		contact_name: Joi.string().trim().required(),
		contact_email: Joi.string().trim().required(),
		contact_subject: Joi.string().trim().required(),
		conference_message: Joi.string().trim().required()
	}),
	updateProfile: Joi.object({
		user_image: Joi.string().trim(),
		mobile_number: Joi.number().required(),
		name_title: Joi.string().trim().required(),
		first_name: Joi.string().trim().required(),
		last_name: Joi.string().trim().required(),
		affliation: Joi.string().trim()
	}),
};

module.exports = schema;