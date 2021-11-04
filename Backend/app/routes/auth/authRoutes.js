const router = require('express').Router();
const { userSignupValidation } = require('../../validators/authValidators/userValidation');
const userController = require('../../controllers/auth/authController');

router.post('/signup',
	userSignupValidation,
	userController.userSignUp
);

module.exports = router;
