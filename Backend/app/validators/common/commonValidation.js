const { 
	submitMessage,
	updateProfile
} = require('./commonSchema');


module.exports = {
	submitMessageValidation: async (req, res, next) => {
		const respond = await submitMessage.validate(req.body);
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
	updateProfileValidation: async (req, res, next) => {
		const respond = await updateProfile.validate(req.body);
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