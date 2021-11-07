const adminSpeakerService = require('../../service/admin/admin_speaker_service');

module.exports.getAllRequestedSpeakers = async (req, res) => {
	try {
		const serviceResponse = await adminSpeakerService.getAllRequestedSpeakers();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.getRequestedSpeaker = async (req, res) => {
	try {
		const serviceResponse = await adminSpeakerService.getRequestedSpeaker(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.approveRequestedSpeaker = async (req, res) => {
	try {
		const serviceResponse = await adminSpeakerService.approveRequestedSpeaker(req.user,req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.rejectRequestedSpeaker = async (req, res) => {
	try {
		const serviceResponse = await adminSpeakerService.rejectRequestedSpeaker(req.user,req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};