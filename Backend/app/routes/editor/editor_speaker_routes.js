const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const {
	addSpeakerValidation,
	editSpeakerValidation,
	editTempSpeakerValidation,
	getSpeakerValidation,
	getTempSpeakerValidation
} = require('../../validators/editorValidators/editorValidation');
const { editorRoleValidation } = require('../../../auth/userrolevalidation');
const { emailValidation } = require('../../../auth/emailverification');
const editorSpeakerController = require('../../controllers/editor/editor_speaker_controllers');

router.post('/create-speaker',
	checkToken,
	emailValidation,
	editorRoleValidation,
	addSpeakerValidation,
	editorSpeakerController.createSpeaker
);

router.post('/edit-speaker',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editSpeakerValidation,
	editorSpeakerController.editSpeaker
);

router.post('/edit-temp-speaker',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editTempSpeakerValidation,
	editorSpeakerController.editTemporarySpeaker
);

router.get('/get-all-speakers',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editorSpeakerController.getAllSpeakers
);

router.get('/get-all-temp-speakers',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editorSpeakerController.getAllTemporarySpeakers
);

router.post('/get-single-temp-speaker',
	checkToken,
	emailValidation,
	editorRoleValidation,
	getTempSpeakerValidation,
	editorSpeakerController.getSingleTemporarySpeaker
);

router.post('/get-single-speaker',
	checkToken,
	emailValidation,
	editorRoleValidation,
	getSpeakerValidation,
	editorSpeakerController.getSingleSpeaker
);

router.get('/get-all-speakers-list',
	checkToken,
	emailValidation,
	editorRoleValidation,
	editorSpeakerController.getAllSpeakersList
);

module.exports = router;