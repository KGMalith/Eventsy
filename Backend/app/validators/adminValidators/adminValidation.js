const { 
	getSingleTempConferenceValidationSchema,
	getSingleConferenceValidationSchema,
	approveConferenceValidationSchema,
	rejectConferenceValidationSchema,
	deleteConfereceValidationSchema,
	getSingleTempSpeakerValidationSchema,
	rejectSpeakerValidationSchema,
	approveSpeakerValidationSchema,
	rejectWorkshopValidationSchema,
	approveWorkshopValidationSchema,
	getSingleTempWorkshopValidationSchema,
	rejectPresentationValidationSchema,
	approvePresentationValidationSchema,
	getSingleTempPresentationValidationSchema,
	addNewUsersValidationSchema,
	viewUsersValidationSchema
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
	getTempSpeakerValidation: async (req, res, next) => {
		const respond = await getSingleTempSpeakerValidationSchema.validate(req.body);
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
	approveSpeakerValidation: async (req, res, next) => {
		const respond = await approveSpeakerValidationSchema.validate(req.body);
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
	rejectSpeakerValidation: async (req, res, next) => {
		const respond = await rejectSpeakerValidationSchema.validate(req.body);
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
	getTempWorkshopValidation: async (req, res, next) => {
		const respond = await getSingleTempWorkshopValidationSchema.validate(req.body);
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
	approveWorkshopValidation: async (req, res, next) => {
		const respond = await approveWorkshopValidationSchema.validate(req.body);
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
	rejectWorkshopValidation: async (req, res, next) => {
		const respond = await rejectWorkshopValidationSchema.validate(req.body);
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
	getTempPresentationValidation: async (req, res, next) => {
		const respond = await getSingleTempPresentationValidationSchema.validate(req.body);
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
	approvePresentationValidation: async (req, res, next) => {
		const respond = await approvePresentationValidationSchema.validate(req.body);
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
	rejectPresentationValidation: async (req, res, next) => {
		const respond = await rejectPresentationValidationSchema.validate(req.body);
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
	addNewUsersValidation: async (req, res, next) => {
		const respond = await addNewUsersValidationSchema.validate(req.body);
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
	viewUsersValidation: async (req, res, next) => {
		const respond = await viewUsersValidationSchema.validate(req.body);
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