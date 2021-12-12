const editorConferenceService = require('../../service/editor/editor_conference_services');


module.exports.createConference = async (req, res) => {
	try {
		const serviceResponse = await editorConferenceService.createConference(req.user, req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.editConference = async (req, res) => {
	try {
		const serviceResponse = await editorConferenceService.editConference(req.user,req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};


module.exports.editTempConference = async (req, res) => {
	try {
		const serviceResponse = await editorConferenceService.editTempConference(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getAllConferences = async (req, res) => {
	try {
		const serviceResponse = await editorConferenceService.getAllConferences();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getAllTempConferences = async (req, res) => {
	try {
		const serviceResponse = await editorConferenceService.getAllTempConferences();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getSingleTempConference = async (req, res) => {
	try {
		const serviceResponse = await editorConferenceService.getSingleTempConference(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getSingleConference = async (req, res) => {
	try {
		const serviceResponse = await editorConferenceService.getSingleConference(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getSingleConferenceForPreview = async (req, res) => {
	try {
		const serviceResponse = await editorConferenceService.getSingleConferenceForPreview(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getSingleTempConferenceForPreview = async (req, res) => {
	try {
		const serviceResponse = await editorConferenceService.getSingleTempConferenceForPreview(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};