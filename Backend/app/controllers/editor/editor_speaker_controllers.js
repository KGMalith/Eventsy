const editorSpeakerService = require('../../service/editor/editor_speaker_services');

module.exports.createSpeaker = async (req, res) => {
	try {
		const serviceResponse = await editorSpeakerService.createSpeaker(req.user, req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.editSpeaker = async (req, res) => {
	try {
		const serviceResponse = await editorSpeakerService.editSpeaker(req.user, req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.editTemporarySpeaker = async (req, res) => {
	try {
		const serviceResponse = await editorSpeakerService.editTemporarySpeaker(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getAllSpeakers = async (req, res) => {
	try {
		const serviceResponse = await editorSpeakerService.getAllSpeakers();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getAllTemporarySpeakers = async (req, res) => {
	try {
		const serviceResponse = await editorSpeakerService.getAllTemporarySpeakers();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getSingleTemporarySpeaker = async (req, res) => {
	try {
		const serviceResponse = await editorSpeakerService.getSingleTemporarySpeaker(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getSingleSpeaker = async (req, res) => {
	try {
		const serviceResponse = await editorSpeakerService.getSingleSpeaker(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getAllSpeakersList = async (req, res) => {
	try {
		const serviceResponse = await editorSpeakerService.getAllSpeakersList();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });

	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};