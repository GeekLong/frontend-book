# ES6 Promise对象

ES6 规定 Promise对象是一个构造函数，用来生成 Promise实列, 如下代码：

```

var promise = new Promise((resolve, reject) => {
  if (true) {
    resolve(value);
  } else {
    reject(error);
  }
});

```
resolve 函数的作用是，将promise对象的状态从 "未完成"（Pending） 变为 “成功”(Resolved), 在异步操作成功调用时，并将异步操作的结果，作为参数传递出去。

reject函数的作用是，将promise对象的状态 从 "未完成"(Pending) 变为 "失败"（Rejected）, 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

promise实列生成以后，可以使用then方法分别指定 Resolved状态 和 （Rejected）状态的回调函数。

下面是一个Promise对象的简单列子：


```

function timeout (ms) {
  return new Promise ((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value); // done
})

```

如上代码，timeout函数返回一个Promise对象的实例，过了指定的时间以后，Promise的实例状态变为Resolved，然后触发then指定的回调。参数值就是实例状态变为Resolved传进来的 done，因此输出done。

Promise新建后就会立即执行，如下代码：

```

const promise = new Promise((resolve, reject) => {
  console.log('Promise');
  resolve();
});
promise.then(()=> {
  console.log('Resilved');
});
console.log('Hi');

```

输出结果是 Promise  Hi  Resilved done



Promise新建后立即执行，所以首先输出的是 Promise， 然后promise对象resolve方法是异步的，所以先执行完所有同步的方法才会执行resolve中的方法， 因此输出HI，
最后输出 Resilved


下面是一个用Promise对象实现的 Ajax 操作的例子。


如下代码：


```
var getJSON = function(url) {
  var promise = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = handler;
    xhr.responseType = 'json';
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();
    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
  });
  return promise;
};

var url = 'http://httpbin.org/get';
getJSON(url).then((json) => {
  console.log(json); // 返回json对象
}, (error)=> {
  console.log(error);
});

```


上面调用resolve函数和reject函数都带有参数，他们的参数会传递给回调函数，reject函数的参数一般是Error对象的实列，表示抛出的错误，resolve函数的参数一般是正常的值，当然还有可能是promise对象的实列。


### 1-2 理解 Promise.prototype.then()

Promise实例具有then方法，该作用是为Promise实例添加状态改变时的回调函数。该方法的第一个参数是Resolved状态的回调函数，第二个参数是Rejected状态的回调函数。
then方法返回的是一个新的Promise实例。因此我们可以采用链式的写法，即then方法后面再调用另一个then方法。如下代码：


```

getJSON(url).then((json)=>{
  console.log(2);
  console.log(json); // 返回json对象
  return json;
}).then((data) => {
  console.log(1);
  console.log(data); // 返回和上面一样的json对象
});

```

上面的代码使用then方法，使用了2个回调函数，第一个回调函数完成以后，将返回的结果作为参数，传入第二个回调函数。


### 1-3 理解 Promise.prototype.catch()


Promise.prototype.catch方法是 .then(null, rejection)的别名，用于指定发生错误时的回调函数。如下代码：

```
getJSON(url).then((json)=> {
  // ...
}).catch((error) => {
  console.log('发生错误');
});

```

上面代码中，getJSON方法返回一个Promise对象，如果该对象状态变为Resolved, 则会调用then方法的回调函数，如果异步操作抛出错误，状态就会变为 Rejected，就会调用catch方法的回调函数，来处理这个错误。如下是一个发生错误的demo.



```

var promise2 = new Promise((resolve, reject) => {
  throw new Error('test');
});
promise2.catch((error)=> {
  console.log(error);
});
// 其实上面的代码和下面的代码是等价的
// 写法一
var p3 = new Promise((resolve, reject) => {
  try {
    throw new Error('test')
  } catch (e) {
    reject(e);
  }
});
p3.catch((error) => {
  console.log(error);
});

// 写法二
var p4 = new Promise((resolve, reject) => {
  reject(new Error('test'));
});
p4.catch((error) => {
  console.log(error);
});


```


但是如果Promise状态已经变成 Resolved的话，再抛出错误是没有用的了。如下代码


```

var p5 = new Promise((resolve, reject) => {
  resolve('ok');
  throws new Error('test'); // 这句无效
});

p5.then((value) => {
  console.log(value);
}).catch((error)=> {
  console.log(error);
})


```


上面代码中，在resolve后面再抛出错误是不会被扑获到的，因为Promise的状态一旦改变，就永久保持该状态。
Promise对象的错误具有传递性质，它会一直往下传递，直到被catch捕获到为止。

注意： 一般来讲，不要在then方法里面定义Reject状态的回调函数(then的第二个参数)，总是使用catch语句。比如如下代码：


```

// bad的写法
  var p6 = new Promise((resolve, reject) => {
    
  });
  p6.then((data) => {
    // success
  }, (error)=>{
    // error
  });

  // good的写法
  p6.then((data) => {
    // success
  }).catch((error) => {
    // error
  });
  
  
```


上面的代码中，第二种写法比第一种写法好，第二种写法可以捕获到前面then方法执行中的错误。因此我们建议使用catch方法，而不使用then方法的第二个参数。


#### 1-4 理解Promise.all()方法


Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。如下代码：
var P = Promise.all([p1, p2, p3]);


该方法接收一个数组作为参数，p1, p2, p3都是Promise的实列，如果他们不是实列的话，会先调用 Promise.resolve方法，将参数转为Promise实例。
当p1, p2, p3的状态都变成 fulfilled的时候，p的状态才会变成成功状态。当他们之中有一个是 rejected的话，那么p的状态就变为失败的状态。
注意点： 如果作为参数的Promise实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。如下代码：


```

const p11 = new Promise((resolve, reject) => {
   resolve('hello');
 }).then(res => res).catch(e => e);
 const p22 = new Promise((resolve, reject) => {
   throw new Error('报错了');
 }).then(res => res).catch(e=>e);

 Promise.all([p1, p2]).then(res => console.log(res)).catch(e=>console.log(e));
 
```


上面代码中， p11会 resolved， p22首先会rejected，但是p22有自己的catch方法，该方法会返回一个新的Promise的实例，执行完catch方法后，也会变成resolved，导致promise.all方法参数里面的两个实例都会resolved，因此会调用then方法指定的回调函数，不会调用catch方法指定的回调函数。



#### 1-5 理解Promise.race()方法

该方法同样是将多个Promise的实例，包装成一个新的Promise实例。
var p = Promise.race([p1, p2, p3]);

Promise.race 与 Promise.all的相同点：如果不是Promise的实例，就会先调用 Promise.resolve方法，将参数转为Promise的实例。

不同点是： 只要p1, p2, p3 其中任何一个实例先改变状态，那么P的状态就会跟着改变。也就是说那个先改变Promise实例的返回值，就传递给P的回调函数。


#### 1-6 理解Promise.resolve()方法


该方法的作用是：可以将现有的对象转为Promise对象。比如如下代码：
```
var jsPromise = Promise.resolve({"a":1});
```

其实上面的代码等价与下面的代码：

```
new Promise(resolve => resolve({"a": 1}));

```

#### 1-7 理解 Promise.reject()方法

Promise.reject()方法返回一个新的Promise实例，该实例的状态为 rejected。


```

var p33 = Promise.reject('出错了');
 p33.then(null, (s) => {
   console.log(s); // 出错了
 });
 
```
上面代码生成一个Promise对象的实例p33，状态为rejected，回调函数会立即执行。



