const express = require('express');
const router = express.Router();

let editor_speaker_routes = require('./editor_speaker_routes');
let editor_presentation_routes = require('./editor_presentation_routes');
let editor_workshop_routes = require('./editor_workshop_routes');
let editor_conference_routes = require('./editor_conference_routes');

router.use('/', editor_speaker_routes);
router.use('/', editor_presentation_routes);
router.use('/', editor_workshop_routes);
router.use('/', editor_conference_routes);

module.exports = router;