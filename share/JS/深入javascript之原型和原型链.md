# 深入javascript之原型和原型链

原型和原型链是js中的难点也是重点，明白了原型和原型链会让我们在后面不管是学习还是工作都会更加高效，并且原型和原型链会是面试中必不可少的话题。看完此篇文章一定会让你对原型，原型链有深刻全面的了解。

## 一，函数对象

所有引用类型（函数，数组，对象）都拥有__proto__属性（隐式原型）

所有函数拥有prototype属性（显式原型）（仅限函数）

原型对象：拥有prototype属性的对象，在定义函数时就被创建

## 二，构造函数

先复习下构造函数


```

//创建构造函数
        function Word(words){
            this.words = words;
        }
        Word.prototype = {
            alert(){
                alert(this.words);
            }
        }
        //创建实例
        var w = new Word("hello world");
        w.print = function(){
            console.log(this.words);
            console.log(this);  //Person对象
        }
        w.print();  //hello world
        w.alert();  //hello world



```


print()方法是w实例本身具有的方法，所以w.print()打印hello world；alert()不属于w实例的方法，属于构造函数的方法，w.alert()也会打印hello world，因为实例继承构造函数的方法。


 实例w的隐式原型指向它构造函数的显式原型，指向的意思是恒等于
 
 ```
  w.__proto__ === Word.prototype
  
 ```
 
 
 当调用某种方法或查找某种属性时，首先会在自身调用和查找，如果自身并没有该属性或方法，则会去它的__proto__属性中调用查找，也就是它构造函数的prototype中调用查找。所以很好理解实例继承构造函数的方法和属性：
 
 
 w本身没有alert()方法，所以会去Word()的显式原型中调用alert()，即实例继承构造函数的方法。        
 
 
## 三，原型和原型链



```

	Function.prototype.a = "a";
	Object.prototype.b = "b";
	function Person(){}
	console.log(Person);    //function Person()
	let p = new Person();
	console.log(p);         //Person {} 对象
	console.log(p.a);       //undefined
	console.log(p.b);       //b



```


想一想p.a打印结果为undefined，p.b结果为b

解析：p是Person()的实例，是一个Person对象，它拥有一个属性值
```
__proto__
```
，并且
```
__proto__
```
是一个对象，包含两个属性值constructor和
```
__proto__
```

```

		console.log(p.__proto__.constructor);   //function Person(){}
        console.log(p.__proto__.__proto__);     //对象{}，拥有很多属性值


```


我们会发现```p.__proto__.constructor```返回的结果为构造函数本身，```p.__proto__.__proto__```有很多参数

![](https://img-blog.csdn.net/20180302175002724)


我们调用constructor属性，```p.___proto__.__proto__.constructor```得到拥有多个参数的Object()函数，Person.prototype的隐式原型的constructor指向Object()，即```Person.prototype.__proto__.constructor == Object()```

 从```p.__proto__.constructor```返回的结果为构造函数本身得到Person.prototype.constructor == Person()所以```p.___proto__.__proto__== Object.prototype```
 
 
 
 
 所以p.b打印结果为b，p没有b属性，会一直通过```__proto__```向上查找，最后当查找到Object.prototype时找到，最后打印出b，向上查找过程中，得到的是Object.prototype，而不是Function.prototype，找不到a属性，所以结果为undefined，这就是原型链，通过```__proto__```向上进行查找，最终到null结束


```

		console.log(p.__proto__.__proto__.__proto__);   //null
        console.log(Object.prototype.__proto__);        //null

```


 大家理解刚才的过程，相信下面这些应该也都明白
 
 
 ```
 

	//Function
	function Function(){}
	console.log(Function);  //Function()
	console.log(Function.prototype.constructor);    //Function()
	console.log(Function.prototype.__proto__);      //Object.prototype
	console.log(Function.prototype.__proto__.__proto__);    //NULL
	console.log(Function.prototype.__proto__.constructor);  //Object()
	console.log(Function.prototype.__proto__ === Object.prototype); //true


 ```
 
 
 
 总结：
 
1.查找属性，如果本身没有，则会去__proto__中查找，也就是构造函数的显式原型中查找，如果构造函数中也没有该属性，因为构造函数也是对象，也有__proto__，那么会去它的显式原型中查找，一直到null，如果没有则返回undefined

2.```p.__proto__.constructor  == function Person(){}```

3.```p.___proto__.__proto__== Object.prototype```

4.```p.___proto__.__proto__.__proto__== Object.prototype.__proto__ == null ```

5.通过```__proto__```形成原型链而非protrotype





最后附上一张图，大家阅读完之后，看图应该可以很容易理解
![]( https://img-blog.csdn.net/2018030222305858)
 
 


 