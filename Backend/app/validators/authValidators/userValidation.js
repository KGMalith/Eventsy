const {userSignupValidationSchema,userSigninValidationSchema,validateEmailSchema, forgotPasswordValidationSchema, resendTokenValidationSchema, resetPasswordValidationSchema}  = require('./userSchema');

module.exports = {
	userSignupValidation:async(req,res,next) =>{
		const respond = await userSignupValidationSchema.validate(req.body);
		if(respond.error){
			res.status(500).json({
				success: false,
				msg: respond.error.details[0].message,
				showMessage: true
			});
		}else{
			next();
		}
	},
	validateEmailValidation: async (req, res, next) => {
		const respond = await validateEmailSchema.validate(req.body);
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
	userSigninValidation: async (req, res, next) => {
		const respond = await userSigninValidationSchema.validate(req.body);
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
	forgotPasswordValidation: async (req, res, next) => {
		const respond = await forgotPasswordValidationSchema.validate(req.body);
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
	resendTokenValidation: async (req, res, next) => {
		const respond = await resendTokenValidationSchema.validate(req.body);
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
	resetPasswordValidation: async (req, res, next) => {
		const respond = await resetPasswordValidationSchema.validate(req.body);
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