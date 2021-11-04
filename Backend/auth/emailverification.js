module.exports = {
	emailValidation: (req, res, next) => {
		if (req.user.isEmailActive === false) {
			res.status(355).json({
				success: false,
				msg: 'Email not verified',
				data: req.user.userEmail,
				showMessage: false
			});
		} else {
			next();
		}
	},
};