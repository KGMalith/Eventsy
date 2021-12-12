const reviewerService = require('../../service/reviewer/reviewer_workshop_service');

module.exports.getAllWorkshopProposalSubmissions = async (req, res) => {
	try {
		const serviceResponse = await reviewerService.getAllWorkshopProposalSubmissions();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.viewSingleWorkshopProposalSubmission = async (req, res) => {
	try {
		const serviceResponse = await reviewerService.viewSingleWorkshopProposalSubmission(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.approveWorkshopProposal = async (req, res) => {
	try {
		const serviceResponse = await reviewerService.approveWorkshopProposal(req.user, req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.rejectWorkshopProposal = async (req, res) => {
	try {
		const serviceResponse = await reviewerService.rejectWorkshopProposal(req.user, req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

