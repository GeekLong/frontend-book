# ES6新语法
## 1.let And const命令
### 1. let的含义及let与var的区别：

let 声明的变量只在它所在的代码块有效；如下：

```

for (let i = 0; i < 10; i++) {
  console.log(i);
}
console.log('aaa');
console.log(i); // i is not defined

```

上面代码中，计数器i只在for循环体内有效，在循环体外引用就会报错。如下var代码：

```

var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i);
  }
}
a[6](); // 10

```

变量i是var声明的，在全局范围内都有效，所以每一次循环，新的i值都会覆盖旧值，导致最后输出的是最后一轮i的值。

但是如果使用let，声明的变量仅在块级作用域内有效，最后输出的是6. 如下：

```

var b = [];
for (let j = 0; j < 10; j++) {
  b[j] = function() {
    console.log(j);
  }
}
b[6](); // 6

```

### 2. 不存在变量提升

let 不像var 那样会发生 '变量提升' 现象，因此，变量需要先声明然后再使用，否则报错；

```

// var 的情况
console.log(foo);  // undefined
var foo = 2;

// let的情况；
console.log(bar);  // 报错
let bar = 2;

```

### 3. 暂时性死区

快级作用域内存在let命令，它所声明的变量就绑定在这个区域，不再受外部影响；如下代码：


```

var tmp = 123;
if (true) {
  tmp = 'abc';
  let tmp;
  console.log(tmp); // tmp is not defined
}

```

上面代码定于全局变量tmp，但是在快级作用域内let又声明了一个局部变量tmp，导致绑定了这个快级作用域；因此打印出tmp会报错。


### 4. 不允许重复声明


let 不允许在相同作用域内，重复声明同一个变量。如下代码排错



```

function a() {
  let a = 10;
  var a = 1;
  console.log(a);
}
a();
function a() {
  let a1 = 10;
  let a1 = 1;
  console.log(a1);
}
a();


```


也不能在函数内部重新声明参数。


```

function func1(arg) {
  let arg; // 报错
}
function func2(arg) {
  {
    let arg; // 不报错
  }
}

```


### ES6的块级作用域


```

function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
} 
f1()

```


上面的代码有2个代码块，都声明了变量n，运行后输出5，说明了外层代码块不受内层代码块的影响，如果使用了变量var，那么输出的就是10；



## 二：const命令

const 声明一个只读的常量，一旦声明，常量的值就不允许改变。如下代码：


```

const a = 1; 
a = 2; 
console.log(a);  //报错

```


也就是说 const 一旦声明了变量，就必须初始化，不能留到以后赋值。如果使用const声明一个变量，但是不赋值，也会报错；如下代码：


```

const aa;  // 报错

```


#### 2-1 const的作用域与let命令相同；只在声明所在的块级作用域内有效。'


```

if (true) {
 const aa = 1;
} 
console.log(aa);  // 报错


```

#### 2-2 不可重复声明 (和let一样)

```

var message = "Hello!";
let age = 25;
// 以下两行都会报错
const message = "Goodbye!";
const age = 30;

```


但是对于复合类型的变量，比如数组，存储的是一个地址，不可改变的是这个地址，即不能把一个地址指向另一个地址，但是对象本身是可变的，比如可以给它添加新的属性；如下代码：


```

const a33 = [];
a33.push('Hello'); // 可执行
a33.length = 0;    // 可执行
a33 = ['55']  // 报错


```


## 2.变量的解构赋值

ES6可以写成这样

```

var [a, b, c] = [1, 2, 3];
console.log(a);
console.log(b);
console.log(c);


```


可以从数组中提取值，按照对应位置，对变量赋值。下面是一些使用嵌套数组进行解构的列子；

```

let [foo2, [[bar2], baz]] = [1, [[2], 3]];
console.log(foo2);  // 1
console.log(bar2);  // 2
console.log(baz);  // 3

let [, , third] = ['foo', 'bar', 'baz'];
console.log(third); // baz

let [x1, , y1] = [1, 2, 3];
console.log(x1); // 1
console.log(y1); // 3

let [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]

let [x2, y2, ...z2] = ['a'];
console.log(x2); // 'a'
console.log(y2); // undefined
console.log(z2); // []

var [foo3] = [];
var [bar4, foo4] = [1];
console.log(foo3);  // undefined
console.log(bar4);  // 1
console.log(foo4);  // undefined


```

另一种情况是不完全解构，即等号左边的模式，只匹配一部分等号右边的数组；如下代码：


```

let [x3, y3] = [1, 2, 3];
console.log(x3); // 1
console.log(y3); // 2

let [a2, [b2], d2] = [1, [2, 3], 4];
console.log(a2); // 1
console.log(b2); // 2
console.log(d2); // 4

```
如果左边是数组，右边不是一个数组的话，那么将会报错。

```

// 报错
let [f] = 1;
let [f] = false;
let [f] = NaN;
let [f] = undefined;
let [f] = null;
let [f] = {};


```

2.默认值

解构赋值允许指定默认值。如下代码：

```

var [foo = true] = [];
console.log(foo); // true

var [x, y = 'b'] = ['a'];
console.log(x); // a
console.log(y); // b

var [x2, y2 = 'b'] = ['a', undefined];
console.log(x2); // a
console.log(y2); // b


```


ES6内部使用严格相等运算符(===)，判断一个位置是否有值，所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。


```

ar [x = 1] = [undefined];
console.log(x); // 1

var [x2 = 2] = [null];
console.log(x2); // null


```

上面代码中，如果一个数组成员是null，默认值就不会生效的；因此x2为null；


但是如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值的。如下代码：

```

function f() {
  console.log('aaa');
}
let [x2 = f()] = [1]; 
console.log(x2); // 1


```
3.对象的解构赋值

解构不仅可以用于数组，还可以用于对象。

```

var { foo, bar } = { foo: 'aaa', bar: 'bbbb'};
console.log(foo); // aaa
console.log(bar); // bbbb


```
对象的解构与数组有一个重要的不同，数组的元素是按顺序排序的，变量的取值是由他的位置决定的，而对象的属性没有顺序的，变量必须和属性同名，才能取到正确的值.

```

var { baz } = { foo: "aaa", bar: "bbb" };
console.log(baz); // undefined


```

4.字符串的解构赋值

字符串被转换成了一个类似数组的对象。

```

const [a, b, c, d, e] = 'hello';
console.log(a); // h
console.log(b); // e
console.log(c); // l
console.log(d); // l
console.log(e); // o


```

类似数组的对象有一个length属性，还可以对这个对象进行解构赋值。


```

let {length: len} = 'hello';
console.log(len); // 5

```

5.函数参数的解构赋值

函数参数也可以使用解构赋值，如下代码：


```

function add([x, y]) {
  return x + y;
}
console.log(add([1, 2])); // 3

function move({x = 0, y = 0} = {}) {
  return [x, y];
}
console.log(move({x:3, y:8})); // [3, 8]
console.log(move({x: 3})); // [3, 0];
console.log(move({})); // [0, 0]
console.log(move()); // [0, 0]


```


但是下面的写法会得到不一样的结果，如下代码：


```

function move({x, y} = {x: 0, y: 0}) {
  return [x, y];
} 

console.log(move({x: 3, y: 8})); // [3, 8]
console.log(move({x:3})); // [3, undefined]


```

因为move函数指定的参数有默认值，而不是给变量x和y指定默认值，所以会得到与前一种写法不同的结果；


### 5.变量解构的用途
5-1 交换变量的值

```

[x, y] = [y, x];

```

从函数返回多个值
函数只能返回一个值，如果需要返回多个值，只能将他们放在数组或者对象里面返回，但是有了解构赋值，取出这些值就非常方便了；


```

// 返回一个数组
function example() {
  return [1, 2, 3];
}
var [a, b, c] = example();
console.log([a, b, c]); // [1, 2, 3]
console.log(a); // 1
console.log(b); // 2
console.log(c); // 3

// 返回一个对象
function example2() {
  return {
    foo: 1,
    bar: 2
  }
}
var {foo, bar} = example2();
console.log(foo); // 1
console.log(bar); // 2


```

5-2 函数参数的定义

解构赋值可以方便地将一组参数与变量名对应起来


```

// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});


```

5-3 提取JSON数据


```

var jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number); // 42, 'ok', [867, 5309]

```
5-4. 函数参数的默认值，如下代码：

```

function move({x = 0, y = 0} = {}) {
  return [x, y];
}
console.log(move({x:3, y:8})); // [3, 8]
console.log(move({x: 3})); // [3, 0];
console.log(move({})); // [0, 0]
console.log(move()); // [0, 0]

```

5-5 遍历map结构 如下代码：


```

var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}

// first is hello
// second is world


```


5-6 输入模块的指定方法



加载模块的时候，往往需要指定输入那些方法，解构赋值可以做这一点


```

const { Afun, Bfun } = require('./A')


```


## 3.数组的扩展

1.Array.from() 将类数组对象转化为真正的数组。


```

let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// ES5
var arr1 = [].slice.call(arrayLike); 
console.log(arr1); // ['a','b','c'];

// ES6的写法
let arr2 = Array.from(arrayLike);
console.log(arr2);  // ['a', 'b', 'c']

// 对于类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象。
// Array.from都可以将它们转为真正的数组。
let doms = document.querySelectorAll('p');
Array.from(doms).forEach(function(p) {
  console.log(p); // 打印dom节点
});
// 上面的代码中，querySelectorAll方法返回一个类似的数组对象，只有将该返回类似数组对象转化为真正的数组对象，才能使用forEach.
// arguments 对象
function foo(arrs) {
  var args = Array.from(arguments);
  console.log(args);  // ['aa']
}
var obj = {
  "0": 'aa'
};
foo(obj);

// 只要部署了Iterator接口的数据结构，比如字符串和Set结构，都可以使用Array.from将其转为真正的数组。
// 字符串
console.log(Array.from('hello')); // ['h', 'e', 'l', 'l', 'o']
// set结构的
let namesSet = new Set(['a', 'b']);
console.log(Array.from(namesSet)); // ['a', 'b'];

// 如果参数是一个真正的数组，那么使用Array.from 也会返回一个真正的数组。
console.log(Array.from([1, 2, 3])); // [1, 2, 3]

// 扩展运算符，也可以将其转化为数组的，如下
// arguments对象
function foo() {
  var args = [...arguments];
  console.log(args); // []
}
foo();

// NodeList对象
console.log(...document.querySelectorAll('p')); // 打印dom节点

// Array.from 还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
// 形式如下：
console.log(Array.from([1, 2, 3], (x) => x * x));  // [1, 4, 9]
// 等价如下：
console.log(Array.from([1, 2, 3]).map(x => x * x)); // [1, 4, 9]

// 下面可以将数组中布尔值的成员转为0
console.log(Array.from([1, , 2, , 3], (n) => n || 0)); // [1, 0, 2, 0, 3]


```


2.Array.of() 用于将一组值，转换为数组。


```

console.log(Array.of(3, 10, 8)); // [3, 10, 8];
console.log(Array.of(3)); // [3]
console.log(Array.of(3).length); // 1

console.log(Array.of()); // []
console.log(Array.of(undefined)); // [undefined]
console.log(Array.of(1)); // [1]
console.log(Array.of(1, 2)); // [1, 2]

// Array.of方法可以使用下面的代码模拟实现。
function ArrayOf() {
  return [].slice.call(arguments);
}

```


3.数组实例 copyWithin()


该实例方法，在当前数组内部，将指定位置的成员复制到其他位置上(会覆盖原有的成员)， 然后返回当前的数组。


```

Array.prototype.copyWithin(target, start = 0, end = this.length)


```

target (必须)：从该位置开始替换数据

start （可选): 从该位置开始读取数据，默认为0，如果为负值，表示倒数。

end(可选): 到该位置前停止读取数据，默认等于数组的长度，如果为负值，表示倒数。


```

console.log([1, 2, 3, 4, 5].copyWithin(0, 3)); // [4, 5, 3, 4, 5]
// 将3号位复制到0号位
console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4)); // [4, 2, 3, 4, 5]

// -2 相当于倒数第二个数字，-1相当于倒数最后一位
console.log([1, 2, 3, 4, 5].copyWithin(0, -2, -1)); // [4, 2, 3, 4, 5]

```


4.数组实例的 find()和findIndex()
find()方法用于找出第一个符合条件的数组成员，该参数是一个回调函数，所有的数组成员依次执行该回调函数，直到找到第一个返回值为true的成员，


然后返回该成员，如果没有找到的话，就返回undefined console.log([1, 4, 5, 10].find((n) => n > 5)); // 10


```

console.log([1, 4, 5, 10].find(function(value, index, arrs){
  return value > 9;
}));  // 10


```


findIndex()方法 返回第一个符合条件的数组成员的位置，如果没有找到，就返回-1

```


console.log([1, 5, 10, 15].findIndex(function(value, index, arrs) {
  return value > 9; // 2 
}));



```


5.数组实例 fill()

fill方法使用给定值，填充一个数组


```


// fill 方法用于空数组初始化非常方便，数组中已有的元素，会被全部抹去
console.log(['a', 'b', 'c'].fill(7)); // [7, 7, 7]

// fill方法接收第二个和第三个参数，用于指定填充的起始位置和结速位置
console.log(['a', 'b', 'c'].fill(7, 1, 2)); // ['a', '7', 'c']



```

## 4.函数的扩展


 1.函数参数的默认值
 
 
 ES6允许为函数的参数设置默认值，即直接写在参数定义的后面。
 
 
 ```
 
 
 function log(x, y = 'world') {
  console.log(x, y);
}
log('Hello'); // Hello world
log('Hello', 'China');  // Hello China
log('Hello', ''); // Hello

function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
var p = new Point();
console.log(p.x); // 0
console.log(p.y); // 0


 ```
 
 
 ES6的写法好处：
 
1.阅读代码的人，可以立刻意识到那些参数是可以省略的，不用查看函数体或文档。

2.有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿调这个参数，也不会导致以前的代码无法执行；

参数变量默认声明的，所以不能用let或const再次声明。


```

function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}


```

2-2. 与解构赋值默认值结合使用。

参数默认值可以与解构赋值的默认值，结合起来使用。


```

function foo({x, y = 5}) {
  console.log(x, y);
}
foo({});  // undefined, 5
foo({x: 1});  // 1, 5
foo({x:1, y:2});  //1, 2
foo(); // Uncaught TypeError: Cannot read property 'x' of undefined


```
只有当函数的参数是一个对象时，变量x与y 才会通过解构赋值而生成，如果函数调用的不是一个对象的话，变量x就不会生成，从而导致出错;

下面是另一个对象的解构赋值的列子

```

function fetch(url, { body = '', method='GET', headers = {}}) {
  console.log(method);
}
fetch('http://www.baidu.com', {}); // 'GET'
fetch('http://www.baidu.com'); // 报错  Uncaught TypeError: Cannot read property 'body' of undefined


```
上面的代码不能省略第二个参数，如果结合函数参数的默认值，就可以省略第二个参数。这样就出现了双重默认值；如下代码：


```

function fetch(url, { method = 'GET', body = '' } = {} ) {
  console.log(method);
}
fetch('http://www.baidu.com'); // GET


```


再看下面两种写法有什么差别


```

function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法2
function m2({x, y} = { x: 0, y: 0}) {
  return [x, y];
}

// 函数没有参数的情况下 
console.log(m1());  // [0, 0]
console.log(m2());  // [0, 0]

// x 和 y都有值的情况下
console.log(m1({x:3, y: 8}));   // [3, 8]
console.log(m2({x:3, y: 8}));   // [3, 8]

// x有值，y无值的情况下 
console.log(m1({x:3}));  // [3, 0]
console.log(m2({x: 3}));  // [3, undefined]

// x 和 y都无值的情况下 
console.log(m1({}))  // [0, 0]
console.log(m2({}))  // [undefined, undefined]

console.log(m1({z:3}));  // [0, 0]
console.log(m2({z:3}));  // [undefined, undefined]


```

上面两种写法都对函数的参数设定了默认值，区别是写法一函数的默认值是空对象，但是设置了对象解构赋值的默认值，写法2函数的参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。




3.参数默认值的位置

一般情况下，定义了默认值的参数，应该是函数的尾参数，因为这样比较容易看出来，到底省略了那些参数，如果非尾部参数设置默认值，这个参数是无法省略的。


```

// demo 1
function f(x = 1, y) {
  return [x, y];
}
console.log(f()); // [1, undefined]
console.log(f(2)); // [2, undefined]
f(, 1); // 报错

// demo 2
function f(x, y = 5, z) {
  return [x, y, z];
}
console.log(f());  // [undefined, 5, undefined]
console.log(f(1));  // [1, 5, undefined]
console.log(f(1, , 2)); // 报错
console.log(f(1, undefined, 2));  // [1, 5, 2]

function foo(x = 5, y = 6) {
  console.log(x, y);
}
foo(undefined, null);  // 5, null


```

4.函数的作用域

如果参数默认值是一个变量，则该变量所处的作用域，与其他变量的作用域规则是一样的，则先是当前作用域，再是全局作用域。

```

var x = 1;
function f(x, y = x) {
  console.log(y);
}
console.log(f(2));  // 2


```

如果在调用时候，函数作用域内部的变量x没有生成，结果不一样。


```

let x = 1;
function f(y = x) {
  let x = 2;
  console.log(y); // 1
}
f();

```


但是如果，全局变量x不存在的话， 就会报错

```

function f( y = x) {
  let x = 2;
  console.log(y);
}
f(); // 报错 x is not defined


```

5.rest参数

ES6引入rest参数(形式为 "...变量名")，用于获取函数的多余参数，rest参数搭配的变量是一个数组，该变量将多余的参数放入一个数组中。


```

function add(...values) {
  let sum = 0;
  for(let i of values) {
    sum += i;
  }
  return sum;
}
console.log(add(2, 3, 5)); // 10


```

rest参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量。下面是一个利用rest参数改写数组push方法的例子。


```

function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3);  // 1,2,3


```


注意，rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

```

// 报错
function f(a, ...b, c) {
  // ...
}

```


6.扩展运算符

扩展运算符(spread) 是三个点 (...)， 它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。


```

console.log(...[1, 2, 3]); // 1 2 3
console.log(1, ...[2, 3, 4], 5); // 1 2 3 4 5

function add(x, y) {
  return x + y;
}

var numbers = [4, 38];
console.log(add(...numbers)); // 42

```

上面的代码 使用了扩展运算符，该运算符是一个数组，变为参数序列。

替代数组的apply方法

扩展运算符可以展开数组，所以不需要apply方法，将数组转为函数的参数。


```

// ES6
function f2(x, y, z) {
  console.log(x); // 0
  console.log(y); // 1
  console.log(z); // 2
}
var args = [0, 1, 2];
f(...args); 

// ES5的写法
console.log(Math.max.apply(null, [14, 3, 77]))  // 77
// ES6的写法
console.log(Math.max(...[14, 3, 77]))  // 77
// 等同于
console.log(Math.max(14, 3, 77));  // 77

// ES5的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1); // 0,1,2,3,4,5

// ES6的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
console.log(arr1); // 0,1,2,3,4,5

```


### 扩展运算符的运用


1.合并数组

```

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5 合并数组
var rets1 = arr1.concat(arr2, arr3);
console.log(rets1); // ["a", "b", "c", "d", "e"]

// ES6合并数组
var rets2 = [...arr1, ...arr2, ...arr3];
console.log(rets2); // ["a", "b", "c", "d", "e"]

```


2.与解构赋值组合

扩展运算符可以与解构赋值结合起来，用于生成数组。


```

const [first, ...rest1] = [1, 2, 3];
console.log(first); // 1
console.log(rest1); // [2, 3]

const [first2, ...rest2] = [];
console.log(first2); // undefined
console.log(rest2); // []

const [first3, ...rest3] = ['foo'];
console.log(first3); // foo
console.log(rest3); // []

```


如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错



```

const [...butLast, last] = [1, 2, 3, 4, 5]; // 报错
const [first, ...middle, last] = [1, 2, 3, 4, 5]; // 报错

```


扩展运算符可以将字符串转为真正的数组


```


[...'hello']
// [ "h", "e", "l", "l", "o" ]

var f = v => v;
console.log(f(2)); // 2

// 等价于如下函数
var f = function(v) {
  return v;
}

// 如果箭头函数不需要参数或需要多个参数的话，可以使用圆括号代表参数的部分
var f2 = () => 5;
// 等价于如下
var f = function() {
  return 5;
}

var sum = (n1, n2) => n1 + n2;

console.log(sum(1, 2)); // 3

// 等价于 如下函数
var sum = function(n1, n2) {
  return n1 + n2;
}

//  或者也可以这样写 
var sum2 = (n1, n2) => {
  return n1 + n2;
}
console.log(sum2(2, 3)); // 5

// 如果要返回一个对象的话， 需要使用圆括号括起来
var getData = id => ({id: id});
console.log(getData(1)); // {id: 1}

// 正常函数的写法 
[1, 2, 3].map(function(x) {
  return x * x;
});

// 箭头函数的写法 
[1, 2, 3].map(x => x * x);

```


7.函数参数的尾逗号

ECMASCRIPT2017 允许函数的最后一个参数有尾逗号。


```

// ES217
function douhao(a, b,) {
  // 正常
}
console.log(douhao(1,2,))


```


## 5.对象的扩展

1.属性的简洁表示法


```

var foo = 'bar';
var baz = {foo};
console.log(baz); // {foo: 'bar'}

// 等价于 
var baz = {foo: foo};

// ES6 允许在对象之中，直接写变量，这时，属性名为变量名，属性值为变量值；如下：
function f(x, y) {
  return {x, y};
}
console.log(f(5, 6)); // {x: 5, y: 6}

// 除了属性简写，方法也可以简写
var o = {
  method() {
    return 'Hello';
  }
};
// 上面的代码等价于如下代码：
var o = {
  method: function() {
    return 'Hello';
  }
};
// 如下代码：
var birth = '2017/1/1';
var Person = {
  name: '张三',
  birth,
  hello() {
    console.log('我的名字是', this.name);
    console.log('我的生日是', this.birth);
  }
}; 
Person.hello(); // 我的名字是 张三, 生日是 2017/1/1

// 用于函数的返回值，非常方便
function getPoint() {
  var x = 1;
  var y = 10;
  return {x, y};
}
console.log(getPoint());// {x:1, y:10}


```


2.属性名表达式


```

// ES6 允许字面量 定义对象时，用作为对象的属性名，即把表达式放在括号内
let propKey = 'foo';
var obj = {
  propKey: true,
  ['a' + 'bc']: 123
}
console.log(obj.propKey); // true
console.log(obj.abc); // 123

var lastWord = 'last world';
var a = {
  'first world': 'hello',
  [lastWord]: 'world'
};
console.log(a['first world']);  // hello
console.log(a['last world']);   // world
console.log(a[lastWord]);  // world

// 表达式还可以定义方法名
let obj2 = {
  ['h' + 'ello']() {
    return 'hi';
  }
}
console.log(obj2.hello()); // hi


```

3.Object.is()
ES5比较两个值是否相等，只有两个运算符，相等运算符("==")和严格相等运算符("==="), 他们都有缺点，前者会自动转换数据类型，后者NAN不等于自身，以及+0 等于 -0；ES6有该方法是同值相等算法，Object.is()是比较两个值是否严格相等，和('===')是一个含义


```

console.log(Object.is('foo', 'foo')); // true

console.log(Object.is({}, {}));  // false

console.log(+0 === -0) // true
console.log(NaN === NaN); // false

console.log(Object.is(+0, -0)); // false
console.log(Object.is(NaN, NaN)); // true

```


4.Object.assign()


```

// Object.assign()方法用于对象的合并，将源对象的所有可枚举属性，复制到目标对象中。第一个参数是目标对象，后面的参数都是源对象。
var target = { a: 1 };
var s1 = { b: 2};
var s2 = { c: 3};
Object.assign(target, s1, s2);
console.log(target); // {a:1, b:2, c:3}

// 注意：如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
var target2 = { a: 1, b: 1};
var s11 = { b:2, c:2 };
var s22 = {c:3};
Object.assign(target2, s11, s22);
console.log(target2);  // { a: 1, b:2, c:3 }


```


扩展运算符(...) 也可以用于合并两个对象，比如如下代码：


```

let ab = { ...a, ...b }; 

```


等价于


```

let ab = Object.assign({}, a, b);


```

```

// 如果该参数不是对象，则会先转成对象，然后返回
console.log(typeof Object.assign(2)); // 'object'



```

由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。


```

Object.assign(undefined) // 报错
Object.assign(null) // 报错

// Object.assign 方法实现的是浅拷贝，而不是深拷贝，如果对象某个属性值发生改变，那么合并对象的属性值也会发生改变。如下代码：
var obj1 = {a: {b: 1}};
var obj2 = Object.assign({}, obj1);
obj1.a.b = 2;
console.log(obj2.a.b); // 2

// 同名属性覆盖
var target = { a: {b: 'c', d: 'e' }};
var source = {a: {b: 'hello'}};
console.log(Object.assign(target, source)); // { a: {b: 'hello'}}

// Object.assign 可以用来处理数组，但是会把数组视为对象, 
console.log(Object.assign([1,2,3], [4, 5])); // [4, 5, 3]
// 上面代码中，Object.assign把数组视为属性名0,1,2的对象，因此原数组的0号属性4覆盖了目标数组的0号属性。


```
###5.常见用途
5-1 为对象添加属性


```

class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
console.log(new Point(1, 2)); // {x:1, y:2}

```

5-2 为对象添加方法


```

var A = function() {};
A.prototype = {
  init: function() {}
}
Object.assign(A.prototype, {
  test(a, b) {

  },
  test2() {

  }
});

var AInter = new A();
console.log(AInter);  // {init: function(){}, test: function(a, b){}, test2: function(){} }


```


5-3 克隆对象


```


// 3. 克隆对象 将原始对象拷贝到一个空对象内，就得到了原始对象的克隆
function clone(origin) {
  return Object.assign({}, origin);
}
var obj = {
  name: 'xiaosan'
};
console.log(clone(obj)); // {name: 'xiaosan'}

```

采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值，如果想要保持原型继承，如下代码：



```

function clonePrototype(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
var AA = {
  init: function() {

  }
}
AA.prototype = {
  BB: function() {

  }
}
var AAP = clonePrototype(AA);
console.log(AAP);  // {init: function(){}, prototype:xx}


```

### 6-1  Object.keys() 对象转为数组


```

// ES6引入了Object.keys方法，返回一个数组(对象转为数组)，成员是参数对象自身的（不含继承的）所有可遍历属性的键名。
var obj1 = {
  foo: 'bar',
  baz: 42
};
console.log(Object.keys(obj1));  // ['foo', 'baz']


```


###6-2 Object.values()
该方法返回一个数组，成员是参数对象自身(不含继承的)所有可遍历属性的键值。

```

var obj2 = {
  foo: 'bar',
  baz: 42
};

console.log(Object.values(obj2)); // ["bar", 42];

// 如果参数不是对象，Object.values 会先将其转为对象。最后返回空数组
console.log(Object.values(42)); // []
console.log(Object.values(true)); // []


```


### 6-3 Object.entries()

该方法返回一个数组，成员是参数自身(不含继承的)所有可遍历属性的键值对数组。


```

var obj3 = { foo: 'bar', baz: 42};
console.log(Object.entries(obj3)); // [ ["foo", "bar"], ["baz", 42] ]


```

## 6.set 和 Map的数据结构


set类似于数组，但是成员值都是唯一的，没有重复的值。

set 有如下方法

1.add(value): 添加某个值，返回Set结构本身

2.delete(value): 删除某个值，返回一个布尔值，表示删除是否成功。

3.has(value): 返回一个布尔值，表示该值是否为Set的成员。

4.clear() 清除所有的成员，没有返回值。

```

var s = new Set();
[2, 3, 5, 4, 5, 2, 2].map(x => s.add(x));
for (let i of s) {
  console.log(i); // 2, 3, 5, 4
}

// Set函数可以接受一个数组(或类似数组的对象)作为参数，用来初始化。
var set = new Set([1, 2, 3, 4, 4]);
console.log([...set]); // [1, 2, 3, 4]

var items = new Set([1, 2, 3, 4, 4, 5, 6, 5]);
console.log(items.size); // 6

function getElems() {
  return [...document.querySelectorAll('p')];
}
var s2 = new Set(getElems());
console.log(s2.size); // 2


```
去除数组重复的成员



```

var arrs = [1, 2, 3, 1, 3, 4];
console.log([...new Set(arrs)]); // [1, 2, 3, 4]

// 向Set加入值的时候，不会发生类型转换，因此 5 和 "5" 是两个不同的值，但是NaN等于NaN, 如下：
let s3 = new Set();
let a = NaN;
let b = NaN;
s3.add(a);
s3.add(b);
console.log(s3); // {NaN}

// 但是两个对象是不相等的
let s4 = new Set();
s4.add({});
console.log(s4.size); // 1

s4.add({});
console.log(s4.size); // 2

var s5 = new Set();
s5.add(1).add(2).add(2);
console.log(s5.size); // 2
console.log(s5.has(1)); // true
console.log(s5.has(2)); // true
console.log(s5.has(3)); // false
s5.delete(2);
console.log(s5.has(2)); // false

// Array.from 方法也可以将Set结构转为数组
var items2 = new Set([1, 2, 3, 4, 5]);
var array = Array.from(items2);
console.log(array); // [1, 2, 3, 4, 5]

```

去除数组重复的另外一种方法

```
function unique(array) {
  return Array.from(new Set(array));
}
console.log(unique([1, 2, 2, 3])); // [1, 2, 3]

```

遍历操作

Set结构的实列有四个遍历方法

1.keys() 返回键名的遍历器。

2.values() 返回键值的遍历器。

3.entries() 返回键值对的遍历器。

4.forEach() 使用回调函数遍历每个成员。


```

let set = new Set(['red', 'green', 'blue']);
for (let item of set.keys()) {
  console.log(item); // red, green blue
}

for (let item of set.values()) {
  console.log(item); // red, green blue
}

for (let item of set.entries()) {
  console.log(item); // ['red', 'red']  ['green', 'green'] ['blue', 'blue']
}

// Set结构的实列默认可遍历，它的默认遍历生成函数就是它的values方法
// 因此可以省略values方法，直接使用for.. of 循环遍历Set
let set2 = new Set(['red', 'green', 'blue']);
for (let x of set2) {
  console.log(x); // red green blue
}

// forEach()方法
let s3 = new Set([1, 2, 3]);
s3.forEach((value, key) => console.log(value * 2)); // 2 4 6

// 遍历的应用 
// 扩展运算符(...) 内部使用 for...of循环，
let s6 = new Set(['a', 'b', 'c']);
let arr6 = [...s6];
console.log(arr6); // ['a', 'b', 'c']

// 使用Set可以很容易地实现并集， 交集和差集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]);
console.log(union); // {1, 2, 3, 4}

// 交集
let jj = new Set([...a].filter(x => b.has(x)));
console.log(jj); // {2, 3}

// 差集
let diff = new Set([...a].filter(x => !b.has(x)));
console.log(diff); // {1}

```

Map


```

// Object结构提供了 '字符串-值'的对应，Map结构提供了值-值的对应，但是'键'的范围不限于字符串，各种类型的值(包括对象)都可以当做键

var m = new Map();
var o = {p: 'hello world'};

m.set(o, 'content');
console.log(m.get(o)); // 'content'
console.log(m.has(o)); // true
console.log(m.delete(o)); // true
console.log(m.has(o)); // false

// 作为构造函数，Map也可以接受一个数组作为参数，该数组的成员是一个个表示键值对的数组。
var map = new Map([
  ['name', '张三'],
  ['title', 'aa']
])
console.log(map.size); // 2
console.log(map.has('name')); // true
console.log(map.get('name')); // 张三
console.log(map.has('title')); // true
console.log(map.get('title')); // aa

// 字符串true 和 布尔值true是两个不同的键
var m2 = new Map([
  [true, 'foo'],
  ['true', 'bar']
]);
console.log(m2.get(true)); // 'foo'
console.log(m2.get('true')); // 'bar'

// 如果对同一个键多次赋值，后面的值将覆盖前面的值
let m3 = new Map();
m3.set(1, 'aaa').set(1, 'bbb');
console.log(m3.get(1)); // 'bbb'

// 如果读取一个未知的键，则返回undefined
console.log(new Map().get('aaaaassd')); // undefined

// 对同一个对象引用是读取不到值的，因为对象是比较内存地址的
var m4 = new Map();
m4.set(['a'], 555);
console.log(m4.get(['a'])); // undefined

m4.set(NaN, 123);
console.log(m4.get(NaN)); // 123
m4.set(-0, 123);
console.log(m4.get(+0)); // 123

// map 提供三个遍历器生成函数和一个遍历方法
// 1. keys()， 2. values(), 3. entries(). 4. forEach() Map遍历的顺序就是插入的顺序
let m5 = new Map([
  ['a', 'no'],
  ['y', 'yes']
]);
for (let key of m5.keys()) {
  console.log(key); // a，y
}

for(let value of m5.values()) {
  console.log(value); // 'no', 'yes'
}

for (let item of m5.entries()) {
  console.log(item[0], item[1]); // 'a' 'no' 'y' 'yes'
}

// Map结构的默认遍历器接口 (Symbol.iterator属性) 就是 entries方法， map[Symbol.iterator] === map.entries
// Map结构转为数组结构，比较快速的方法可以使用扩展运算符(...)
let m6 = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three']
]);
console.log([...m6.keys()]); // [1, 2, 3]

console.log([...m6.values()]); // ['one', 'two', 'three']

console.log([...m6.entries()]); //[[1, 'one'], [2, 'two'], [3, three]]

console.log([...m6]); //[[1, 'one'], [2, 'two'], [3, three]]

// 结合数组的map方法和filter方法，可以实现map的遍历和过滤
let m0 = new Map().set(1, 'a').set(2, 'b').set(3, 'c');
let m00 = new Map([...m0].filter(([k, v]) => k < 3)); // {1 => 'a', 2 => 'b'}

let m11 = new Map([...m0].map(([k, v]) => [k*2, '_'+v])); 
// {2 => '_a', 4 => '_b', 6 => '_c'}

// Map转为数组
let amap = new Map().set(true, 7).set({foo: 3}, ['abc']);
console.log([...amap]); // [ [true, 7], [{foo: 3}, ['abc'] ] ]

// 数组转为Map
console.log(new Map([[true, 7],[{foo:3}, ['abc']]]));// Map {true => 7, Object {foo: 3} => ['abc']}

// Map转为对象
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}
let myMap = new Map().set('yes', true).set('no', false);
console.log(strMapToObj(myMap)); // {yes: true, no: false}

// 对象转为map
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
console.log(objToStrMap({yes: true, no: false})); // [ ['yes', ture], ['no', false]]

// Map转为json
// Map转为JSON要区分二种情况，一种情况是,Map的键名都是字符串，这时可以选择转为对象的JSON
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}
let myMap2 = new Map().set('yes', true).set('no', false);
console.log(strMapToJson(myMap2)); // '{"yes": true, "no": false}'

// 第二种情况是，Map的键名有非字符串，这时候可以选择转为数组的JSON
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}
let myMap3 = new Map().set(true, 7).set({foo: 3}, ['abc']);
console.log(mapToArrayJson(myMap3)); // '[[true, 7], [{"foo": 3}, ["abc"]]]'

// JSON转为Map  
// 正常情况下，所有键名都是字符串
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}
console.log(jsonToStrMap('{"yes": true, "no": false}')); // Map {'yes' => true, 'no' => false}

// 有一种特殊情况，整个JSON就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为Map。这往往是数组转为JSON的逆操作。
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}


```


## 7.class


 ES6的class
 
 
 ```
 
 // ES5 定义类
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function() {
  return '(' + this.x + ', ' + this.y + ')';
}

var p = new Point(1, 2);
console.log(p);

// ES6的语法,方法之间不需要使用逗号分隔
class Point2 {
  // 构造函数
  constructor(x, y) {
    
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

var p2 = new Point2(1, 2);
console.log(p2);

// 类的数据类型就是函数，类本身就指向构造函数
class Point3 {

}
console.log(typeof Point3); // 'function'
console.log(Point === Point.prototype.constructor); // true

// ES6 和 ES5 定义原型的区别如下：
class Point4 {
  constructor(props) {
    
  }
  toString() {}
  toValue() {}
}
// 等价于如下ES5的代码
Point4.prototype = {
  toString() {},
  toValue() {}
}

// 也可以使用Object.assign方法合并对象到原型去，如下代码：
class Point5 {
  constructor(props) {
    
    // ...
  }
}
Object.assign(Point5.prototype, {
  toString() {},
  toValue() {}
});


 ```
 
 
 class的继承
 
 
 
 ```
 
 // 父类
class Point {
  init(x, y) {
    console.log('x:'+x, 'y:'+y);
  }
}

// 子类继承父类
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的 constructor(x, y)
    this.color = color;
  }
}
var c = new ColorPoint(1, 2, 'red');
console.log(c.init(1, 2)); // 继承父类，因此有init方法 x:1, y:2
console.log(c.color); // 'red'

// 子类必须在constructor方法中调用super方法，否则新建实例会报错，这是因为子类没有自己的this对象，而是继承父类的this对象，
// 如果不调用super方法，子类就得不到this对象。如下代码：
class Point2 {

}
class Color2 extends Point2 {
  constructor() {
    
  }
}
let cp = new Color2(); // 报错


 ```
 
 
 注意： 在子类构造函数中，只有调用super之后，才可以使用this关键字，否则会报错，只有super方法才能返回父类的实例。
 
 
 Object.getPrototypeOf()
 
 
该方法可以用来从子类上获取父类；如下代码：



```

// 父类
class Point {
  init(x, y) {
    console.log('x:'+x, 'y:'+y);
  }
}

// 子类继承父类
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的 constructor(x, y)
    this.color = color;
  }
}
console.log(Object.getPrototypeOf(ColorPoint) === Point); // true


```


Class的静态方法


```

// 如果在一个方法中，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用
class Foo {
  static init() {
    return 'hello'
  }
}
console.log(Foo.init()); // 'hello'

var foo = new Foo();
console.log(foo.init()); // 报错


// 父类的静态方法，可以被子类继承
class Foo {
  static init() {
    return 'hello';
  }
}
class Bar extends Foo {

}
console.log(Bar.init()); // 'hello'

// 静态方法也可以从super对象上调用
class Foo2 {
  static init() {
    return 'world';
  }
}

class Bar2 extends Foo2 {
  static init2() {
    return super.init() + ', hello';
  }
}
console.log(Bar2.init2()); // world, hello

```

Class的静态属性和实例属性


```


// 静态属性 其他的写法不可以
class Foo {

}
Foo.prop = 1;
console.log(Foo.prop); // 1

// 类的实例属性 可以使用等式，写入类的定义之中
class MyClass {
  myProp = 42;
  constructor() {
    console.log(this.myProp); // 42
  }
}
// react 的写法
class ReactCounter extends React.Component {
  state = {
    count: 0
  };
}
// 相当于如下的写法
class ReactCounter2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
}

// 还可以使用如下新写法
class ReactCounter3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  state;
}


```
