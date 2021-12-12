const reviewerService = require('../../service/reviewer/reviewer_research_service');

module.exports.getAllPendingResearchPaperSubmissions = async (req, res) => {
	try {
		const serviceResponse = await reviewerService.getAllPendingResearchPaperSubmissions();
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.viewSingleResearchPaperSubmission = async (req, res) => {
	try {
		const serviceResponse = await reviewerService.viewSingleResearchPaperSubmission(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.approveResearchPaper = async (req, res) => {
	try {
		const serviceResponse = await reviewerService.approveResearchPaper(req.user,req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

module.exports.rejectResearchPaper = async (req, res) => {
	try {
		const serviceResponse = await reviewerService.rejectResearchPaper(req.user, req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};

