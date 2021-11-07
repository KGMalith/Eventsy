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
};

module.exports = schema;