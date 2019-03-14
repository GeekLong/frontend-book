# 安装webpack到全局
在学习构建之前，我们来在本地文件新建一个存放项目的文件夹，比如叫demo1这个项目，然后进入demo1该项目的根目录后，执行命令 npm init
运行下，一路回车(先简单的来)，就会生成一个package.json文件。

在项目中直接运行如下命令，就可以把webpack安装到全局去；如下命令：

```
npm install -g webpack
```

# 安装webpack到本项目。
在本项目中，执行如下命令，就可以把webpack安装到本地项目中，如下命令：

```
npm install --save-dev webpack

```

# 如何使用webpack？
在编写webpack代码之前，我们先搭建好目录结构如下：

```
### 目录结构如下：
demo1                                       # 工程名
|   |--- dist                               # 打包后生成的目录文件             
|   |--- node_modules                       # 所有的依赖包
|   |--- js                                 # 存放所有js文件
|   | |-- demo1.js  
|   | |-- main.js                           # js入口文件
|   |
|   |--- webpack.config.js                  # webpack配置文件
|   |--- index.html                         # html文件
|   |--- styles                             # 存放所有的css样式文件                              
|   |--- .gitignore  
|   |--- README.md
|   |--- package.json

```
index.html代码如下：

```

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
  <div id="app"></div>
  <script src="./dist/bundle.js"></script>
</body>
</html>
```

js/demo1.js 代码假如是如下：

```
function demo1Func() {
  console.log(11);
};
module.exports = demo1Func;

```

js/main.js 代码如下:

```
const demo1Func = require('./demo1.js');

demo1Func();

```

如上的简单的代码，我们先从上面的简单的代码来学起，然后逐渐会慢慢的深入的讲解webpack知识点；我们在项目的根目录中新建 webpack.config.js件；编写配置文件如下：
然后每次启动下该本地项目服务，我们需要 node app.js 这样启动下，如下所示：

```
const path = require('path');

module.exports = {
  entry: './js/main.js',

  output: {
    // 将所有依赖的模块合并输出到一个叫bundle.js文件内
    filename: 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, './dist')
  }
};
```
一切编写文件好了以后，我们一般情况下会在项目的根目录下 运行webpack命令；但是当我们运行webpack后，会报错如下信息：

```
One CLI for webpack must be installed. These are recommended choices, delivered as separate packages:
 - webpack-cli (https://github.com/webpack/webpack-cli)
   The original webpack full-featured CLI.
 - webpack-command (https://github.com/webpack-contrib/webpack-command)
   A lightweight, opinionated webpack CLI.
We will use "npm" to install the CLI via "npm install -D".
Which one do you like to install (webpack-cli/webpack-command):

```
因此我们可以在项目的目录下 安装下 webpack-cli ，如下命令安装：

```
npm install webpack-cli -g

```
安装完成后，我们再执行webpack命令后，就会在项目中根目录生成dist文件夹，该文件夹内会生成 bundle.js 文件。这时候我们再打开index.html， 运行后，会发现执行了依赖的demo1.js了。

#### 理解配置文件 entry（入口）和 出口 (output)
入口(entry) 是指示webpack应该使用哪个模块，来作为构建内部依赖js的开始，进入入口起点后，webpack会找出有哪些模块和库是入口js依赖的。
出口(output) 是告诉webpack在什么地方输出它所创建的bundles，以及如何命名这些文件，默认值为 './dist'.
# 使用loader
webpack的构建是一个采用CommonJS规范的模块化项目，现在我们还是继续上面的项目，我们再在main.js会引入一个css文件。因此会在main.js代码修改如下：

```
require('../styles/main.css');

const demo1Func = require('./demo1.js');

demo1Func();
```
然后main.css代码如下：

```
#app {
  font-size: 18px;
}
```
如果我们现在直接去执行webpack的话，就会报错，因此我们需要在webpack中加入Loader的机制。将webpack代码改成如下：

```
const path = require('path');

module.exports = {
  entry: './js/main.js',

  output: {
    // 将所有依赖的模块合并输出到一个叫bundle.js文件内
    filename: 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        // 用正则去匹配以 .css结尾的文件，然后需要使用loader进行转换
        test: /\.css$/,
        use: ['style-loader', 'css-loader?minimize']
      }
    ]
  }
};
```
如上代码，我们在webpack编译之前需要安装 style-loader 和 css-loader， 如下命令进行安装：


```
npm install --save-dev style-loader css-loader
```

如上配置代码中的 module.rules 数组配置了一组规则，是来告诉webpack在遇到哪些文件时使用哪些loader去加载和转换，比如上面的使用test正则去匹配
以 .css 结尾的文件，会先使用 css-loader 读取css文件，然后使用 style-loader将css的内容注入到javascript里面去。

###注意：
1 use属性的值是一个使用Loader名称组成的数组，Loader的执行顺序是由后往前的。由于loader有顺序的，因此我们在配置中不能如下编写loader；
代码如下：

```
module: {
    rules: [
      {
        // 用正则去匹配以 .css结尾的文件，然后需要使用loader进行转换
        test: /\.css$/,
        use: ['css-loader?minimize', 'style-loader']
      }
    ]
  }

```

2 每个Loader都可以通过 URL queryString 的方式传入参数，比如 css-loader?minimize是告诉css-loader是开启css压缩。现在我们可以在项目中的根目录运行 webpack命令了，一切正常后，我们打开index.html后，查看代码，发现css被加载到style标签内了；

style-loader的原理：是将css的内容使用javascript的字符串存储起来，在网页执行javascript时通过DOM操作，动态地向HTML head标签里插入 HTML style标签。

3 配置loader的方式也可以使用Object来实现，比如如上的匹配css代码，可以改成如下：

```
use: [
    'style-loader', 
    {
      loader: 'css-loader',
      options: {
        minimize: true
      }
    }
]
```
因此webpack所有的配置代码变成如下：

```
const path = require('path');
  module.exports = {
    entry: './js/main.js',
    output: {
      // 将所有依赖的模块合并输出到一个叫bundle.js文件内
      filename: 'bundle.js',
      // 将输出的文件都放在dist目录下
      path: path.resolve(__dirname, './dist')
    },
    module: {
      rules: [
        {
          // 用正则去匹配以 .css结尾的文件，然后需要使用loader进行转换
          test: /\.css$/,
          use: [
            'style-loader', 
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }
          ]
        }
      ]
    }
  };
```
# 使用插件（Plugin）

loader的作用是被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务，插件的范围包括，从打包优化和压缩，一直到重新定义环节中的变量。如果想要使用一个插件，我们只需要require()它，然后把它添加到 plugins数组中。我们可以在一个配置文件中因为不同的目的多次使用用一个插件，因此我们可以使用new操作符来创建它的实列。

上面我们是通过loader加载了css文件到js中去，下面我们通过plugin将注入的bundle.js文件里的css提取到单独的文件中，我们需要使用到extract-text-webpack-plugin 插件，配置代码如下：

```
const path = require('path');

// 提取css的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './js/main.js',

  output: {
    // 将所有依赖的模块合并输出到一个叫bundle.js文件内
    filename: 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        // 使用正则去匹配要用该loader转换的css文件
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          // 转换 .css文件需要使用的Loader
          use: ['css-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 从js文件中提取出来的 .css文件的名称
      filename: `main.css`
    })
  ]
};
```

要使用 extract-text-webpack-plugin 插件的话，首先我们需要安装该插件，安装插件的命令如下：

```
npm install --save-dev extract-text-webpack-plugin
```

当安装成功后，我们需要运行webpack命令后，发现命令行报错了，报错信息如下：

```
(node:86210) DeprecationWarning: Tapable.plugin is deprecated. Use new API on 

`.hooks` instead

/usr/local/lib/node_modules/webpack/lib/Chunk.js:802
```

解决的办法是 安装 extract-text-webpack-plugin 时，需要如下安装，安装命令如下：

```
npm install extract-text-webpack-plugin@next
```


安装成功后，再运行webpack就可以了，我们可以看到在dist文件夹内会多一个main.css, 因此我们可以在index.html中把 css文件引入进去即可。

# 使用DevServer

前面是使用webpack进行打包，但是在开发中我们还需要一个本地文件的服务器，并且当我们保存代码的时候会自动进行打包，并且还支持 Source Map，以方便代码调试等功能，因此我们现在需要使用到 DevServer了。

首先我们需要安装 webpack-dev-server, 如下安装命令：

```
npm install --save-dev webpack-dev-server
```

当然我们还需要全局安装一下，安装命令如下：

```
npm install webpack-dev-server -g
```

然后当我们在命令行输入 webpack-dev-server 运行后，发现报错了，报错如下信息：

```

The CLI moved into a separate package: webpack-cli.
Please install 'webpack-cli' in addition to webpack itself to use the CLI.
-> When using npm: npm install webpack-cli -D
-> When using yarn: yarn add webpack-cli -D
module.js:471

```

因此我们需要重新运行下如下命令：

```

npm install webpack-cli -D
```

当成功后，我们再次运行 webpack-dev-server 可以看到已经启动了服务器了，端口号默认是 8080, 然后我们访问 http://localhost:8080/index.html  就可以访问到我们项目中页面了。

### 实时预览

webpack在启动时可以开启监听模式，默认是关闭的，开启后webpack会监听本地文件系统的变化，在发生变化时候会重新构建出新的结果，在上面运行
webpack-dev-server 后，我们需要打开一个新的命令行，在命令行中输入如下命令来开启监听模式：

```
webpack --watch

```
当项目中入口文件或入口依赖的文件有改变的时候，它会自动重新构建，构建完成后会自动刷新下页面，但是如果修改的不是入口文件或依赖的文件
是不会有任何效果的，比如修改的是index.html 是不会重新构建的。但是要完成上面的实时预览，html页面的bundle.js 要直接引入即可：如下html页面代码：

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
  <div id="app"></div>
  <script src="bundle.js"></script>
</body>
</html>
```

那为什么 http://localhost:8080/bundle.js 这样也能访问的到呢？原因是DevServer会将webpack构建出的文件保存在内存中，DevServer不会理会webpack.config.js里配置的output.path属性的。

### 模块热替换

除了上面介绍的改动本地入口文件或依赖文件后，会自动打包，然后会自动刷新浏览器即可看到更新效果外，我们还可以使用模块热替换技术，模块热替换技术能做到在不重新加载整个网页的情况下，通过将已更新的模块替换旧模块，它默认是关闭的，要开启模块热替换，我们只需在启动DevServer时带上 --inline 参数即可。如下命令：

```
webpack-dev-server --inline  或 webpack-dev-server --inline --hot
```
webpack-dev-server 有如下两种启动模式：

iFrame: 该模式下修改代码后会自动打包，但是浏览器不会自动刷新。

inline： 内联模式，该模式下修改代码，webpack将自动打包并刷新浏览器。

### 支持Source Map

在浏览器中运行javascript代码都是编译器输出的代码，但是如果在代码中碰到一个bug的时候，我们不好调式，因此我们需要 Source Map来映射到源代码上，Webpack支持生成 Source Map, 只需在启动时带上 --devtool source-map参数即可；如下命令：

```
webpack-dev-server --inline --hot --devtool source-map

```
注意：每次运行 如上命令，感觉非常长，因此我们可以在项目的根目录的package.json文件的scripts配置中添加如下配置：

```
"scripts": {
  "dev": "webpack-dev-server --devtool source-map --hot --inline"
}
```

加上如上配置后，我们只需要在命令行中 运行 npm run dev 即可；

#### 其他配置常见的选项：

--quiet 控制台中不输出打包的信息

--compress 开启gzip的压缩

--progress 显示打包的进度


因此在项目中scripts经常会做如下配置：

```

"scripts": {
  "dev": "webpack-dev-server --progress --colors --devtool source-map --hot --inline",
  "build": "webpack --progress --colors"
}

```
这样的话，打包的时候会显示打包进度。

### context

基础目录，绝对路径，用于从配置中解析入口起点和加载器。什么意思呢？比如如下代码配置：
context: path.resolve(__dirname, 'js'), 含义是使用当前目录下的js文件下查找入口文件。比如如下代码的配置也是可以的：


```

module.exports = {
  context: path.resolve(__dirname, 'js'),
  entry: './main.js'
}

```

含义是从当前项目目录下的js文件查找main.js文件作为入口文件，如果在当前目录没有找到该入口文件，就会报错。
当然我们也可以如下写配置代码也是可以的：如下代码配置：

```

module.exports = {
  context: path.resolve(__dirname, ''),
  entry: './js/main.js'
};

```

或者context配置项不要，它也是默认从当前目录下查找的，因此如果使用context的话，建议加上第二个参数，是从当前目录下那个文件内查找的。或者直接不要这个配置项。

### entry

应用程序的起点入口，从这个起点开始，应用程序启动执行，如果传递一个数组的话，那么数组的每一项都会执行。它的类型可以是String, array, 或 object;

#####  string(类型为字符串)： 如下配置：

```
module.exports = {
  entry: './js/main.js',
  output: {
    // 将所有依赖的模块合并输出到一个叫bundle.js文件内
    filename: 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, './dist')
  }
};

```
#####  类型为数组

```

module.exports = {
  entry: ['./js/main.js', './js/main2.js'],
  output: {
    // 将所有依赖的模块合并输出到一个叫bundle.js文件内
    filename: 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, './dist')
  }
};

```

如果类型为数组的话，将会创建多个主入口，并且把数组中的js打包在一起到一个文件里面去。

#####  类型为对象时

```
module.exports = {
  entry: {
    'main': './js/main.js',
    'main2': './js/main2.js'
  },
  output: {
    filename: '[name].js', // [name] 的值是entry的键值, 会输出多个入口文件
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, './dist')
  }
};
```






