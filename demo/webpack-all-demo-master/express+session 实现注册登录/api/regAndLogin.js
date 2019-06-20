
const UserTable = require('../database/models/userTable');

// 注册功能
module.exports.registered = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  
  const regUser = new UserTable({
    username: username,
    password: password
  });
  // 先到数据库判断该用户名是否已经注册过
  UserTable.findOne({username: username}, (err1, doc1) => {
    if (err1) {
      return res.send({ 'code': 1, 'errorMsg': '网络异常错误' });
    } else if (doc1) {
      return res.send({ 'code': 1, 'errorMsg': '用户名已经存在' });
    } else {
      // 用户注册保存用户
      regUser.save((err2, docs2) => {
        if (err2) {
          return res.send({code: 1, errorMsg: err2 || '注册失败'});
        } else {
          return res.send({code: 0, msg: '注册成功'});
        }
      });
    }
  });
  next(); 
};

// 用户登录
module.exports.login = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  // 判断用户名和密码是否和数据库的相同
  UserTable.findOne({ username:username, password:password }, (err, doc) => {
    if (err) {
      return res.send({ 'code': 1, errorMsg: err || '用户名或密码错误' });
    } else {
      // 登录成功后，把username保存下, 以后的请求通过该session中的username来判断
      req.session.username = req.body.username;
      return res.send({ 'code': 0, msg: '登录成功', data: doc });
    }
  });
  next();
}

// 用户注销
module.exports.logout = function(req, res, next) {
  if (req.session.username) {
    req.session.username = '';
    return res.send({'code': 1, 'session': true }); // session 为true说明session过期了
  }
}