
// 引入express 模块 
const express = require('express');

const router = express.Router();

// 引入user.js
const User = require('./user');

// 新增一条数据 接口为add
router.post('/add', (req, res) => {
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
});

// 查询数据 
router.post('/query', (req, res) => {
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
  User.find(obj, (err, docs) => {
    if (err) {
      res.send({ 'code': 1, 'errorMsg': '查询失败' });
    } else {
      res.send(docs);
    }
  });
});

// 根据 _id 删除数据
router.post('/del', (req, res) => {
  const id = req.body.id;
  // 根据自动分配的 _id 进行删除
  const whereid = { '_id': id };
  User.remove(whereid, (err, docs) => {
    if (err) {
      res.send({ 'code': 1, 'errorMsg': '删除失败' });
    } else {
      res.send(docs);
    }
  })
});

// 更新数据
router.post('/update', (req, res) => {
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
});
module.exports = router;