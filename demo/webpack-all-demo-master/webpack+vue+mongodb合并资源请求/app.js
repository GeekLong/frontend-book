
// 引入express模块
const express = require('express');

// 创建app对象
const app = express();

const addAndDelete = require('./database/addAndDelete');

const bodyParser = require("body-parser");

const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// 使用
app.use('/api', addAndDelete);

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

