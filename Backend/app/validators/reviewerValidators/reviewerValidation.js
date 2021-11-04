const { 
	getResearchPaperValidationSchema, approveResearchPaperValidationSchema, rejectResearchPaperValidationSchema, getWorkshopProposalValidationSchema, approveWorkshopProposalValidationSchema, rejectWorkshopProposalValidationSchema
} = require('./reviewerSchema');


module.exports = {
	getResearchPaperValidation: async (req, res, next) => {
		const respond = await getResearchPaperValidationSchema.validate(req.body);
		if (respond.error) {
			res.status(500).json({
				success: false,
				msg: respond.error.details[0].message,
				showMessage: true
			});
		} else {
			next();
		}
	},
	approveResearchPaperValidation: async (req, res, next) => {
		const respond = await approveResearchPaperValidationSchema.validate(req.body);
		if (respond.error) {
			res.status(500).json({
				success: false,
				msg: respond.error.details[0].message,
				showMessage: true
			});
		} else {
			next();
		}
	},
	rejectResearchPaperValidation: async (req, res, next) => {
		const respond = await rejectResearchPaperValidationSchema.validate(req.body);
		if (respond.error) {
			res.status(500).json({
				success: false,
				msg: respond.error.details[0].message,
				showMessage: true
			});
		} else {
			next();
		}
	},
	getWorkshopProposalValidation: async (req, res, next) => {
		const respond = await getWorkshopProposalValidationSchema.validate(req.body);
		if (respond.error) {
			res.status(500).json({
				success: false,
				msg: respond.error.details[0].message,
				showMessage: true
			});
		} else {
			next();
		}
	},
	approveWorkshopProposalValidation: async (req, res, next) => {
		const respond = await approveWorkshopProposalValidationSchema.validate(req.body);
		if (respond.error) {
			res.status(500).json({
				success: false,
				msg: respond.error.details[0].message,
				showMessage: true
			});
		} else {
			next();
		}
	},
	rejectWorkshopProposalValidation: async (req, res, next) => {
		const respond = await rejectWorkshopProposalValidationSchema.validate(req.body);
		if (respond.error) {
			res.status(500).json({
				success: false,
				msg: respond.error.details[0].message,
				showMessage: true
			});
		} else {
			next();
		}
	},
};