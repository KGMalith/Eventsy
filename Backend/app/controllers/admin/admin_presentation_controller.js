const adminPresentationService = require('../../service/admin/admin_presentation_service');

module.exports.getAllRequestedPresentations = async (req, res) => {
	try {
		const serviceResponse = await adminPresentationService.getAllRequestedPresentations();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getRequestedPresentation = async (req, res) => {
	try {
		const serviceResponse = await adminPresentationService.getRequestedPresentation(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.approveRequestedPresentation = async (req, res) => {
	try {
		const serviceResponse = await adminPresentationService.approveRequestedPresentation(req.user, req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.rejectRequestedPresentation = async (req, res) => {
	try {
		const serviceResponse = await adminPresentationService.rejectRequestedPresentation(req.user, req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};