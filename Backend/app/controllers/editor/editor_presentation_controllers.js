const editorPresentationService = require('../../service/editor/editor_presentation_services');


module.exports.getEventPendingResearchPapers = async (req, res) => {
	try {
		const serviceResponse = await editorPresentationService.getEventPendingResearchPapers();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getEventPendingResearchPaper = async (req, res) => {
	try {
		const serviceResponse = await editorPresentationService.getEventPendingResearchPaper(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};


module.exports.createPresentation = async (req, res) => {
	try {
		const serviceResponse = await editorPresentationService.createPresentation(req.user, req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};


module.exports.editPresentation = async (req, res) => {
	try {
		const serviceResponse = await editorPresentationService.editPresentation(req.user, req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.editTempPresentation = async (req, res) => {
	try {
		const serviceResponse = await editorPresentationService.editTempPresentation(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getAllPresentations = async (req, res) => {
	try {
		const serviceResponse = await editorPresentationService.getAllPresentations();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getAllTempPresentations = async (req, res) => {
	try {
		const serviceResponse = await editorPresentationService.getAllTempPresentations();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getSingleTempPresentation = async (req, res) => {
	try {
		const serviceResponse = await editorPresentationService.getSingleTempPresentation(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getSinglePresentation = async (req, res) => {
	try {
		const serviceResponse = await editorPresentationService.getSinglePresentation(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getPresentationList = async (req, res) => {
	try {
		const serviceResponse = await editorPresentationService.getPresentationList(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};