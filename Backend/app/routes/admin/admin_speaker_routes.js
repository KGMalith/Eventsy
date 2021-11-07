const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const { adminRoleValidation } = require('../../../auth/userrolevalidation');
const { emailValidation } = require('../../../auth/emailverification');
const {
	getTempSpeakerValidation,
	approveSpeakerValidation,
	rejectSpeakerValidation
} = require('../../validators/adminValidators/adminValidation');
const adminSpeakerController = require('../../controllers/admin/admin_speaker_controller');


router.get('/get-all-requested-speakers',
	checkToken,
	emailValidation,
	adminRoleValidation,
	adminSpeakerController.getAllRequestedSpeakers
);

router.post('/get-requested-speaker',
	checkToken,
	emailValidation,
	adminRoleValidation,
	getTempSpeakerValidation,
	adminSpeakerController.getRequestedSpeaker
);

router.post('/accept-requested-speaker',
	checkToken,
	emailValidation,
	adminRoleValidation,
	approveSpeakerValidation,
	adminSpeakerController.approveRequestedSpeaker
);

router.post('/reject-requested-speaker',
	checkToken,
	emailValidation,
	adminRoleValidation,
	rejectSpeakerValidation,
	adminSpeakerController.rejectRequestedSpeaker
);


module.exports = router;