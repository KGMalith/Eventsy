const authService = require('../../service/auth/authService');

module.exports.userSignUp = async (req, res) => {
	try {
		const serviceResponse = await authService.userSignup(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
	}
};
