# css3 实现图片等比例放大与缩小

在工作中，经常会碰到图片缩放的情况，比如服务器端返回的图片大小，可能大小不同，有的大，有的小，服务器端返回的图片大小我们不能控制的，但是在我们设计稿的时候，可能会规定每张图片的大小为固定的宽度和高度，比如200px*200px这样的。我们这边使用的是背景图片来做的，但是如果直接使用 img标签这样引入图片貌似不行，因此我们目前只能使用背景图片来做。对于大一点的图片我们可以缩放的，但是对于很小
很小的图片，我们把他们拉伸的话，可能会有点点模糊，但是一般的情况下是不会有这种情况，因为对于图片的缩放，服务器端不太可能会返回一张很小很小的图片回来，一般都是比较大的。

## 1.等比例缩放(1:1)
我们先来看看实现图片等比例缩放的情况下：
html代码如下：

```
<div class="demo1-1">
  <div class="zoomImage" style="background-image: url(./images/1.jpg)"></div>
</div>
<div class="demo1-1">
  <div class="zoomImage" style="background-image: url(./images/2.jpeg)"></div>
</div>
<div class="demo1-1">
  <div class="zoomImage" style="background-image: url(./images/3.png)"></div>
</div>
```
css代码如下：

```
.demo1-1 {
  float: left;
  width: 200px;
  height: 200px;
  overflow: hidden;
}
.zoomImage {
  width: 100%;
  height: 0;
  padding-top: 100%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
```
如上代码就可以实现了。下面是简单的代码分析一下实现方式：

1-1 在父容器div.demo1-1中，定义容器显示的大小为 200px*200px；这个就是我们设计稿中显示的大小。

1-2 对于图片的div先设置如下样式：

```
width: 100%;
height: 0;
padding-top: 100%;
overflow: hidden;
```

如上代码height虽然设置为0，但是padding-top设置了100%，并且宽度width:100%, 高度div是按照1:1的方式来实现的。

至于为什么需要使用padding-top来实现 ，可以看[这篇文章](http://www.cnblogs.com/tugenhua0707/p/5260411.html#_labe10)

下面如下样式：

```
background-position: center center;
background-repeat: no-repeat;
background-size: cover;

```
是让背景图片居中显示，并且不重复，且背景大小覆盖整个容器就可以了；

下面是所有的代码了：


```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    .demo {
      width: 100%;
      height: 300px;
      overflow: hidden;
    }
    .demo1-1 {
      float: left;
      width: 200px;
      height: 200px;
    }
    .zoomImage, .zoomImage2, .zoomImage3{
      width: 100%;
      height: 0;
      padding-top: 100%;
      overflow: hidden;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      -webkit-background-size: cover;
      -moz-background-size: cover;
    }
    .zoomImage2 {
      padding-top: 75%;
    }
    .zoomImage3 {
      padding-top: 133.33%;
    }
  </style>
</head>
<body>
  <h2>第一张图片633*950，第二张图片1280*800，第三张图片100*100</h2>
  <div class="demo">
    <h3>对上面的三张图片的宽和高分别等比例缩放到200*200像素(1:1)</h3>
    <div class="demo1-1">
      <div class="zoomImage" style="background-image: url(./images/1.jpg)"></div>
    </div>
    <div class="demo1-1">
      <div class="zoomImage" style="background-image: url(./images/2.jpeg)"></div>
    </div>
    <div class="demo1-1">
      <div class="zoomImage" style="background-image: url(./images/3.png)"></div>
    </div>
  </div>

  <div class="demo">
    <h3>对上面的三张图片的宽和高进行4:3的缩放</h3>
    <div class="demo1-1">
      <div class="zoomImage2" style="background-image: url(./images/1.jpg)"></div>
    </div>
    <div class="demo1-1">
      <div class="zoomImage2" style="background-image: url(./images/2.jpeg)"></div>
    </div>
    <div class="demo1-1">
      <div class="zoomImage2" style="background-image: url(./images/3.png)"></div>
    </div>
  </div>

  <div class="demo">
    <h3>对上面的三张图片的宽和高进行3:4的缩放</h3>
    <div class="demo1-1">
      <div class="zoomImage3" style="background-image: url(./images/1.jpg)"></div>
    </div>
    <div class="demo1-1">
      <div class="zoomImage3" style="background-image: url(./images/2.jpeg)"></div>
    </div>
    <div class="demo1-1">
      <div class="zoomImage3" style="background-image: url(./images/3.png)"></div>
    </div>
  </div>
</body>
</html>
```

[demo查看](http://www.baidu.com)














