const express = require('express');
const router = express.Router();

let admin_speaker_routes = require('./admin_speaker_routes');
let admin_presentation_routes = require('./admin_presentation_routes');
let admin_workshop_routes = require('./admin_workshop_routes');
let admin_conference_routes = require('./admin_conference_routes');

router.use('/', admin_speaker_routes);
router.use('/', admin_presentation_routes);
router.use('/', admin_workshop_routes);
router.use('/', admin_conference_routes);

module.exports = router;