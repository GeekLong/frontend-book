# ES6中Object.assign() 方法

## 1. 对象合并
Object.assign 方法用于对象的合并，将源对象(source)的所有可枚举属性，复制到目标对象上。

如下代码演示：

```
var target = {a: 0};
var source1 = {b: 1};
var source2 = {c: 2};

Object.assign(target, source1, source2);
console.log(target);  // 输出 {a: 0, b: 1, c: 2}

```
1-1 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
如下代码：

```
var target = {a: 0, b: 1};
var source1 = {a:1, b: 2, c:3};
var source2 = {c:5};

Object.assign(target, source1, source2);

console.log(target); // 输出 {a: 1, b: 2, c: 5}

```
1-2 如果只有一个target(目标对象)，Object.assign会直接返回该对象，如下代码：

```
var o = {a: 0};
Object.assign(o);
console.log(o);  // {a: 0}

```

1-3 如果该参数不是对象，则会先转成对象，然后返回。
先是这样的，正常的返回是number类型。

```

var a = 1;
Object.assign(a);
console.log(a); // 1
console.log(typeof a); // number

```

然后直接判断类型，返回的是object类型

```
console.log(typeof Object.assign(2)) // object

```

1-4 对于null, undefined 来说 无法转换成Object，就会在控制台下报错，如下代码：


```

Object.assign(null);  // 报错
Object.assign(undefined);  // 报错

```

1-5 对象合并，如果源对象是null的话或者是undefined的话，那么对象合并的时候不会报错，直接会跳过该对象的合并，直接返回目标对象。
如下代码：

```

var obj = {a: 1};
console.log(Object.assign(obj, null) === obj); // true
console.log(obj); // {a: 1}

var obj = {a: 1};
console.log(Object.assign(obj, undefined) === obj); // true
console.log(obj); // {a: 1}

```

1-6 如果是数值，布尔型，和字符串合并对象的话，都不会报错，但是字符串会以数组的形式表现。

先看数值合并对象如下代码：


```

var obj = {a: 1};
console.log(Object.assign(obj, 12) === obj); // true
console.log(obj); // {a: 1}

```

布尔型合并对象如下代码：


```

var obj = {a: 1};
console.log(Object.assign(obj, true) === obj); // true
console.log(obj); // {a: 1}

```

字符串合并对象如下代码：

```

var obj = {a: 1};
console.log(Object.assign(obj, "bcd") === obj); // true
console.log(obj); // {0: 'b', 1: 'c', 2: 'd', a: 1}


```

如上代码，只有字符串和对象合并，这是因为只有字符串有包装对象，会产生可枚举类型属性。比如如下代码：

```

console.log(Object('bcd')); // {0: "b", 1: "c", 2: "d", length: 3, [[PrimitiveValue]]: "bcd"}
console.log(Object(1111)); // {[[PrimitiveValue]]: 1111}
console.log(Object(true)); // {[[PrimitiveValue]]: true}

```

上面代码可以看到原始值都在包装对象的内部属性[[PrimitiveValue]]上，这个属性没有被Object.assign合并，只有字符串的包装对象会产生可枚举的属性，属性则会被合并。
但是Object.assign合并的属性是有限的，只合并对象的自身的属性(不合并继承属性)，也不合并不可枚举的属性。



## 2. Object.assign方法是浅拷贝

因此Object.assign方法是浅复制，不是深复制，也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝的是这个对象的引用。

比如如下代码：

```

var o1 = {a: {b: 1} };
var o2 = Object.assign({}, o1);
o1.a.b = 2;
console.log(o2.a.b); // 2

```
如上代码，o1是一个对象，该对象的属性也是一个对象，使用Object.assign拷贝o1对象到o2上来，然后手动改变o1对象的属性值，那么o2对象的属性值也会被改变。

但是如果对象的属性值不是一个对象的话，那么就不会影响该值，如下代码：

```

var o1 = {a: 1};
var o2 = Object.assign({}, o1);
o1.a = 2;
console.log(o1); // {a: 2}
console.log(o2.a); // 1

```
但是如果源对象和目标对象有同名属性的话，那么Object.assign会直接替换该属性。比如如下代码：

```
var target = {a: {b: 1}};
var source1 = {a: {b: 'hello'}};
Object.assign(target, source1);
console.log(target); // {a: {b: 'hello'}}


```

### 注意：Object.assign可以用来处理数组，但是会把数组视为对象。

也就是说对象里面有键值对索引，如果把两个数组合并的话，那么得到不是合并后新增的数组，而是会把对应相同的键替换掉，如下使用数组的demo代码如下：

```

var targetArrs = [1, 2, 3];
var sourceArrs = [4, 5];
Object.assign(targetArrs, sourceArrs);
console.log(targetArrs);  // [4, 5, 3]


```
如上代码，目标对象有1，2，3属性，源对象有4，5值，如果使用Object.assign的话，那么源对象的键4，5 和目标对象的1，2键是相同的，因此值直接替换掉。


### 3. Object.assign 常见使用在哪些地方？

### 3-1 为对象添加属性。比如如下代码：

```

class A {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}

```


如上方法通过Object.assign方法，将x属性和y属性添加到A类的对象实列中。


###  3-2 为对象添加方法


```

Object.assign(A.prototype, {
     xMethod(x, y) {
       ...
     },
     yMethod() {

     }
   });
 // 相当于如下代码：
 A.prototype.xMethod = function(x, y) {};
 A.prototype.yMethod = function() {}
 
```
###  3-3 克隆对象

```
function clone(obj) {
   return Object.assign({}, obj);
}

```

### 3-4 合并多个对象


如下一开始的代码：

```

var target = {a: 0};
var source1 = {b: 1};
var source2 = {c: 2};
Object.assign(target, source1, source2);
console.log(target);  // 输出 {a: 0, b: 1, c: 2}


```
### 4. 对象深度克隆

浅度克隆和深度克隆的含义如下：

浅度克隆： 原始类型为值传递，对象类型为引用传递。

深度克隆： 所有元素或属性都是完全复制的，与原对象完全脱离，也就是说所有对于源对象的修改都不会反映到新对象中。反之，所有对于新对象的修改也不会反映到源对象中。

注意：Object.assign 是浅度克隆的。


4-1 ES5中我们可以通过递归的方式去调用函数来实现深度克隆。
代码如下：


```


function deepClone(obj) {
  var newObj = obj instanceof Array ? [] : {};
  for (var i in obj) {
    newObj[i] = Object.prototype.toString.call(obj[i]) === "[object Object]" ? deepClone(obj[i]) : obj[i];
  }
  return newObj;
}
var obj = {a: {b: 1} };
var newObj = deepClone(obj);
console.log(newObj);  // 打印输出 {a: {b: 1}}

// 修改对象 obj
obj.a.b = 2;
console.log(obj);   // 打印输出 {a: {b: 2}}
console.log(newObj);  // 打印输出 {a: {b: 1}} 原对象的修改不会影响到新对象中


```


如上面的代码，在JS中，我们使用递归的方式，循环遍历对象的所有属性和方法，实现深度克隆，因此当我们深度克隆到新对象中的时候，再去更改源对象的属性值的时候，不会影响到新对象。


对象和数组一起的深度克隆


```

function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}
function deepCopy(data) {
  const t = this.typeOf(data);
  let o,
    i;
  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }
  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(this.deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (i in data) {
      o[i] = this.deepCopy(data[i]);
    }
  }
  return o;
}

```









