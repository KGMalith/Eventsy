const authService = require('../../service/auth/authService');

module.exports.userSignUp = async (req, res) => {
	try {
		const serviceResponse = await authService.userSignup(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
	}
};

module.exports.validateEmail = async (req, res) => {
	try {
		const serviceResponse = await authService.validateEmail(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
	}
};

module.exports.userSignIn = async (req, res) => {
	try {
		const serviceResponse = await authService.userSignin(req.body);
		if (serviceResponse.signup_not_completed){
			return res.status(355).json({ success: false, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
		}
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
	}
};

module.exports.forgotPassword = async (req, res) => {
	try {
		const serviceResponse = await authService.forgotPassword(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
	}
};

module.exports.resendToken = async (req, res) => {
	try {
		const serviceResponse = await authService.resendToken(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
	}
};
