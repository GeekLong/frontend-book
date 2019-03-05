var http = require("http");
http.createServer((request, response) => {
    response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
    response.end("哈哈哈哈，我买了一个 iPhoneXS MAX");
}).listen(8888);