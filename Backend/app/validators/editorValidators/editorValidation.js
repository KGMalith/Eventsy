const { 
	generate_conference_image_urls,
	generate_location_image_urls, 
	generate_speaker_image_urls,
	addSpeakerValidationSchema,
	editTempSpeakerValidationSchema,
	editSpeakerValidationSchema,
	addConferenceValidationSchema,
	editTempConferenceValidationSchema,
	editConferenceValidationSchema,
	editTempWorkshopValidationSchema,
	editWorkshopValidationSchema,
	addWorkshopValidationSchema,
	editPresentationValidationSchema,
	addPresentationValidationSchema,
	editTempPresentationValidationSchema,
	getSingleTempSpeakerValidationSchema,
	getSingleSpeakerValidationSchema,
	getSinglePresentationValidationSchema,
	getSingleTempPresentationValidationSchema,
	getSingleTempWorkshopValidationSchema,
	getSingleWorkshopValidationSchema,
	getSingleTempConferenceValidationSchema,
	getSingleConferenceValidationSchema,
	getSingleTempConferencePreviewValidationSchema,
	getSingleConferencePreviewValidationSchema,
	getEventPendingResearchPaperValidationSchema,
} = require('./editorSchema');


module.exports = {
	addConferenceValidation: async (req, res, next) => {
		const respond = await addConferenceValidationSchema.validate(req.body);
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
	editConferenceValidation: async (req, res, next) => {
		const respond = await editConferenceValidationSchema.validate(req.body);
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
	editTempConferenceValidation: async (req, res, next) => {
		const respond = await editTempConferenceValidationSchema.validate(req.body);
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
	generateConferenceImageUrlsValidation: async (req, res, next) => {
		const respond = await generate_conference_image_urls.validate(req.body);
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
	generateLocationImageUrlsValidation: async (req, res, next) => {
		const respond = await generate_location_image_urls.validate(req.body);
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
	addSpeakerValidation: async (req, res, next) => {
		const respond = await addSpeakerValidationSchema.validate(req.body);
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
	editSpeakerValidation: async (req, res, next) => {
		const respond = await editSpeakerValidationSchema.validate(req.body);
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
	editTempSpeakerValidation: async (req, res, next) => {
		const respond = await editTempSpeakerValidationSchema.validate(req.body);
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
	generateSpeakerImageUrlsValidation: async (req, res, next) => {
		const respond = await generate_speaker_image_urls.validate(req.body);
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
	addWorkshopValidation: async (req, res, next) => {
		const respond = await addWorkshopValidationSchema.validate(req.body);
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
	editWorkshopValidation: async (req, res, next) => {
		const respond = await editWorkshopValidationSchema.validate(req.body);
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
	editTempWorkshopValidation: async (req, res, next) => {
		const respond = await editTempWorkshopValidationSchema.validate(req.body);
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
	getEventPendingResearchPaperValidation: async (req, res, next) => {
		const respond = await getEventPendingResearchPaperValidationSchema.validate(req.body);
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
	addPresentationValidation: async (req, res, next) => {
		const respond = await addPresentationValidationSchema.validate(req.body);
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
	editPresentationValidation: async (req, res, next) => {
		const respond = await editPresentationValidationSchema.validate(req.body);
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
	editTempPresentationValidation: async (req, res, next) => {
		const respond = await editTempPresentationValidationSchema.validate(req.body);
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
	getSpeakerValidation: async (req, res, next) => {
		const respond = await getSingleSpeakerValidationSchema.validate(req.body);
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
	getPresentationValidation: async (req, res, next) => {
		const respond = await getSinglePresentationValidationSchema.validate(req.body);
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
	getWorkshopValidation: async (req, res, next) => {
		const respond = await getSingleWorkshopValidationSchema.validate(req.body);
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
	getConferencePreviewValidation: async (req, res, next) => {
		const respond = await getSingleConferencePreviewValidationSchema.validate(req.body);
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
	getTempConferencePreviewValidation: async (req, res, next) => {
		const respond = await getSingleTempConferencePreviewValidationSchema.validate(req.body);
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