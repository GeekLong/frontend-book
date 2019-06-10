# 你或许可以这样优化 if else 结构

最近部门在对以往的代码做一些优化，我在代码中看到一连串的 if(){}else if(){} 的逻辑判断。这明显是有优化空间的。

由于内部代码不适合分享，这里我就用 <输出今天为星期几> 来讲讲逻辑判断优化的一些方案。


我们在项目中使用的很可能会有多层的嵌套，不像我的例子只有一层。不过其优化的思想是大致相同的。由于 returnWeekday() 方法异常之简单，所以提前声明。

### 写一个 returnWeekday() 方法返回"今天是星期*"

当我们开始拿到需求的时候，看到一系列的逻辑判断，首先想到的应该就是 if 语句了。

代码如下：

```
function returnWeekday(){
    let string = "今天是星期";
    let date = new Date().getDay();
    if (date === 0) {
        string += "日";
    } else if (date === 1) {
        string += "一";
    } else if (date === 2) {
        string += "二";
    } else if (date === 3) {
        string += "三";
    } else if (date === 4) {
        string += "四";
    } else if (date === 5) {
        string += "五";
    } else if (date === 6) {
        string += "六";
    }
    return string
}
console.log(returnWeekday())

```
当我们写完了这样的代码，第一感觉就是 else if 块是不是太多了。

上面的代码确实 else if 块太多了，看着就不舒服。


### 这里我们使用 switch 语句优化一遍代码。


代码如下：

```

function returnWeekday(){
    let string = "今天是星期";
    let date = new Date().getDay();
    switch (date) {
        case 0 :
            string += "日";
            break;
        case 1 :
            string += "一";
            break;
        case 2 :
            string += "二";
            break;
        case 3 :
            string += "三";
            break;
        case 4 :
            string += "四";
            break;
        case 5 :
            string += "五";
            break;
        case 6 :
            string += "六";
            break;
    }
    return string
}
console.log(returnWeekday())


```

### 使用数组来优化


```

function returnWeekday(){
    let string = "今天是星期";
    let date = new Date().getDay();
    // 使用数组
    let dateArr = ['天','一','二','三','四','五','六'];
    return string + dateArr[date]
}
console.log(returnWeekday())


```

### 使用对象来优化

```

function returnWeekday(){
    let string = "今天是星期";
    let date = new Date().getDay();
    // 使用对象
    dateObj = { 
        0: '天', 
        1: "一", 
        2: "二", 
        3: "三", 
        4: "四", 
        5: "五", 
        6: "六", 
    };
    return string + dateObj[date]
}
console.log(returnWeekday())


```

### 使用 charAt 字符方法

```

// charAt 定位方法
function returnWeekday(){
    return "今天是星期" + "日一二三四五六".charAt(new Date().getDay());
}
console.log(returnWeekday())

```


## 需求变动

这个时候，有人希望 returnWeekday() 方法不仅返回今天是周几，还需要区分工作日和休息日，调用相关方法。


```

function returnWeekday(){
    let string = "今天是星期";
    let date = new Date().getDay();
    // 使用对象
    dateObj = { 
        0: ['天','休'], 
        1: ["一",'工'], 
        2: ["二",'工'], 
        3: ["三",'工'], 
        4: ["四",'工'], 
        5: ["五",'工'], 
        6: ["六",'休'], 
    }
    // 类型，这里也可以对应相关方法
    dayType = {
        '休': function(){
            // some code
            console.log('为休息日')
        },
        '工': function(){
            // some code
            console.log('为工作日')
        }
    }
    let returnData = {
        'string' : string + dateObj[date][0],
        'method' : dayType[dateObj[date][1]]
    }
    return returnData
};
console.log(returnWeekday().method.call(this))


```

## 这里在给出一些常见的优化手段。

```

//滚动监听，头部固定
handleScroll: function () {
    let offsetTop = this.$refs.pride_tab_fixed.getBoundingClientRect().top;
    if( offsetTop < 0 ){
        this.titleFixed = true
    } else {
        this.titleFixed = false
    }
    
    // 改成三元
    (offsetTop < 0) ? this.titleFixed = true : this.titleFixed = false;
    
    // 我们发现条件块里面的赋值情况是布尔值，所以可以更简单
    this.titleFixed = offsetTop < 0;
}


```

### 逻辑与运算符

有些时候我们可以使用逻辑与运算符来简化代码

```

if( falg ){
    someMethod()
}


```
可以改成：

```
falg && someMethod();

```

### 使用 includes 处理多重条件

```

if( code === '202' || code === '203' || code === '204' ){
    someMethod()
}

```

可以改成

```

if( ['202','203','204'].includes(code) ){
    someMethod()
}

```