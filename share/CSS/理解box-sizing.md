# 理解 boxsizing

什么是css盒模型？css盒模型包括如下属性：内容(content)，填充(padding)，边框(border)，边界(margin).

 这些东西我们可以拿日常生活中的列子来打比方，比如我现在在京东买了一台显示器，那么就会以盒子打包过来，那么显示器就是我们说的内容(content)，而填充(padding)就是怕盒子里面的显示器损坏而添加的泡沫或者其他坑震的辅料，边框（border）就是盒子本身了，至于边界(margin)则是盒子摆放的时候不能全部堆在一起，要留一定的空隙保持通风。比如如下：
 
 ![](http://static.oschina.net/uploads/img/201503/10153449_ZoQu.png)
 
 因此 盒子的宽度 = width + padding(left, right) + border(left, right) 
 
盒子的高度 = height + padding(top, bottom) + border(top, bottom)

注意：当我们想设置盒子的宽度为200px的时候会出现一个问题是：css设置的宽度仅仅是内容区的宽度，而不是盒子的宽度，所以当我们使用css设置width=200px的时候，是设置内容的宽度为200px,而不是盒子的宽度，因此盒子的宽度还需要加上padding和border，因此导致盒子的宽度会大于200px。因此当我们设置盒子的宽度的时候，需要使用css的计算的宽度 减去 padding - border ，
最后就是内容的宽度，使用css设置内容的宽度了。但是使用 css3中的 box-sizing, 它会帮我们解决这个问题。

box-sizing的属性如下：

border-box, content-box, inherit

box-sizing: border-box 的理解：可以这么理解，当我们使用css设置元素的宽度的时候，并且使用了 box-sizing：border-box 这个属性的时候，那么css设置的宽度就是盒子的宽度，
当padding和border发生变化的时候，content(内容区)的宽度会自适应。

box-sizing: content-box的理解；使用了 box-sizing: content-box的时候，当我们使用css设置元素宽度的时候，实际就是内容(content)的宽度，当我们增加padding和border的时候
，会使盒子的宽度变大，导致布局不能自适应。

box-sizing: inherit的理解：继承 父元素 box-sizing属性的值, 其实效果和 box-sizing: content-box 类似。

浏览器支持程度；IE8及以上版本支持该属性，Firefox 需要加上浏览器厂商前缀-moz-，对于低版本的IOS和Android浏览器也需要加上-webkit-， 因此可以如下定义：


```

*, *:before, *:after {
　-moz-box-sizing: border-box;
　-webkit-box-sizing: border-box;
　box-sizing: border-box;
}


```

实列demo如下：


```

<!DOCTYPE html>
 <html>
    <head>
        <meta charset="utf-8">
        <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
        <meta content="yes" name="apple-mobile-web-app-capable">
        <meta content="black" name="apple-mobile-web-app-status-bar-style">
        <meta content="telephone=no" name="format-detection">
        <meta content="email=no" name="format-detection">
        <title>标题</title>
        <link rel="shortcut icon" href="/favicon.ico">
        <style>
          .container { width: 100%; margin-bottom: 40px; overflow: hidden;}
          .left, .content, .right { float: left; }
          .left { width: 20%; background-color: red;}
          .content { width: 60%; background-color: yellow; box-sizing: border-box; padding: 0 20px;}
          .right {width: 20%; background-color: blue; }

          .left2, .content2, .right2 { float: left; }
          .left2 { width: 20%; background-color: red;}
          .content2 { width: 60%; background-color: yellow; box-sizing: content-box; padding: 0 20px;}
          .right2 {width: 20%; background-color: blue; }

          .left3, .content3, .right3 { float: left; }
          .left3 { width: 20%; background-color: red;}
          .content3 { width: 60%; background-color: yellow; box-sizing: inherit; padding: 0 20px;}
          .right3 {width: 20%; background-color: blue; }

        </style>
    </head>
    <body>
      <h2>box-sizing: border-box 的demo</h2>
      <div class='container'>
        <div class="left">left</div>
        <div class="content">content</div>
        <div class="right">right</div>
      </div>
      <h2>box-sizing: content-box 的demo</h2>
      <div class='container'>
        <div class="left2">left</div>
        <div class="content2">content</div>
        <div class="right2">right</div>
      </div>

      <h2>box-sizing: inherit 的demo</h2>
      <div class='container'>
        <div class="left3">left</div>
        <div class="content3">content</div>
        <div class="right3">right</div>
      </div>

    </body>
</html>

```