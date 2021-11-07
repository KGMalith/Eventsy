const router = require('express').Router();
const { checkToken } = require('../../../auth/tokenvalidation');
const { paymentRoleValidation } = require('../../../auth/userrolevalidation');
const { emailValidation } = require('../../../auth/emailverification');

const paymentController = require('../../controllers/payment/payment_controllers');

router.get('/init-payment',
	checkToken,
	emailValidation,
	paymentRoleValidation,
	paymentController.initPayment
);

router.get('/mark-payment-status',
	paymentController.markPaymentStatus
);

module.exports = router;