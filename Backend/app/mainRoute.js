let express = require('express');
let router = express.Router();
//Import Schemas
require('./schema/index');
//Import Routing files
let authRoutes = require('./routes/auth/auth_routes');
let reviewerRoutes = require('./routes/reviewer/reviewerMainRoutes');
let editorMainRoutes = require('./routes/editor/editorMainRoute');
let adminRoutes = require('./routes/admin/adminMainRoute');
let researcherRoutes = require('./routes/researcher/researcher_routes');
let paymentRoutes = require('./routes/payment/payment_routes');
let attendeeRoutes = require('./routes/attendee/attendee_routes');
let commonRoutes = require('./routes/common/common_routes');
let workshopConductorRoutes = require('./routes/workshopConductors/workshop_conductor_routes');


//Define Routing paths
router.use('/', authRoutes);
router.use('/reviewer', reviewerRoutes);
router.use('/editor', editorMainRoutes);
router.use('/admin', adminRoutes);
router.use('/researcher', researcherRoutes);
router.use('/payment', paymentRoutes);
router.use('/attendee', attendeeRoutes);
router.use('/common', commonRoutes);
router.use('/workshop-conductor', workshopConductorRoutes);

module.exports = router;