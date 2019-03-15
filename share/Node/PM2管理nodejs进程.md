# 学习使用PM2管理nodejs进程

## pm2是什么？
pm2 是一个带有负载均衡的Node应用的进程管理器, 它能够管理Node应用，还能够对应用的运行状态进行监控。
## pm2 安装及使用？

安装命令：

```
npm install pm2 -g
```
比如说 我在项目中有一个 app.js 启动程序，代码如下：

```
const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {

  ctx.response.body = 'hello world';
  await next();
});

app.listen(3000);
console.log('app started at port 3000...');
```
然后每次启动下该本地项目服务，我们需要 node app.js 这样启动下，如下所示：

![点击查看](https://img2018.cnblogs.com/blog/561794/201901/561794-20190106231742539-2133670622.png)

然后在浏览器中访问 http://localhost:3000/ 就可以打印如下效果了：

![点击查看](https://img2018.cnblogs.com/blog/561794/201901/561794-20190106231756825-2112455589.png)

但是现在我们有pm2了，我们可以使用pm2来管理我们的node应用进程进行管理。我们只需要运行 pm2 start app.js 即可；如下:

![点击查看](https://img2018.cnblogs.com/blog/561794/201901/561794-20190106231818102-779564171.png)

然后在浏览器中访问 http://localhost:3000/ 也一样能看到效果。

下面是pm2 常用的命令：

```
$ npm install pm2 -g          // pm2 命令安装
$ pm2 start app.js -i 2       // 后台运行pm2，启动2个app.js
$ pm2 start app.js --name xxx // 命名进程为xxx

```

比如如下所示：

![点击查看](https://img2018.cnblogs.com/blog/561794/201901/561794-20190106231852732-2075419686.png)

```
$ pm2 list            // 显示所有进程状态

$ pm2 monit           // 监视所有进程

$ pm2 logs            // 显示所有进程日志

$ pm2 stop all        // 停止所有进程

$ pm2 restart all     // 重启所有进程

$ pm2 reload all      // 0秒停机重载进程

$ pm2 stop 0          // 停止指定的进程

$ pm2 restart 0       // 重启指定的进程

$ pm2 startup         // 产生init脚本，保持进程活着

$ pm2 delete 0        // 杀死指定的进程

$ pm2 delete all      // 杀死全部进程

$ pm2 web             // 监控所有被pm2管理的进程

```
运行进程的不同方式：

```
$ pm2 start app.js -i max       // 指定有效CPU数目启动最大进程数目

$ pm2 start app.js -i 3         // 启动3个进程

$ pm2 start app.js -x           // 用fork模式启动 app.js, 而不是使用 cluster

$ pm2 start app.js --name xxxx  // 启动一个进程并把它命名为 xxxx

$ pm2 start app.json            // 启动进程，在app.json里设置选项

$ pm2 start app.js -i max -- -a 23  // 在--之后给app.js传递参数

$ pm2 start app.js -i max -e err.log -o out.log // 启动并生成一个配置文件
```









