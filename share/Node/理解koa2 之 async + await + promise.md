# 理解koa2 之 async + await + promise
koa是下一代的Node.js web框架。

我们首先使用koa来实现一个简单的hello world吧！假如目前的项目结构如下：

```

### 目录结构如下：
koa-demo1                              # 工程名
|  |--- app.js                         # node 入口文件
|  |--- node_modules                   # 项目依赖包
|  |--- package.json

```

app.js 代码如下：

```

const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(ctx);
  await next();
  ctx.response.type = 'text/html';
  ctx.response.body = 'hello world';
});

app.listen(3001);
console.log('app started at port 3001...');

```


如上，对于页面中每一个http请求，koa将调用如上异步函数来处理。进入项目中的根目录执行 node app.js 后，在页面中访问 http://localhost:3001/ 后刷新看到node控制台打印 console.log(ctx); 如下信息：

![](https://img2018.cnblogs.com/blog/561794/201812/561794-20181228001720757-656703030.png)


参数ctx是koa传入封装的了request和response的变量，如上图可以看到，我们就可以通过ctx来访问request和response的数据了，我们可以再看下浏览器中 header信息如下，我们可以对比下 上面图和下面的图：

![](https://img2018.cnblogs.com/blog/561794/201812/561794-20181228001742376-1363788532.png)


并且我们在看看浏览器中网络请求可以看到有如下两条请求，在node中也可以看到打印了二次，说明对于页面中每一个http请求，koa将调用如上异步函数来处理的，如下所示：

![](https://img2018.cnblogs.com/blog/561794/201812/561794-20181228001757678-1876747278.png)


如上的代码异步函数中，使用了 await next()；来处理下一个异步函数，和express中的 next()方法类似的功能，然后设置 response的Content-Type的内容。


async的理解为：用于声明一个function是异步的，并且返回的是一个promise对象，如下代码：


```

async function testAsync() {
  return 'hello world';
}

const a = testAsync();

console.log(a);

```

在浏览器中打印如下：

![](https://img2018.cnblogs.com/blog/561794/201812/561794-20181228001837799-1426728997.png
)



await的含义是：用于等待一个异步方法执行完成(同步等待)。

await在等待async异步方法执行完毕，await必须在async方法中才可以使用。

如下代码demo理解：


```

function getData () {
  return 'hello world';
}

async function testAsync() {
  return 'hello xxxx';
}

async function testAsync2() {
  const a1 = await testAsync();
  const a2 = await getData();
  console.log(a1); // hello xxxx
  console.log(a2); // hello world
}

testAsync2();



```


如上代码 getData是同步方法，testAsync是异步方法的，都会返回一条信息，但是在testAsync2异步方法内部，都使用await 使数据同步返回，因此结果打印： hello xxxx；和 hello world了。

但是如果我们在 testAsync2 函数内部不使用 await 这个，直接调用 testAsync()方法和getData()方法的话，那么testAsync就会返回一个promise对象了，如下代码：


```

function getData () {
  return 'hello world';
}

async function testAsync() {
  return 'hello xxxx';
}

function testAsync2() {
  const a1 = testAsync();
  const a2 = getData();
  
  console.log(a1); 
  console.log(a2); 
}

testAsync2();



```
执行结果如下所示：


![](https://img2018.cnblogs.com/blog/561794/201812/561794-20181228001943525-642094146.png
)


## 1. async的作用是？

async函数它会返回一个promise对象，我们可以通过promise对象的then方法来获取如上的 'hello world' 的值，如下代码所示：


```

async function testAsync() {
  return 'hello xxxx';
}

const test = testAsync();

console.log(test); // Promise {<resolved>: "hello xxxx"}

test.then(data => {
  console.log(data);  // 打印 hello xxxx
});


```

## 2. await的作用是？

await可以理解为同步等待当前的async的执行，且等async后的promise对象执行resolve，然后拿到resolve的值，作为await表达式的运算结果。代码才会继续往下执行。

我们可以看如下demo来理解下：


```

function testA() {
  return 'hello world';
}

async function testA2() {
  return 'xxxx';
}

async function testA3() {
  // 等待返回 'heelo world'
  const a1 = await testA();

  // 待会返回promise对象的resolve的值，才会继续往下执行
  const a2 = await testA2();

  console.log(a1 + '--' + a2); // 会打印 hello world--xxxx
}

testA3(); 


```


## 3. async + await + promise 解决异步问题

如下基本的代码：


```

let url = 'xxxxx'; // url 地址
let asyncFn = async () => {
  let data = null;
  data = await getData(url);
  console.log(data);
}

const getData = function(url) {
  return new Promise((resolve, reject) => {
    // 如下简单的使用 ajax来演示下，项目中具体使用fetch还是其他都可以的
    $.ajax({
      type: 'get',
      dataType: 'json',
      data: {
        
      },
      success: function(d) {
        resolve(d);
      },
      error: function(e) {
        reject(e);
      }
    })
  });
}


```



