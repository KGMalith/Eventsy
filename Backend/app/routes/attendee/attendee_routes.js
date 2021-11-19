const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const { normalUserRoleValidation } = require('../../../auth/userrolevalidation');
const { emailValidation } = require('../../../auth/emailverification');

const attendeeController = require('../../controllers/attendee/attendee_controller');

router.get('/get-conference-details',
	checkToken,
	emailValidation,
	normalUserRoleValidation,
	attendeeController.getConferenceDetails
);

module.exports = router;