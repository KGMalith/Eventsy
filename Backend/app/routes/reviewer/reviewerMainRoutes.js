const express = require('express');
const router = express.Router();

let reviewer_research_routes = require('./reviewer_research_routes');
let reviewer_workshop_routes = require('./reviewer_workshop_routes');

router.use('/', reviewer_research_routes);
router.use('/', reviewer_workshop_routes);

module.exports = router;