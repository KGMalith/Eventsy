const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const { emailValidation } = require('../../../auth/emailverification');
const { reviewerRoleValidation } = require('../../../auth/userrolevalidation');
const { getResearchPaperValidation, approveResearchPaperValidation, rejectResearchPaperValidation } = require('../../validators/reviewerValidators/reviewerValidation');
const reviewerController = require('../../controllers/reviewer/reviewer_research_controller');

router.get('/get-all-research-papers',
	checkToken,
	emailValidation,
	reviewerRoleValidation,
	reviewerController.getAllPendingResearchPaperSubmissions
);

router.post('/get-research-paper',
	checkToken,
	emailValidation,
	reviewerRoleValidation,
	getResearchPaperValidation,
	reviewerController.viewSingleResearchPaperSubmission
);

router.post('/approve-research-paper',
	checkToken,
	emailValidation,
	reviewerRoleValidation,
	approveResearchPaperValidation,
	reviewerController.approveResearchPaper
);

router.post('/reject-research-paper',
	checkToken,
	emailValidation,
	reviewerRoleValidation,
	rejectResearchPaperValidation,
	reviewerController.rejectResearchPaper
);

module.exports = router;
