const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const { workshopConductorRoleValidation } = require('../../../auth/userrolevalidation');
const { emailValidation } = require('../../../auth/emailverification');

const workshopConductorController = require('../../controllers/workshopConductors/workshop_conductor_controller');

router.get('/get-workshop-details',
	checkToken,
	emailValidation,
	workshopConductorRoleValidation,
	workshopConductorController.getWorkshopDetails
);

module.exports = router;