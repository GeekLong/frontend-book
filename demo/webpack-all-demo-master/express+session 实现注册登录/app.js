
// 引入express模块
const express = require('express');
// 引入session
const session = require('express-session');
// 创建app对象
const app = express();

const addAndDelete = require('./routes/addAndDelete');
const regAndLogin = require('./routes/regAndLogin');
const userSession = require('./routes/userSession');

const bodyParser = require("body-parser");

const fs = require('fs');
const path = require('path');

// mongoose-morgan
const morgan = require('mongoose-morgan');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'kongzhi', // 对 session id 相关的cookie 进行加密签名
  cookie: {
    maxAge: 1000 * 60 * 10  // 设置 session的有效时间，单位为毫秒，设置有效期为10分钟
  }
}));

// Logger 添加数据库操作日志记录  https://www.npmjs.com/package/mongoose-morgan
app.use(morgan({
  connectionString: 'mongodb://localhost:27017/dataDb'
}));

// 使用
app.use('/user', addAndDelete);
app.use('/reglogin', regAndLogin);
app.use('/user', userSession);

let MIME = {
  '.css': 'text/css',
  '.js': 'application/javascript'
};

app.use((req, res, next) => {
  const urlInfo = parseURL(__dirname, req.url);
  if (urlInfo) {
    // 合并文件
    combineFiles(urlInfo.pathnames, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end(err.message);
      } else {
        res.writeHead(200, {
          'Content-Type': urlInfo.mime
        });
        res.end(data);
      }
    });
  }
});

// 解析文件路径
function parseURL(root, url) {
  let base, 
    pastnames,
    separator;
  if (url.indexOf('??') > -1) {
    separator = url.split('??');
    base = separator[0];

    pathnames = separator[1].split(',').map((value) => {
      const filepath = path.join(root, base, value);
      return filepath;
    });
    return {
      mime: MIME[path.extname(pathnames[0])] || 'text/plain',
      pathnames: pathnames
    }
  }
  return null;
};

//合并文件
function combineFiles(pathnames, callback) {
  const output = [];
  (function nextFunc(l, len){
    if (l < len) {
      fs.readFile(pathnames[l], (err, data) => {
        if (err) {
          callback(err);
        } else {
          output.push(data);
          nextFunc(l+1, len);
        }
      })
    } else {
      const data = Buffer.concat(output);
      callback(null, data);
    }
  })(0, pathnames.length);
}

// 定义服务器启动端口 
app.listen(3001, () => {
  console.log('app listening on port 3001');
});

