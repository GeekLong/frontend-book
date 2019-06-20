const express = require('express');

const router = express.Router();

const userSession = require('../api/userSession');

router.post('/usersession', userSession.usersession);

module.exports = router;