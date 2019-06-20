
// 引入express 模块 
const express = require('express');

const router = express.Router();

// 引入user.js
const User = require('../api/addAndDelete');

router.post('/add', User.add);

router.post('/query', User.query);

router.post('/del', User.del);

router.post('/update', User.update);

module.exports = router;