let express = require('express');
let router = express.Router();
//Import Schemas
require('./schema/index');
//Import Routing files
let authRoutes = require('./routes/auth/authRoutes');
let reviewerRoutes = require('./routes/reviewer/reviewerMainRoutes');
let editorMainRoutes = require('./routes/editor/editorMainRoute');
let adminRoutes = require('./routes/admin/adminMainRoute');
let researcherRoutes = require('./routes/researcher/researcher_routes');
let paymentRoutes = require('./routes/payment/payment_routes');


//Define Routing paths
router.use('/', authRoutes);
router.use('/reviewer', reviewerRoutes);
router.use('/editor', editorMainRoutes);
router.use('/admin', adminRoutes);
router.use('/researcher', researcherRoutes);
router.use('/payment', paymentRoutes);

module.exports = router;