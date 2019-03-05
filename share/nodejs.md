# 初识 Nodejs
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。Node.js 的包管理器 npm，是全球最大的开源库生态系统。

## 安装
Node 的安装非常简单，不同的平台有不同的安装包，[下载安装包](https://nodejs.org/en/download/)双击安装就可以了。安装成功后可以运行如下命令来查看 Node 的版本：

```
$ node -v
v9.0.0
```

## Hello World
在某个目录下创建一个`hello.js`文件，并写入以下代码：

```
console.log("Hello World!");
```

通过命令行进入该文件目录，运行`hello.js`文件：

```
$ node hello.js
Hello World!
```

这样你就已经开始了第一个 Node 程序，其实 Node 是基于 V8 引擎，语言上就是 JavaScript，对于前端开发来说语法就不用多说了。

## 创建第一个应用
Node 并不像 .NET 和 Java 这种服务端技术，.NET 和 Java 需要建立在 IIS 或者 Tomcat 这种 Web 容器下；然而 Node 和他们完全不同，它不仅要实现一个应用还要实现整个 HTTP 服务器。我们可以通过以下步骤来创建一个应用：

### 引入 HTTP 模块
使用`require("http")`来载入 http 模块，并将实例化的 HTTP 赋值给变量 http：

```
var http = require("http");
```

### 创建服务器
我们使用` http.createServer()`方法来创建服务器，并通过`listen`来绑定服务的端口，最后该方法的回调来接受和响应数据，以下是`http.js`文件的代码：

```
var http = require("http");

http.createServer((request, response) => {

    response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
    
    response.end("哈哈哈哈，我买了一个 iPhoneXS MAX");
    
}).listen(8888);
```
### 启动服务

```
$ node http.js
```
此时在本地浏览器中打开：http://localhost:8888/ 即可看到页面上打印出 `哈哈哈哈，我买了一个 iPhoneXS MAX`。
### Url 模块
```
url.parse() 解析 URL

url.format(urlObject) //是上面 url.parse() 操作的逆向操作

url.resolve(from, to)

```
### fs 模块
```
fs.stat 检测是文件还是目录
  
const fs = require('fs');
fs.stat('hello.js', (error, stats) =>{ 
if (error){
	console .log(error) 
} else {
	console .log(stats)
	console .log(`文件: ${stats.isFile()}` )
	console .log(`目录: ${stats.isDirectory()}` 
	)}
})

```
```
fs.mkdir 创建目录
  
const fs = require('fs');
fs.mkdir('logs', (error) => { 
if (error){
	console .log(error) 
} else {
	console .log('成功创 建目录:logs' )
}
})

```
```
fs.writeFile 创建写入文件
  
fs.writeFile('logs/hello.log', '您好 ~ \n', (error) => {
if(error) {
	console .log(error)
} else {
	console .log('成功写 入文件' )
} 
})

```
```
fs.appendFile 追加文件
  
 fs.appendFile('logs/hello.log', 'hello ~ \n', (error) => { 
 if(error) {
	console .log(error) 
 } else {
	console .log('成功写 入文件' ) }
})

```
```
fs.readFile 读取文件
  
 const fs = require('fs');
 fs.readFile('logs/hello.log', 'utf8', (error, data) =>{ 
 if (error) {
	console .log(error) 
 } else {
	console .log(data) 
	}
})

```
```
fs.readdir 读取目录
  
const fs = require('fs')
fs.readdir('logs', (error, files) => { 
if (error) {
	console .log(error)
} else {
	console .log(files)
}
})

```
```
fs.rename 重命名
  
const fs = require('fs')
fs.rename('js/hello.log', 'js/greeting.log', (error) =>{
if (error) {
	console .log(error)
} else {
	console .log(' 重命名成功' )
} })
 

```
```
fs.rmdir 删除目录
  
fs.rmdir('logs', (error) =>{
if (error) {
	console .log(error)
} else { 
	console.log('成功的删除了目录:logs')
} })
 

```
```
fs.unlink 删除文件
  
fs.unlink(`logs/${file}`, (error) => { 
if (error) {
	console .log(error) 
} else {
	console.log(`成功的删除了文件: ${file}`) }
})
 

```
```
fs.createReadStream 从文件流中读取数据
  
const fs = require('fs');
var fileReadStream = fs.createReadStream('data.json');
let count=0; var str='';
fileReadStream.on('data', (chunk) => {
	console.log(`${ ++count } 接收到:${chunk.length}`);
	str +=chunk 
})
fileReadStream.on('end', () => { 
	console.log('--- 结束 ---'); 
	console .log(count );
	console .log(str ); 
})
fileReadStream.on('error', (error) => { 
	console .log(error)
})


```
```
fs.createWriteStream 写入文件
  
var fs = require("fs");
var data = '我是从数据库获取的数据，我要保存起来';
var writerStream = fs.createWriteStream('output.txt');
writerStream .write(data ,'UTF8' );
writerStream .end();
writerStream.on('finish', function() {
 	console .log("写入完 成。" );
});
writerStream.on('error', function(err){
	console.log(err.stack); });
	console .log("程序执 行完毕" );
});
	
```
### express 模块
Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。

首先需要安装 express 模块：[点击查看官网](http://www.expressjs.com.cn/)

```
$ npm install express --save
```

另外还需要安装 EJS 模版引擎：[点击查看](https://github.com/tj/ejs)

然后开始创建基于 Express 的服务。一下为`express.js`文件代码：

```
var express = require("express");
var ejs = require("ejs");
var path = require("path");
var app = express();

app.get("/", function(req, resp) {
    resp.send("Hello Express!");
});

app.get("/json", function(req, resp) {
    resp.json({
        name: "jay",
        age: 23
    });
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/ejs", function(req, resp) {
    resp.render("app.ejs", {
        title: "Hello EJS",
        list: ["Jay", "Lily", "Mini"]
    });
});

app.listen(8888);
```

创建模版`app.ejs`文件：

```
<h1>
	<%=title%>
</h1>
<ul>
<%for(var i=0; i<list.length; i++){%>
	<li><%=list[i]%></li>
<%}%>
</ul>
```

启动服务：

```
$ node http.js`
```

这样你就可以通过浏览器访问如下页面了：

* http://localhost:8888/
* http://localhost:8888/json
* http://localhost:8888/ejs

## 将 Node 应用变成服务
虽然到此我们可以编写出基于 Node 的应用，但是还需要一步让这个应用能够真正的成为一个稳定的服务，让它永久的保留在后台并且能够自动的启动服务，其实有很多第三方的方案或者组件可以解决这一问题：

* [forever](https://github.com/foreverjs/forever)
* [PM2](https://github.com/Unitech/pm2)

## 总结
Node 为运行在服务器端的 JavaScript，它基于 Google 的 V8 引擎，有着强大的性能和丰富的插件，它是全栈工程师的首选利器。






