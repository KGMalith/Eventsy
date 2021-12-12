const editorWorkshopService = require('../../service/editor/editor_workshop_services');

module.exports.getEventPendingWorkshopProposals = async (req, res) => {
	try {
		const serviceResponse = await editorWorkshopService.getEventPendingWorkshopProposals();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getEventPendingWorkshopProposal = async (req, res) => {
	try {
		const serviceResponse = await editorWorkshopService.getEventPendingWorkshopProposal(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.createWorkShop = async (req, res) => {
	try {
		const serviceResponse = await editorWorkshopService.createWorkShop(req.user, req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.editWorkShop = async (req, res) => {
	try {
		const serviceResponse = await editorWorkshopService.editWorkShop(req.user, req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};


module.exports.editTempWorkShop = async (req, res) => {
	try {
		const serviceResponse = await editorWorkshopService.editTempWorkShop(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getAllWorkshops = async (req, res) => {
	try {
		const serviceResponse = await editorWorkshopService.getAllWorkshops();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getAllTempWorkshops = async (req, res) => {
	try {
		const serviceResponse = await editorWorkshopService.getAllTempWorkshops();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};


module.exports.getTempWorkshop = async (req, res) => {
	try {
		const serviceResponse = await editorWorkshopService.getTempWorkshop(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getWorkshop = async (req, res) => {
	try {
		const serviceResponse = await editorWorkshopService.getWorkshop(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getWorkshopsList = async (req, res) => {
	try {
		const serviceResponse = await editorWorkshopService.getWorkshopsList();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getAllRequestedWorkshopConductors = async (req, res) => {
	try {
		const serviceResponse = await editorWorkshopService.getAllRequestedWorkshopConductors();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};
