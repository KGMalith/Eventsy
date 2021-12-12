module.exports = {
	normalUserRoleValidation:(req, res, next) => {
		if (req.user.userRole !== 0) {
			res.status(401).json({
				success: false,
				msg: 'Unauthorized action',
				showMessage: true
			});
		} else {
			next();
		}
	},
	researcherRoleValidation:(req, res, next) => {
		if (req.user.userRole !== 1) {
			res.status(401).json({
				success: false,
				msg: 'Unauthorized action',
				showMessage: true
			});
		} else {
			next();
		}
	},
	workshopConductorRoleValidation:(req, res, next) => {
		if (req.user.userRole !== 2) {
			res.status(401).json({
				success: false,
				msg: 'Unauthorized action',
				showMessage: true
			});
		} else {
			next();
		}
	},
	reviewerRoleValidation:(req, res, next) => {
		if (req.user.userRole !== 3) {
			res.status(401).json({
				success: false,
				msg: 'Unauthorized action',
				showMessage: true
			});
		} else {
			next();
		}
	},
	editorRoleValidation:(req, res, next) => {
		if (req.user.userRole !== 4) {
			res.status(401).json({
				success: false,
				msg: 'Unauthorized action',
				showMessage: true
			});
		} else {
			next();
		}
	},
	adminRoleValidation:(req, res, next) => {
		if (req.user.userRole !== 5) {
			res.status(401).json({
				success: false,
				msg: 'Unauthorized action',
				showMessage: true
			});
		} else {
			next();
		}
	},
	paymentRoleValidation: (req, res, next) => {
		if (req.user.userRole !== 1 && req.user.userRole !== 2 && req.user.userRole !== 3) {
			res.status(401).json({
				success: false,
				msg: 'Unauthorized action',
				showMessage: true
			});
		} else {
			next();
		}
	},
};