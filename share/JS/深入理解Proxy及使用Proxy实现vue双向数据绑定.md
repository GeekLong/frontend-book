# 深入理解Proxy 及 使用Proxy实现vue数据双向绑定

## 1.什么是Proxy？它的作用是？

据阮一峰文章介绍：Proxy可以理解成，在目标对象之前架设一层 "拦截"，当外界对该对象访问的时候，都必须经过这层拦截，而Proxy就充当了这种机制，类似于代理的含义，它可以对外界访问对象之前进行过滤和改写该对象。

如果对vue2.xx了解或看过源码的人都知道，vue2.xx中使用 Object.defineProperty()方法对该对象通过 递归+遍历的方式来实现对数据的监控的，我们也知道，当我们使用数组的方法或改变数组的下标是不能重新触发 Object.defineProperty中的set()方法的，因此就做不到实时响应了。所以使用 Object.defineProperty 存在如下缺点：

##### 1. 监听数组的方法不能触发Object.defineProperty方法中的set操作(如果要监听的到话，需要重新编写数组的方法)。

##### 2. 必须遍历每个对象的每个属性，如果对象嵌套很深的话，需要使用递归调用。

因此vue3.xx中之后就改用Proxy来更好的解决如上面的问题。在学习使用Proxy实现数据双向绑定之前，我们还是一步步来，先学习了Proxy基本知识点。

### Proxy基本语法

```
const obj = new Proxy(target, handler);

```
参数说明如下：


target: 被代理对象。

handler: 是一个对象，声明了代理target的一些操作。

obj: 是被代理完成之后返回的对象。

但是当外界每次对obj进行操作时，就会执行handler对象上的一些方法。handler中常用的对象方法如下：

####1. get(target, propKey, receiver)
####2. set(target, propKey, value, receiver)
####3. has(target, propKey)
####4. construct(target, args):
####5. apply(target, object, args)

如上是Proxy中handler 对象的方法，其实它和Reflect里面的方法类似的


```

const target = {
  name: 'kongzhi'
};

const handler = {
  get: function(target, key) {
    console.log(`${key} 被读取`);
    return target[key];
  },
  set: function(target, key, value) {
    console.log(`${key} 被设置为 ${value}`);
    target[key] = value;
  }
};

const testObj = new Proxy(target, handler);

/*
  获取testObj中name属性值
  会自动执行 get函数后 打印信息：name 被读取 及输出名字 kongzhi
*/
console.log(testObj.name);

/*
 改变target中的name属性值
 打印信息如下： name 被设置为 111 
*/
testObj.name = 111;

console.log(target.name); // 输出 111


```

如上代码所示：也就是说 target是被代理的对象，handler是代理target的，那么handler上面有set和get方法，当每次打印target中的name属性值的时候会自动执行handler中get函数方法，当每次设置 target.name 属性值的时候，会自动调用 handler中的set方法，因此target对象对应的属性值会发生改变，同时改变后的 testObj对象也会发生改变。同理改变返回后 testObj对象中的属性也会改变原对象target的属性的，因为对象是引用类型的，是同一个引用的。如果这样还是不好理解的话，可以简单的看如下代码应该可以理解了：

```

const target = {
  name: 'kongzhi'
};

const testA = target;

testA.name = 'xxx';

console.log(testA.name); // 打印 xxx

console.log(target.name); // 打印 xxx

```

## get(target, propKey, receiver)


该方法的含义是：用于拦截某个属性的读取操作。它有三个参数，如下解析：

target: 目标对象。

propKey: 目标对象的属性。

receiver: (可选)，该参数为上下文this对象

如下代码演示：

```

const obj = {
  name: 'kongzhi'
};

const handler = {
  get: function(target, propKey) {
    // 使用 Reflect来判断该目标对象是否有该属性
    if (Reflect.has(target, propKey)) {
      // 使用Reflect 来读取该对象的属性
      return Reflect.get(target, propKey);
    } else {
      throw new ReferenceError('该目标对象没有该属性');
    }
  }
};

const testObj = new Proxy(obj, handler);

/* 
 Proxy中读取某个对象的属性值的话，
 就会使用get方法进行拦截，然后返回该值。
 */
console.log(testObj.name); // kongzhi

/*
 如果对象没有该属性的话，就会进入else语句，就会报错：
 Uncaught ReferenceError: 该目标对象没有该属性
*/
// console.log(testObj.name2);

/*
 其实Proxy中拦截的操作是在原型上的，因此我们也可以使用 Object.create(obj)
 来实现对象的继承的。
 如下代码演示：
*/
const testObj2 = Object.create(testObj);
console.log(testObj2.name);

// 看看他们的原型是否相等 
console.log(testObj2.__proto__ === testObj.__proto__);  // 返回true


```
如果没有这个拦截的话，如果某个对象没有该属性的话，会输出 undefined.


## set(target, propKey, value, receiver)

该方法是用来拦截某个属性的赋值操作，它可以接受四个参数，参数解析分别如下：


target: 目标对象。

propKey: 目标对象的属性名

value: 属性值

receiver(可选): 一般情况下是Proxy实列

如下代码演示：

```

const obj = {
  'name': 'kongzhi'
};

const handler = {
  set: function(obj, prop, value) {
    return Reflect.set(obj, prop, value);
  }
};

const proxy = new Proxy(obj, handler);

proxy.name = '我是小白';

console.log(proxy.name); // 输出： 我是小白
console.log(obj); // 输出： {name: '我是小白'}

```
当然如果设置该对象的属性是不可写的，那么set方法就不起作用了，如下代码演示：

```

const obj = {
  'name': 'kongzhi'
};

Object.defineProperty(obj, 'name', {
  writable: false
});

const handler = {
  set: function(obj, prop, value, receiver) {
    Reflect.set(obj, prop, value);
  }
};

const proxy = new Proxy(obj, handler);
proxy.name = '我是小白';
console.log(proxy.name); // 打印的是 kongzhi


```

注意：proxy对数组也是可以监听的；如下代码演示，数组中的 push方法监听：


```

const obj = [{
  'name': 'kongzhi'
}];

const handler = {
  set: function(obj, prop, value) {
    return Reflect.set(obj, prop, value);
  }
};

const proxy = new Proxy(obj, handler);

proxy.push({'name': 'kongzhi222'});

proxy.forEach(function(item) {
  console.log(item.name); // 打印出 kongzhi kongzhi222
});


```
##has(target, propKey)


该方法是判断某个目标对象是否有该属性名。接收二个参数，分别为目标对象和属性名。返回的是一个布尔型。


如下代码演示：


```

const obj = {
  'name': 'kongzhi'
};

const handler = {
  has: function(target, key) {
    if (Reflect.has(target, key)) {
      return true;
    } else {
      return false;
    }
  }
};

const proxy = new Proxy(obj, handler);

console.log(Reflect.has(obj, 'name')); // true
console.log(Reflect.has(obj, 'age')); // false


```

## construct(target, args, newTarget):

该方法是用来拦截new命令的，它接收三个参数，分别为 目标对象，构造函数的参数对象及创造实列的对象。

第三个参数是可选的。它的作用是拦截对象属性。

如下代码演示：

```
function A(name) {
  this.name = name;
}

const handler = {
  construct: function(target, args, newTarget) {
    /*
     输出： function A(name) {
              this.name = name;
           }
    */
    console.log(target); 
    // 输出： ['kongzhi', {age: 30}]
    console.log(args); 
    return args
  }
};

const Test = new Proxy(A, handler);

const obj = new Test('kongzhi', {age: 30});
console.log(obj);  // 输出： ['kongzhi', {age: 30}]

```

## apply(target, object, args)

该方法是拦截函数的调用的。该方法接收三个参数，分别是目标对象。目标对象上下文this对象 和 目标对象的数组；


```


function testA(p1, p2) {
  return p1 + p2;
}
const handler = {
  apply: function(target, ctx, args) {
    /*
      这里的 ...arguments 其实就是上面的三个参数 target, ctx, args 对应的值。
      分别为：
      target: function testA(p1, p2) {
        return p1 + p2;
      }
      ctx: undefined
      args: [1, 2]
      使用 Reflect.apply(...arguments) 调用testA函数，因此返回 (1+2） * 2 = 6
    */
    console.log(...arguments);
    return Reflect.apply(...arguments) * 2;
  }
}

const proxy = new Proxy(testA, handler);

console.log(proxy(1, 2)); // 6

// 也可以如下调用
console.log(proxy.apply(null, [1, 3])); // 8

// 我们也可以使用 Reflect.apply 调用

console.log(Reflect.apply(proxy, null, [3, 5])); // 16


```


## 使用Proxy实现简单的vue双向绑定


vue3.x使用了Proxy来对数据进行监听了，因此我们来简单的来学习下使用Proxy来实现一个简单的vue双向绑定。

我们都知道实现数据的双向绑定，需要实现以下几点；

##### 1. 需要实现一个数据监听器 Observer, 能够对所有数据进行监听，如果有数据变动的话，拿到最新的值并通知订阅者Watcher.


##### 2. 需要实现一个指令解析器Compile，它能够对每个元素的指令进行扫描和解析，根据指令模板替换数据，以及绑定相对应的函数。


##### 3. 需要实现一个Watcher, 它是链接Observer和Compile的桥梁，它能够订阅并收到每个属性变动的通知，然后会执行指令绑定的相对应的回调函数，从而更新视图。



下面是一个简单的demo源码如下(我们可以参考下，理解下原理)：


```

<!DOCTYPE html>
 <html>
    <head>
      <meta charset="utf-8">
      <title>标题</title>
    </head>
    <body>
      <div id="app">
        <input type="text" v-model='count' />
        <input type="button" value="增加" @click="add" />
        <input type="button" value="减少" @click="reduce" />
        <div v-bind="count"></div>
      </div>
      <script type="text/javascript">   
        class Vue {
          constructor(options) {
            this.$el = document.querySelector(options.el);
            this.$methods = options.methods;
            this._binding = {};
            this._observer(options.data);
            this._compile(this.$el);
          }
          _pushWatcher(watcher) {
            if (!this._binding[watcher.key]) {
              this._binding[watcher.key] = [];
            }
            this._binding[watcher.key].push(watcher);
          }
          /*
           observer的作用是能够对所有的数据进行监听操作，通过使用Proxy对象
           中的set方法来监听，如有发生变动就会拿到最新值通知订阅者。
          */
          _observer(datas) {
            const me = this;
            const handler = {
              set(target, key, value) {
                const rets = Reflect.set(target, key, value);
                me._binding[key].map(item => {
                  item.update();
                });
                return rets;
              }
            };
            this.$data = new Proxy(datas, handler);
          }
          /*
           指令解析器，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相对应的更新函数
          */
          _compile(root) {
            const nodes = Array.prototype.slice.call(root.children);
            const data = this.$data;
            nodes.map(node => {
              if (node.children && node.children.length) {
                this._compile(node.children);
              }
              const $input = node.tagName.toLocaleUpperCase() === "INPUT";
              const $textarea = node.tagName.toLocaleUpperCase() === "TEXTAREA";
              const $vmodel = node.hasAttribute('v-model');
              // 如果是input框 或 textarea 的话，并且带有 v-model 属性的
              if (($vmodel && $input) || ($vmodel && $textarea)) {
                const key = node.getAttribute('v-model');
                this._pushWatcher(new Watcher(node, 'value', data, key));
                node.addEventListener('input', () => {
                  data[key] = node.value;
                });
              }
              if (node.hasAttribute('v-bind')) {
                const key = node.getAttribute('v-bind');
                this._pushWatcher(new Watcher(node, 'innerHTML', data, key));
              }
              if (node.hasAttribute('@click')) {
                const methodName = node.getAttribute('@click');
                const method = this.$methods[methodName].bind(data);
                node.addEventListener('click', method);
              }
            });
          }
        }
        /*
         watcher的作用是 链接Observer 和 Compile的桥梁，能够订阅并收到每个属性变动的通知，
         执行指令绑定的响应的回调函数，从而更新视图。
        */
        class Watcher {
          constructor(node, attr, data, key) {
            this.node = node;
            this.attr = attr;
            this.data = data;
            this.key = key;
          }
          update() {
            this.node[this.attr] = this.data[this.key];
          }
        }
      </script>
      <script type="text/javascript">
        new Vue({
          el: '#app',
          data: {
            count: 0
          },
          methods: {
            add() {
              this.count++;
            },
            reduce() {
              this.count--;
            }
          }
        });
      </script>
    </body>
</html>

```


如上代码我们来分析下原理如下：


首先他是使用ES6编写的语法来实现的。首先我们想实现类似vue那要的初始化代码，如下这样设想：


```

new Vue({
  el: '#app',
  data: {
    count: 0
  },
  methods: {
    add() {
      this.count++;
    },
    reduce() {
      this.count--;
    }
  }
});


```

因此使用ES6 基本语法如下：

```

class Vue {
  constructor(options) {
    this.$el = document.querySelector(options.el);
    this.$methods = options.methods;
    this._binding = {};
    this._observer(options.data);
    this._compile(this.$el);
  }
}


```



Vue类使用new创建一个实例化的时候，就会执行 constructor方法代码，因此options是vue传入的一个对象，它有 el，data, methods等属性。 如上代码先执行 this._observer(options.data); 该 observer 函数就是监听所有数据的变动函数。基本代码如下：

### 1. 实现Observer对所有的数据进行监听。

```

_observer(datas) {
  const me = this;
  const handler = {
    set(target, key, value) {
      const rets = Reflect.set(target, key, value);
      me._binding[key].map(item => {
        item.update();
      });
      return rets;
    }
  };
  this.$data = new Proxy(datas, handler);
}


```

使用了我们上面介绍的Proxy中的set方法对所有的数据进行监听，只要我们Vue实列属性data中有任何数据发生改变的话，都会自动调用Proxy中的set方法，我们上面的代码使用了 const rets = Reflect.set(target, key, value); return rets; 这样的代码，就是对我们的data中的任何数据发生改变后，使用该方法重新设置新值，然后返回给 this.$data保存到这个全局里面。


```

me._binding[key].map(item => {
  item.update();
});

```


如上this._binding 是一个对象，对象里面保存了所有的指令及对应函数，如果发生改变，拿到最新值通知订阅者，因此通知Watcher类中的update方法，如下Watcher类代码如下：


```
/*
 watcher的作用是 链接Observer 和 Compile的桥梁，能够订阅并收到每个属性变动的通知，
 执行指令绑定的响应的回调函数，从而更新视图。
*/
class Watcher {
  constructor(node, attr, data, key) {
    this.node = node;
    this.attr = attr;
    this.data = data;
    this.key = key;
  }
  update() {
    this.node[this.attr] = this.data[this.key];
  }
}
```


### 2. 实现Compile


如下代码初始化

```

class Vue {
  constructor(options) {
    this.$el = document.querySelector(options.el);
    this._compile(this.$el);
  }
}


```
_compile 函数的作用就是对页面中每个元素节点的指令进行解析和扫描的，根据指令模板替换数据，以及绑定相应的更新函数。



```

_compile(root) {
    const nodes = Array.prototype.slice.call(root.children);
    const data = this.$data;
    nodes.map(node => {
      if (node.children && node.children.length) {
        this._compile(node.children);
      }
      const $input = node.tagName.toLocaleUpperCase() === "INPUT";
      const $textarea = node.tagName.toLocaleUpperCase() === "TEXTAREA";
      const $vmodel = node.hasAttribute('v-model');
      // 如果是input框 或 textarea 的话，并且带有 v-model 属性的
      if (($vmodel && $input) || ($vmodel && $textarea)) {
        const key = node.getAttribute('v-model');
        this._pushWatcher(new Watcher(node, 'value', data, key));
        node.addEventListener('input', () => {
          data[key] = node.value;
        });
      }
      if (node.hasAttribute('v-bind')) {
        const key = node.getAttribute('v-bind');
        this._pushWatcher(new Watcher(node, 'innerHTML', data, key));
      }
      if (node.hasAttribute('@click')) {
        const methodName = node.getAttribute('@click');
        const method = this.$methods[methodName].bind(data);
        node.addEventListener('click', method);
      }
    });
  }
}

```


如上代码，
1.拿到根元素的子节点，然后让子元素变成数组的形式，如代码：

```
const nodes = Array.prototype.slice.call(root.children);

```


2.保存变动后的 this.$data, 如下代码：

```
const data = this.$data;

```


3.nodes子节点进行遍历，如果改子节点还有子节点的话，就会递归调用 _compile方法，如下代码：

```
nodes.map(node => {
  if (node.children && node.children.length) {
    this._compile(node.children);
  }
});

```


4.对子节点进行判断，如果子节点是input元素或textarea元素的话，并且有 v-model这样的指令的话，如下代码：


```

nodes.map(node => {
  const $input = node.tagName.toLocaleUpperCase() === "INPUT";
  const $textarea = node.tagName.toLocaleUpperCase() === "TEXTAREA";
  const $vmodel = node.hasAttribute('v-model');
  // 如果是input框 或 textarea 的话，并且带有 v-model 属性的
  if (($vmodel && $input) || ($vmodel && $textarea)) {
    const key = node.getAttribute('v-model');
    this._pushWatcher(new Watcher(node, 'value', data, key));
    node.addEventListener('input', () => {
      data[key] = node.value;
    });
  }
});


```


如上代码，如果有 v-model，就获取v-model该属性值，如代码： 


```

const key = node.getAttribute('v-model'); 

```

然后把该指令通知订阅者 Watcher; 如下代码：

```

this._pushWatcher(new Watcher(node, 'value', data, key));

```

就会调用 Watcher类的constructor的方法，如下代码：


```


class Watcher {
  constructor(node, attr, data, key) {
    this.node = node;
    this.attr = attr;
    this.data = data;
    this.key = key;
  }
}

```


把 node节点，attr属性，data数据，v-model指令key保存到this对象中了。然后调用 this._pushWatcher(watcher); 这样方法。


_pushWatcher代码如下：

```

if (!this._binding[watcher.key]) {
  this._binding[watcher.key] = [];
}
this._binding[watcher.key].push(watcher);

```

如上代码，先判断 this._binding 有没有 v-model指令中的key, 如果没有的话，就把该 this._binding[key] = []; 设置成空数组。然后就把它存入 this._binding[key] 数组里面去。


5.对于 input 或 textarea 这样的 v-model 会绑定相对应的函数，如下代码：


```

node.addEventListener('input', () => {
  data[key] = node.value;
});


```

当input或textarea有值发生改变的话，那么就把最新的值存入 Vue类中的data对象里面去，因此data中的数据会发生改变，因此会自动触发执行 _observer 函数中的Proxy中的set方法函数，还是一样，首先更新最新值，使用代码：


```
const rets = Reflect.set(target, key, value);

```
然后遍历 保存到 this._binding 对象中对应的键；如下代码：

```

me._binding[key].map(item => {
  console.log(item);
  item.update();
});

```
如上，我们在input输入框输入1的时候，打印item值如下所示：


![](https://img2018.cnblogs.com/blog/561794/201901/561794-20190122235643424-2129785249.png)


然后执行 item.update()方法，update方法如下：

```

class Watcher {
  update() {
    this.node[this.attr] = this.data[this.key];
  }
}

```

就会更新值到视图里面去，比如input或textarea, 那么 attr = 'value', node 是该元素的节点，key 就是 v-model中的属性值，因此 this.node['value'] = this.data[key];


然后同时代码中如果有 v-bind这样的指令的话，也会和上面的逻辑一样判断和执行；如下 v-bind指令代码如下：

```

if (node.hasAttribute('v-bind')) {
  const key = node.getAttribute('v-bind');
  this._pushWatcher(new Watcher(node, 'innerHTML', data, key));
}

```

然后也会更新到视图里面去，那么 attr = 'innerHTML', node 是该元素的节点，key 也是 v-model中的属性值了，因此 this.node.innerHTML = thid.data['key'];


比如页面中html代码如下：


```

<div id="app">
  <input type="text" v-model='count' />
  <input type="button" value="增加" @click="add" />
  <input type="button" value="减少" @click="reduce" />
  <div v-bind="count"></div>
</div>

```

因此上面的 node 是 ```<input type="text" v-model='count' />``` input中的node节点了，因此 node.value = this.data['count']; 因此 input框的值就更新了，同时 <div v-bind="count"></div> 该节点通过 node.innerHTML = this.data['count'] 这样的话，值也得到了更新了。

6.对于页面中元素节点带有 @click这样的方法，也有判断，如下代码：

```

if (node.hasAttribute('@click')) {
  const methodName = node.getAttribute('@click');
  const method = this.$methods[methodName].bind(data);
  node.addEventListener('click', method);
}


```


如上代码先判断该node是否有该属性，然后获取该属性的值，比如html页面中有 @click="add" 和 @click="reduce" 这样的，当点击的时候，也会调用 this.methods[methodName].bind(data)中对应vue实列中对应的函数的。因此也会执行函数的，其中data就是this.data，监听该对象的值发生改变的话，同样会调用 Proxy中的set函数，最后也是一样执行函数去更新视图的。如上就是使用proxy实现数据双向绑定的基本原理的。
