const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const { adminRoleValidation } = require('../../../auth/userrolevalidation');
const { emailValidation } = require('../../../auth/emailverification');
const {
	getTempWorkshopValidation,
	approveWorkshopValidation,
	rejectWorkshopValidation
} = require('../../validators/adminValidators/adminValidation');
const adminWorkshopController = require('../../controllers/admin/admin_workshop_controller');

router.get('/get-all-requested-workshops',
	checkToken,
	emailValidation,
	adminRoleValidation,
	adminWorkshopController.getAllRequestedWorkshops
);

router.post('/get-requested-workshop',
	checkToken,
	emailValidation,
	adminRoleValidation,
	getTempWorkshopValidation,
	adminWorkshopController.getRequestedWorkshop
);

router.post('/accept-requested-workshop',
	checkToken,
	emailValidation,
	adminRoleValidation,
	approveWorkshopValidation,
	adminWorkshopController.approveRequestedWorkshop
);

router.post('/reject-requested-workshop',
	checkToken,
	emailValidation,
	adminRoleValidation,
	rejectWorkshopValidation,
	adminWorkshopController.rejectRequestedWorkshop
);

module.exports = router;