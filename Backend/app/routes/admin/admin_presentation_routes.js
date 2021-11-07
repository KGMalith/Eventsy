const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const { adminRoleValidation } = require('../../../auth/userrolevalidation');
const { emailValidation } = require('../../../auth/emailverification');
const {
	getTempPresentationValidation,
	approvePresentationValidation,
	rejectPresentationValidation
} = require('../../validators/adminValidators/adminValidation');
const adminPresentationController = require('../../controllers/admin/admin_presentation_controller');


router.get('/get-all-requested-presentations',
	checkToken,
	emailValidation,
	adminRoleValidation,
	adminPresentationController.getAllRequestedPresentations
);

router.post('/get-requested-presentation',
	checkToken,
	emailValidation,
	adminRoleValidation,
	getTempPresentationValidation,
	adminPresentationController.getRequestedPresentation
);

router.post('/accept-requested-presentation',
	checkToken,
	emailValidation,
	adminRoleValidation,
	approvePresentationValidation,
	adminPresentationController.approveRequestedPresentation
);

router.post('/reject-requested-presentation',
	checkToken,
	emailValidation,
	adminRoleValidation,
	rejectPresentationValidation,
	adminPresentationController.rejectRequestedPresentation
);


module.exports = router;