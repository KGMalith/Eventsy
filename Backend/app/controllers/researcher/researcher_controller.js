const researcherService = require('../../service/reseracher/researcher_service');

module.exports.getResearchPresentationDetails = async (req, res) => {
	try {
		const serviceResponse = await researcherService.getResearchPresentationDetails(req.user);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};