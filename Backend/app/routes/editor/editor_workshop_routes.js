const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const {
	addWorkshopValidation,
	editWorkshopValidation,
	editTempWorkshopValidation,
	getTempWorkshopValidation,
	getWorkshopValidation,
	getEventPendingWorkshopProposalValidation,
} = require('../../validators/editorValidators/editorValidation');
const { editorRoleValidation } = require('../../../auth/userrolevalidation');
const { emailValidation } = require('../../../auth/emailverification');
const editorWorkshopController = require('../../controllers/editor/editor_workshop_controllers');

router.get('/get-event-pending-workshop-proposals',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editorWorkshopController.getEventPendingWorkshopProposals
);

router.post('/get-event-pending-workshop-proposal',
	checkToken,
	emailValidation,
	editorRoleValidation,
	getEventPendingWorkshopProposalValidation,
	editorWorkshopController.getEventPendingWorkshopProposal
);

router.post('/create-workshop',
	checkToken,
	emailValidation,
	editorRoleValidation,
	addWorkshopValidation,
	editorWorkshopController.createWorkShop
);

router.post('/edit-workshop',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editWorkshopValidation,
	editorWorkshopController.editWorkShop
);

router.post('/edit-temp-workshop',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editTempWorkshopValidation,
	editorWorkshopController.editTempWorkShop
);

router.get('/get-all-workshops',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editorWorkshopController.getAllWorkshops
);

router.get('/get-all-temp-workshops',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editorWorkshopController.getAllTempWorkshops
);

router.post('/get-single-temp-workshop',
	checkToken,
	emailValidation,
	editorRoleValidation,
	getTempWorkshopValidation,
	editorWorkshopController.getTempWorkshop
);

router.post('/get-single-workshop',
	checkToken,
	emailValidation,
	editorRoleValidation,
	getWorkshopValidation,
	editorWorkshopController.getWorkshop
);

router.get('/get-all-workshops-list',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editorWorkshopController.getWorkshopsList
);

router.get('/get-all-requested-workshop-conductors',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editorWorkshopController.getAllRequestedWorkshopConductors
);

module.exports = router;
