/*
 定义一个user的Schema
*/
const mongoose = require('../db.js');
const Schema = mongoose.Schema;

// 创建一个模型
const UserSchema = new Schema({
  username: { type: String, required:true }, // 用户名
  password: { type: Number, required:true }, // 密码
});

// 导出model模块
const UserTable = module.exports = mongoose.model('UserTable', UserSchema);