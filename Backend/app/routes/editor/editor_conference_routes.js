const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const {
	addConferenceValidation,
	editConferenceValidation,
	editTempConferenceValidation,
	getConferenceValidation,
	getTempConferenceValidation,
	getConferencePreviewValidation,
	getTempConferencePreviewValidation
} = require('../../validators/editorValidators/editorValidation');
const { editorRoleValidation } = require('../../../auth/userrolevalidation');
const {emailValidation} = require('../../../auth/emailverification');
const editorConferenceController = require('../../controllers/editor/editor_conference_controllers');



router.post('/create-conference',
	checkToken,
	emailValidation,
	editorRoleValidation,
	addConferenceValidation,
	editorConferenceController.createConference
);

router.post('/edit-conference',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editConferenceValidation,
	editorConferenceController.editConference
);

router.post('/edit-temp-conference',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editTempConferenceValidation,
	editorConferenceController.editTempConference
);

router.get('/get-all-conferences',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editorConferenceController.getAllConferences
);

router.get('/get-all-temp-conferences',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editorConferenceController.getAllTempConferences
);

router.post('/get-single-temp-conference',
	checkToken,
	emailValidation,
	editorRoleValidation,
	getTempConferenceValidation,
	editorConferenceController.getSingleTempConference
);

router.post('/get-single-conference',
	checkToken,
	emailValidation,
	editorRoleValidation,
	getConferenceValidation,
	editorConferenceController.getSingleConference
);

router.post('/get-single-conference-preview',
	checkToken,
	emailValidation,
	editorRoleValidation,
	getConferencePreviewValidation,
	editorConferenceController.getSingleConferenceForPreview
);

router.post('/get-single-temp-conference-preview',
	checkToken,
	emailValidation,
	editorRoleValidation,
	getTempConferencePreviewValidation,
	editorConferenceController.getSingleTempConferenceForPreview
);

module.exports = router;