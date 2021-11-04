let express = require('express');
let router = express.Router();
//Import Schemas
require('./schema/index');
//Import Routing files
let authRoutes = require('./routes/auth/authRoutes');
let reviewerRoutes = require('./routes/reviewer/reviewerMainRoutes');



//Define Routing paths
router.use('/', authRoutes);
router.use('/reviewer', reviewerRoutes);


module.exports = router;