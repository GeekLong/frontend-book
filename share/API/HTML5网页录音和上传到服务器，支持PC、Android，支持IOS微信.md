# HTML5网页录音和上传到服务器，支持PC、Android，支持IOS微信

## 录音代码

本示例代码支持PC、Android、IOS(仅Safari)中使用，如果用RecordApp可增加对IOS(微信浏览器、小程序)的支持。

看万遍代码不如行动一遍，新建一个html文件，把下面三段代码复制到文件内，双击浏览器打开就能看到效果。

```
<!-- 先加载js录音库，注意：你应该把js clone到本地使用 --><meta charset="utf-8" />
<script src="https://xiangyuecn.github.io/Recorder/recorder.mp3.min.js"></script>

<input type="button" onclick="startRec()" value="开始录音">
<hr>
<input type="button" onclick="playRec()" value="结束并播放">
<input type="button" onclick="uploadRec()" value="结束并上传">

<script>
var rec;
function startRec(){
	rec=Recorder();//使用默认配置，mp3格式
	
	//打开麦克风授权获得相关资源
	rec.open(function(){
		//开始录音
		rec.start();
	},function(msg,isUserNotAllow){
		//用户拒绝了权限或浏览器不支持
		alert((isUserNotAllow?"用户拒绝了权限，":"")+"无法录音:"+msg);
	});
};
</script>

```

## 上传服务器代码

```
<script>
function uploadRec(){
	//停止录音，得到了录音文件blob二进制对象，想干嘛就干嘛
	rec.stop(function(blob,duration){
		/*
		blob文件对象，可以用FileReader读取出内容
		，或者用FormData上传，本例直接上传二进制文件
		，对于普通application/x-www-form-urlencoded表单上传
		，请参考github里面的例子
		*/
		var form=new FormData();
		form.append("upfile",blob,"recorder.mp3"); //和普通form表单并无二致，后端接收到upfile参数的文件，文件名为recorder.mp3
		
		//直接用ajax上传
		var xhr=new XMLHttpRequest();
		xhr.open("POST","http://baidu.com/修改成你的上传地址");//这个假地址在控制台network中能看到请求数据和格式，请求结果无关紧要
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				alert(xhr.status==200?"上传成功":"测试请先打开浏览器控制台，然后重新录音，在network选项卡里面就能看到上传请求数据和格式了");
			}
		}
		xhr.send(form);
	},function(msg){
		alert("录音失败:"+msg);
	});
};
</script>


```


## 立即播放代码

```

<script>
function playRec(){
	//停止录音，得到了录音文件blob二进制对象，想干嘛就干嘛
	rec.stop(function(blob,duration){
		var audio=document.createElement("audio");
		audio.controls=true;
		document.body.appendChild(audio);
		
		//非常简单的就能拿到blob音频url
		audio.src=URL.createObjectURL(blob);
		audio.play();
	},function(msg){
		alert("录音失败:"+msg);
	});
};
</script>

```

## Recorder简介


Recorder用于html5录音，为一个纯粹的js库，支持大部分已实现getUserMedia的移动端、PC端浏览器，包括腾讯Android X5内核(QQ、微信)。
录音默认输出mp3格式，另外可选wav格式（此格式录音文件超大）；有限支持ogg、webm、amr格式；支持任意格式扩展（前提有相应编码器）。

小巧：如果对录音文件大小没有特别要求，可以仅仅使用录音核心+wav编码器，源码不足300行，压缩后的recorder.wav.min.js不足4kb。mp3使用lamejs编码，压缩后的recorder.mp3.min.js开启gzip后54kb。

由于IOS(11.X、12.X)上只有Safari支持getUserMedia，其他浏览器均不支持H5录音，因此额外针对IOS对Recorder进行了进一步的兼容封装，升级成了RecordApp，用于支持微信（含浏览器、小程序web-view），另外RecordApp对Hybrid App也提供了更加优秀的支持。

由于RecordApp需要微信公众(订阅)号提供JsSDK录音支持，所以开发难度会大些，但支持的环境更多。Recorder拿来就能用，具体使用哪个请参考下表：


| 支持   | Recorder    |  RecordApp
| --------   | -----:  | -----:  | 
|PC浏览器|√|√
|Android浏览器|√|√
|Android微信(含小程序)|√|√
|Android Hybrid App|√|√
|IOS Safari|√|√
|IOS微信(含小程序)||√
|IOS Hybrid App||√
|IOS其他浏览器||
|开发难度|简单|复杂
|第三方依赖|无|依赖微信公众号


## 最后

详细使用和教程请到GitHub查看: [https://github.com/xiangyuecn/Recorder]()