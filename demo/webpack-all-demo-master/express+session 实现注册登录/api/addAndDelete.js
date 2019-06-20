
const User = require('../database/models/user');
// 新增信息
module.exports.add = function(req, res, next) {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    sex: req.body.sex
  });
  user.save((err, docs) => {
    if (err) {
      res.send({ 'code': 1, 'errorMsg': '新增失败' });
    } else {
      res.send({ "code": 0, 'message': '新增成功' });
    }
  });
  next();
};
// 查询信息
module.exports.query = function(req, res, next) {
  const name = req.body.name,
    age = req.body.age,
    sex = req.body.sex;
  const obj = {};
  if (name !== '') {
    obj['name'] = name;
  }
  if (age !== '') {
    obj['age'] = age;
  }
  if (sex !== '') {
    obj['sex'] = sex;
  }
  const pageSize = req.body.pageSize ? req.body.pageSize : 10;
  const curPage = req.body.curPage ? req.body.curPage : 1;
  const skipCount = (curPage - 1) * pageSize;
  /*
  User.find(obj, (err, docs) => {
    if (err) {
      res.send({ 'code': 1, 'errorMsg': '查询失败' });
    } else {
      res.send(docs);
    }
  });
  */
  User.count(obj, (err1, total) => {
    User.find(obj).limit(pageSize).skip(skipCount).exec((err2, docs) => {
      if (err2) {
        res.send({ 'code': 1, 'errorMsg': '查询失败' });
      } else {
        res.send({
          'code': 0, 
          'msg': '查询成功', 
          'pager': {totalCount: total, pageSize: pageSize, curPage: curPage},
          'data': docs
        });
      }
    });
  });
  next();
};

// 删除数据
module.exports.del = function(req, res, next) {
  const id = req.body.id;
  // 根据自动分配的 _id 进行删除
  const whereid = { '_id': id };
  User.remove(whereid, (err, docs) => {
    if (err) {
      res.send({ 'code': 1, 'errorMsg': '删除失败' });
    } else {
      res.send(docs);
    }
  });
  next();
}

// 更新数据
module.exports.update = function(req, res, next) {
  console.log(req.body)
  // 需要更新的数据
  const id = req.body.id,
    name = req.body.name,
    age = req.body.age,
    sex = req.body.sex;
  const updateStr = {
    name: name,
    age: age,
    sex: sex
  };
  const ids = {
    _id: id
  };
  console.log(ids);
  User.findByIdAndUpdate(ids, updateStr, (err, docs) => {
    if (err) {
      res.send({ 'code': 1, 'errorMsg': '更新失败' });
    } else {
      res.send(docs);
    }
  });
};
