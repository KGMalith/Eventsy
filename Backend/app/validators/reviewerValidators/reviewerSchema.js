const Joi = require('joi');

const schema = {
	getResearchPaperValidationSchema: Joi.object({
		user_id: Joi.string().trim().required(),
	}),
	approveResearchPaperValidationSchema: Joi.object({
		user_id: Joi.string().trim().required(),
	}),
	rejectResearchPaperValidationSchema: Joi.object({
		user_id: Joi.string().trim().required(),
	}),
	getWorkshopProposalValidationSchema: Joi.object({
		user_id: Joi.string().trim().required(),
	}),
	approveWorkshopProposalValidationSchema: Joi.object({
		user_id: Joi.string().trim().required(),
	}),
	rejectWorkshopProposalValidationSchema: Joi.object({
		user_id: Joi.string().trim().required(),
	}),
};

module.exports = schema;