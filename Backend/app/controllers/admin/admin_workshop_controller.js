const adminWorkshopService = require('../../service/admin/admin_workshop_service');

module.exports.getAllRequestedWorkshops = async (req, res) => {
	try {
		const serviceResponse = await adminWorkshopService.getAllRequestedWorkshops();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getRequestedWorkshop = async (req, res) => {
	try {
		const serviceResponse = await adminWorkshopService.getRequestedWorkshop(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.approveRequestedWorkshop = async (req, res) => {
	try {
		const serviceResponse = await adminWorkshopService.approveRequestedWorkshop(req.user, req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.rejectRequestedWorkshop = async (req, res) => {
	try {
		const serviceResponse = await adminWorkshopService.rejectRequestedWorkshop(req.user, req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};