
// 引入express模块
const express = require('express');

// 创建app对象
const app = express();

// 判断用户的session是否过期了 
module.exports.usersession = function(req, res, next) {
  if (!req.session.username) {
    return res.send({'code': 1, 'session': true }); // session 为true说明session过期了
  } else {
    return res.send({'code': 0, 'session': false, data: req.session});
  }
};

