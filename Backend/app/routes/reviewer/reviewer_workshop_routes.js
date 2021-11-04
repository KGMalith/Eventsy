const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const { emailValidation } = require('../../../auth/emailverification');
const { reviewerRoleValidation } = require('../../../auth/userrolevalidation');
const { getWorkshopProposalValidation, approveWorkshopProposalValidation, rejectWorkshopProposalValidation } = require('../../validators/reviewerValidators/reviewerValidation');
const reviewerController = require('../../controllers/reviewer/reviewer_workshop_controller');

router.get('/get-all-workshop-proposals',
	checkToken,
	emailValidation,
	reviewerRoleValidation,
	reviewerController.getAllWorkshopProposalSubmissions
);

router.post('/get-workshop-proposal',
	checkToken,
	emailValidation,
	reviewerRoleValidation,
	getWorkshopProposalValidation,
	reviewerController.viewSingleWorkshopProposalSubmission
);

router.post('/approve-workshop-proposal',
	checkToken,
	emailValidation,
	reviewerRoleValidation,
	approveWorkshopProposalValidation,
	reviewerController.approveWorkshopProposal
);

router.post('/reject-workshop-proposal',
	checkToken,
	emailValidation,
	reviewerRoleValidation,
	rejectWorkshopProposalValidation,
	reviewerController.rejectWorkshopProposal
);

module.exports = router;
