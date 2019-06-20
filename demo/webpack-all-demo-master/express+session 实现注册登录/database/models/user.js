
/*
 定义一个user的Schema
*/
const mongoose = require('../db.js');
const Schema = mongoose.Schema;

// 创建一个模型
const UserSchema = new Schema({
  name: { type: String}, // 属性name，类型为String
  age: { type: Number, default: 30 }, // 属性age，类型为Number，默认值为30
  sex: { type: String }
});

// 导出model模块
const User = module.exports = mongoose.model('User', UserSchema);