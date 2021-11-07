const paymentService = require('../../service/payment/payment_service');

module.exports.initPayment = async (req, res) => {
	try {
		const serviceResponse = await paymentService.initPayment(req.user);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.markPaymentStatus = async (req, res) => {
	try {
		const serviceResponse = await paymentService.markPaymentStatus(req.user);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};