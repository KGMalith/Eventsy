const router = require('express').Router();
const { userSignupValidation,userSigninValidation,validateEmailValidation, forgotPasswordValidation } = require('../../validators/authValidators/userValidation');
const userController = require('../../controllers/auth/authController');

router.post('/signup',
	userSignupValidation,
	userController.userSignUp
);

router.post('/validate-email',
	validateEmailValidation,
	userController.validateEmail
);

router.post('/signin',
	userSigninValidation,
	userController.userSignIn
);

router.post('/forgot-password',
	forgotPasswordValidation,
	userController.forgotPassword
);

module.exports = router;
