
// 引入express模块
const express = require('express');

// 创建app对象
const app = express();

const addAndDelete = require('./database/addAndDelete');

const bodyParser = require("body-parser")

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// 使用
app.use('/api', addAndDelete);

// 定义服务器启动端口 
app.listen(3001, () => {
  console.log('app listening on port 3001');
});

