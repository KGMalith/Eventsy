const express = require('express');
const router = express.Router();

let editor_speaker_routes = require('./editor_speaker_routes');
let editor_presentation_routes = require('./editor_presentation_routes');

router.use('/', editor_speaker_routes);
router.use('/', editor_presentation_routes);

module.exports = router;