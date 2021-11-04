const { verify } = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
	checkToken: (req, res, next) => {
		let token = req.get('authorization');
		if (token) {
			token = token.slice(7);
			verify(token, config.JWT.secret, (err, decoded) => {
				if (err) {
					res.status(400).json({
						success: false,
						msg: 'Invalid Access Token',
						showMessage: true
					});
				} else {
					let requestUser = {
						isEmailActive: decoded.result.email_verified,
						userEmail:decoded.result.user_email,
						userRole: decoded.result.user_role,
						userID: decoded.result.user_id
					};
					req.user = requestUser;
					next();
				}
			});
		} else {
			res.status(403).json({
				success: false,
				message: 'Access Denied!',
				showMessage: true
			});
		}
	}
};