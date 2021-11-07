const Joi = require('joi');

const schema = {
	getSingleTempConferenceValidationSchema: Joi.object({
		conference_id: Joi.string().trim().required(),
	}),
	getSingleConferenceValidationSchema: Joi.object({
		conference_id: Joi.string().trim().required(),
	}),
	approveConferenceValidationSchema: Joi.object({
		conference_id: Joi.string().trim().required(),
	}),
	rejectConferenceValidationSchema: Joi.object({
		conference_id: Joi.string().trim().required(),
	}),
	deleteConfereceValidationSchema: Joi.object({
		conference_id: Joi.string().trim().required(),
	}),
	getSingleTempSpeakerValidationSchema: Joi.object({
		speaker_id: Joi.string().trim().required(),
	}),
	approveSpeakerValidationSchema: Joi.object({
		speaker_id: Joi.string().trim().required(),
	}),
	rejectSpeakerValidationSchema: Joi.object({
		speaker_id: Joi.string().trim().required(),
	}),
	getSingleTempWorkshopValidationSchema: Joi.object({
		workshop_id: Joi.string().trim().required(),
	}),
	approveWorkshopValidationSchema: Joi.object({
		workshop_id: Joi.string().trim().required(),
	}),
	rejectWorkshopValidationSchema: Joi.object({
		workshop_id: Joi.string().trim().required(),
	}),
	getSingleTempPresentationValidationSchema: Joi.object({
		presentation_id: Joi.string().trim().required(),
	}),
	approvePresentationValidationSchema: Joi.object({
		presentation_id: Joi.string().trim().required(),
	}),
	rejectPresentationValidationSchema: Joi.object({
		presentation_id: Joi.string().trim().required(),
	}),
	addNewUsersValidationSchema: Joi.object({
		user_email: Joi.string().trim().email().required(),
		user_name_title: Joi.string().trim().required(),
		user_first_name: Joi.string().trim().required(),
		user_last_name: Joi.string().trim().required(),
		user_role: Joi.number().trim().required(),
	}),
	viewUsersValidationSchema: Joi.object({
		user_role: Joi.number().trim().required(),
	}),
};

module.exports = schema;