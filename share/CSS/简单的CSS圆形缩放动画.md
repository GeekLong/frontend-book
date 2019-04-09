# 简单的CSS圆形缩放动画
代码如下：


```
<!DOCTYPE html>
<html>
  <head>
    <title>css圆形缩放动画</title>
    <style>
      .circular {
        position: relative;
        width: 48px;
        height: 48px;
      }
      .circular i {
        position: absolute;
        top: 0;
        left: 0;
        width: 48px;
        height: 48px;
      }
      .circular i:before {
        content: '';
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #20a839;
      }
      .circular i:after {
        content: '';
        transition: all .3s;
        border-radius: 50%; 
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: scale(0);
        background-color: #30cc54;
      }
      .circular:hover i:after {
        transform: scale(1);
      }
    </style>
  </head>
  <body>
    <div class="circular">
      <i></i>
    </div>
  </body>
</html>

```