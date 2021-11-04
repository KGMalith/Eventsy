let express = require('express');
let router = express.Router();
//Import Schemas
require('./schema/index');
//Import Routing files
let authRoutes = require('./routes/auth/authRoutes');



//Define Routing paths
router.use('/', authRoutes);


module.exports = router;