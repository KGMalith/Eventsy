const router = require('express').Router();
const commonController = require('../../controllers/common/common_controller');
const { checkToken } = require('../../../auth/tokenvalidation');
const { submitMessageValidation, updateProfileValidation } = require('../../validators/common/commonValidation');

router.get('/load-main-page',
	commonController.generateMainPageData
);

router.post('/submit-message',
	submitMessageValidation,
	commonController.submitContactMessage
);

router.get('/downloads',
	commonController.downloads
);

router.get('/research-paper-presentations',
	commonController.researchPaperPresentations
);

router.get('/workshops',
	commonController.workshops
);

router.get('/get-user',
	checkToken,
	commonController.generateUserData
);

router.post('/update-user',
	checkToken,
	updateProfileValidation,
	commonController.updateUserData
);

module.exports = router;