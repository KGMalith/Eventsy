const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const { researcherRoleValidation } = require('../../../auth/userrolevalidation');
const { emailValidation } = require('../../../auth/emailverification');

const researcherController = require('../../controllers/researcher/researcher_controller');

router.get('/get-research-presentation-details',
	checkToken,
	emailValidation,
	researcherRoleValidation,
	researcherController.getResearchPresentationDetails
);

module.exports = router;