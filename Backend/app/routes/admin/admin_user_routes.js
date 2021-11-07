const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const { adminRoleValidation } = require('../../../auth/userrolevalidation');
const { emailValidation } = require('../../../auth/emailverification');
const {
	addNewUsersValidation,
	viewUsersValidation,
} = require('../../validators/adminValidators/adminValidation');
const adminUserController = require('../../controllers/admin/admin_user_controller');


router.post('/add-new-user',
	checkToken,
	emailValidation,
	adminRoleValidation,
	addNewUsersValidation,
	adminUserController.addNewUser
);

router.post('/view-users',
	checkToken,
	emailValidation,
	adminRoleValidation,
	viewUsersValidation,
	adminUserController.viewUsers
);

module.exports = router;