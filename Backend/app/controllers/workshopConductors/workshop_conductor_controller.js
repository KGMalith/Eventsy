const workshopConductorService = require('../../service/workshopConductors/workshop_conductor_service');

module.exports.getWorkshopDetails = async (req, res) => {
	try {
		const serviceResponse = await workshopConductorService.getWorkshopDetails(req.user);
		return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
	} catch (err) {
		return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page', showMessage: true });
	}
};