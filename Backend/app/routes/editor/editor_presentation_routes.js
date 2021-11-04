const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const {
	addPresentationValidation,
	editPresentationValidation,
	editTempPresentationValidation,
	getPresentationValidation,
	getTempPresentationValidation,
	getEventPendingResearchPaperValidation,
} = require('../../validators/editorValidators/editorValidation');
const { editorRoleValidation } = require('../../../auth/userrolevalidation');
const { emailValidation } = require('../../../auth/emailverification');
const editorPresentationController = require('../../controllers/editor/editor_presentation_controllers');

router.get('/get-event-pending-research-papers',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editorPresentationController.getEventPendingResearchPapers
);

router.post('/get-event-pending-research-paper',
	checkToken,
	emailValidation,
	editorRoleValidation,
	getEventPendingResearchPaperValidation,
	editorPresentationController.getEventPendingResearchPaper
);

router.post('/create-presentation',
	checkToken,
	emailValidation,
	editorRoleValidation,
	addPresentationValidation,
	editorPresentationController.createPresentation
);

router.post('/edit-presentation',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editPresentationValidation,
	editorPresentationController.editPresentation
);

router.post('/edit-temp-presentation',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editTempPresentationValidation,
	editorPresentationController.editTempPresentation
);

router.get('/get-all-presentations',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editorPresentationController.getAllPresentations
);

router.get('/get-all-temp-presentations',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editorPresentationController.getAllTempPresentations
);

router.post('/get-single-temp-presentation',
	checkToken,
	emailValidation,
	editorRoleValidation,
	getTempPresentationValidation,
	editorPresentationController.getSingleTempPresentation
);

router.post('/get-single-presentation',
	checkToken,
	emailValidation,
	editorRoleValidation,
	getPresentationValidation,
	editorPresentationController.getSinglePresentation
);

module.exports = router;