const express = require('express');
const router = express.Router();

let editor_speaker_routes = require('./editor_speaker_routes');

router.use('/', editor_speaker_routes);

module.exports = router;