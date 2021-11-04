const router = require('express').Router();
const { userSignupValidation,userSigninValidation,validateEmailValidation, forgotPasswordValidation, resendTokenValidation, resetPasswordValidation } = require('../../validators/authValidators/userValidation');
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

router.post('/resend-token',
	resendTokenValidation,
	userController.resendToken
);

router.post('/reset-password',
	resetPasswordValidation,
	userController.resetPassword
);

module.exports = router;
