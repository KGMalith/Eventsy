const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const { adminRoleValidation } = require('../../../auth/userrolevalidation');
const { emailValidation } = require('../../../auth/emailverification');
const {
	approveConferenceValidation,
	deleteConferenceValidation,
	getConferenceValidation,
	getTempConferenceValidation,
	rejectConferenceValidation
} = require('../../validators/adminValidators/adminValidation');
const adminConferenceController = require('../../controllers/admin/admin_conference_controller');


router.get('/get-all-requested-confereces',
	checkToken,
	emailValidation,
	adminRoleValidation,
	adminConferenceController.getAllRequestedConferences
);

router.get('/get-all-confereces',
	checkToken,
	emailValidation,
	adminRoleValidation,
	adminConferenceController.getAllConferences
);

router.post('/get-requested-conferece',
	checkToken,
	emailValidation,
	adminRoleValidation,
	getConferenceValidation,
	adminConferenceController.getRequestedConference
);

router.post('/get-conferece',
	checkToken,
	emailValidation,
	adminRoleValidation,
	getTempConferenceValidation,
	adminConferenceController.getConference
);

router.post('/approve-requested-conferece',
	checkToken,
	emailValidation,
	adminRoleValidation,
	approveConferenceValidation,
	adminConferenceController.approveConference
);

router.post('/reject-requested-conferece',
	checkToken,
	emailValidation,
	adminRoleValidation,
	rejectConferenceValidation,
	adminConferenceController.rejectConference
);

// router.post('/delete-conferece',
// 	checkToken,
// 	emailValidation,
// 	adminRoleValidation,                                //This route should delete all details related to conference. 
// 	deleteConferenceValidation,
// 	adminConferenceController.deleteConference
// );


module.exports = router;