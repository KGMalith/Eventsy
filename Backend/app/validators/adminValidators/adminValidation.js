const { 
	getSingleTempConferenceValidationSchema,
	getSingleConferenceValidationSchema,
	approveConferenceValidationSchema,
	rejectConferenceValidationSchema,
	deleteConfereceValidationSchema
} = require('./adminSchema');


module.exports = {
	approveConferenceValidation: async (req, res, next) => {
		const respond = await approveConferenceValidationSchema.validate(req.body);
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
	rejectConferenceValidation: async (req, res, next) => {
		const respond = await rejectConferenceValidationSchema.validate(req.body);
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
	getTempConferenceValidation: async (req, res, next) => {
		const respond = await getSingleTempConferenceValidationSchema.validate(req.body);
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
	getConferenceValidation: async (req, res, next) => {
		const respond = await getSingleConferenceValidationSchema.validate(req.body);
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
	deleteConferenceValidation: async (req, res, next) => {
		const respond = await deleteConfereceValidationSchema.validate(req.body);
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