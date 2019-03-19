# 理解webpack之process.env.NODE_ENV详解

在node中，有全局变量process表示的是当前的node进程。process.env包含着关于系统环境的信息。但是process.env中并不存在NODE_ENV这个东西。NODE_ENV是用户一个自定义的变量，在webpack中它的用途是判断生产环境或开发环境的依据的。

为了查看 process的基本信息，我们可以在文件夹中 新建一个 process.js 文件，在里面加一句代码：console.log(process);然后进入该文件夹，执行 node process.js 可以在命令行中打印如下信息：

```
$ node process.js
process {
  title: 'node',
  version: 'v4.4.4',
  moduleLoadList: 
   [....],
  versions: 
   { http_parser: '2.5.2',
     node: '4.4.4',
     v8: '4.5.103.35',
     uv: '1.8.0',
     zlib: '1.2.8',
     ares: '1.10.1-DEV',
     icu: '56.1',
     modules: '46',
     openssl: '1.0.2h' },
  arch: 'x64',
  platform: 'darwin',
  release: 
   { name: 'node',
     lts: 'Argon',
     sourceUrl: 'https://nodejs.org/download/release/v4.4.4/node-v4.4.4.tar.gz',
     headersUrl: 'https://nodejs.org/download/release/v4.4.4/node-v4.4.4-headers.tar.gz' },
  argv: 
   [ '/Users/tugenhua/.nvm/versions/node/v4.4.4/bin/node',
     '/Users/tugenhua/个人demo/process.js' ],
  execArgv: [],
  env: 
   { TERM_PROGRAM: 'Apple_Terminal',
     SHELL: '/bin/zsh',
     TERM: 'xterm-256color',
     TMPDIR: '/var/folders/l7/zndlx1qs05v29pjhvkgpmhjm0000gn/T/',
     Apple_PubSub_Socket_Render: '/private/tmp/com.apple.launchd.7Ax4C1EWMx/Render',
     TERM_PROGRAM_VERSION: '404',
     TERM_SESSION_ID: '82E05668-442D-4180-ADA3-8CF64D85E5A9',
     USER: 'tugenhua',
     SSH_AUTH_SOCK: '/private/tmp/com.apple.launchd.MYOMheYcL3/Listeners',
     PATH: '/Users/tugenhua/.nvm/versions/node/v4.4.4/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
     PWD: '/Users/tugenhua/个人demo',
     LANG: 'zh_CN.UTF-8',
     XPC_FLAGS: '0x0',
     XPC_SERVICE_NAME: '0',
     SHLVL: '1',
     HOME: '/Users/tugenhua',
     LOGNAME: 'tugenhua',
     SECURITYSESSIONID: '186a8',
     OLDPWD: '/Users/tugenhua/工作文档/sns_pc',
     ZSH: '/Users/tugenhua/.oh-my-zsh',
     PAGER: 'less',
     LESS: '-R',
     LC_CTYPE: 'zh_CN.UTF-8',
     LSCOLORS: 'Gxfxcxdxbxegedabagacad',
     NVM_DIR: '/Users/tugenhua/.nvm',
     NVM_NODEJS_ORG_MIRROR: 'https://nodejs.org/dist',
     NVM_IOJS_ORG_MIRROR: 'https://iojs.org/dist',
     NVM_RC_VERSION: '',
     MANPATH: '/Users/tugenhua/.nvm/versions/node/v4.4.4/share/man:/usr/local/share/man:/usr/share/man:/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.13.sdk/usr/share/man:/Applications/Xcode.app/Contents/Developer/usr/share/man:/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/share/man',
     NVM_PATH: '/Users/tugenhua/.nvm/versions/node/v4.4.4/lib/node',
     NVM_BIN: '/Users/tugenhua/.nvm/versions/node/v4.4.4/bin',
     _: '/Users/tugenhua/.nvm/versions/node/v4.4.4/bin/node',
     __CF_USER_TEXT_ENCODING: '0x1F5:0x19:0x34' },
  pid: 14034,
  features: 
   { debug: false,
     uv: true,
     ipv6: true,
     tls_npn: true,
     tls_sni: true,
     tls_ocsp: true,
     tls: true },
  _needImmediateCallback: false,
  config: {},
  nextTick: [Function: nextTick],
  _tickCallback: [Function: _tickCallback],
  _tickDomainCallback: [Function: _tickDomainCallback],
  stdout: [Getter],
  stderr: [Getter],
  stdin: [Getter],
  openStdin: [Function],
  exit: [Function],
  kill: [Function],
  mainModule: 
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: '/Users/tugenhua/个人demo/process.js',
     loaded: false,
     children: [],
     paths: 
      [ '/Users/tugenhua/个人demo/node_modules',
        '/Users/tugenhua/node_modules',
        '/Users/node_modules',
        '/node_modules' ] 
     } }
        
```


如上就可以看到 process是node的全局变量，并且process有env这个属性，但是没有NODE_ENV这个属性。

process.env 属性返回的是一个包含用户环境信息的对象，它可以区分开发环境或正式环境的依据，那么我们如何配置环境变量呢？


## 如何配置环境变量：


直接在cmd环境配置即可，查看环境变量，添加环境变量，删除环境变量等操作。

### windows环境配置如下：

```
#node中常用的到的环境变量是NODE_ENV，首先查看是否存在 
set NODE_ENV 

#如果不存在则添加环境变量 
set NODE_ENV=production 

#环境变量追加值 set 变量名=%变量名%;变量内容 
set path=%path%;C:\web;C:\Tools 

#某些时候需要删除环境变量 
set NODE_ENV=


```


###  Linux配置(mac系统环境也属于这个)
```

#node中常用的到的环境变量是NODE_ENV，首先查看是否存在
echo $NODE_ENV

#如果不存在则添加环境变量
export NODE_ENV=production

#环境变量追加值
export path=$path:/home/download:/usr/local/

#某些时候需要删除环境变量
unset NODE_ENV

#某些时候需要显示所有的环境变量
env

```

如下查看环境变量，添加环境变量，删除环境变量操作如下：


![图片](https://img2018.cnblogs.com/blog/561794/201810/561794-20181012203242922-1618861433.png)


显示所有的环境变量，如下图所示

![图片](https://img2018.cnblogs.com/blog/561794/201810/561794-20181012203302193-1166802719.png)


注意：如果我们在命令行中设置环境变量后，比如设置 production 后，如下设置：
export NODE_ENV=production ，那么会在所有的项目下都是正式环境，当我们使用命令 npm install 后下载依赖包时，只会把 package.json中的dependencies依赖项下载下来，对于devDependencies中的依赖包是下载不下来的。
因此我们需要使用上面的命令 unset NODE_ENV 删除刚刚设置的环境变量。


## 理解 DefinePlugin 含义

官网解释的是：DefinePlugin允许我们创建全局变量，可以在编译时进行设置，因此我们可以使用该属性来设置全局变量来区分开发环境和正式环境。这就是 DefinePlugin的基本功能。


因此我们可以在webpack.config.js 中添加如下代码配置全局变量信息了，因为当webpack进行编译的时候会全局设置变量；如下代码：


```

module.exports = {
  plugins: [
    // 设置环境变量信息
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1',
      'typeof window': JSON.stringify('object'),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}

```


package.json 打包配置如下命令：


```

"scripts": {
  "dev": "webpack-dev-server --progress --colors --devtool cheap-module-eval-source-map --hot --inline",
  "build": "webpack --progress --colors --devtool cheap-module-source-map",
  "build:dll": "webpack --config webpack.dll.config.js"
},


```


这样配置完成后，为了验证一下是否是全局变量，运行npm run dev 打包后，我们可以在我们项目中入口js文件，打印下即可：比如如下代码：


```

console.log('Running App version ' + VERSION); // 打印 Running App version 5fa3b9
console.log(PRODUCTION); // 打印 true
console.log(process.env); // 打印 { NODE_ENV: undefined }


```


如上信息可以看到 process.env.NODE_ENV 打印出为undefined，那是因为我们在 package.json文件中未进行配置。下面我们把package.json 加上 NODE_ENV变量值，代码打包命令变成如下：



```


"scripts": {
  "dev": "NODE_ENV=development webpack-dev-server --progress --colors --devtool cheap-module-eval-source-map --hot --inline",
  "build": "NODE_ENV=production webpack --progress --colors --devtool cheap-module-source-map",
  "build:dll": "webpack --config webpack.dll.config.js"
},


```


如上打包命令，在dev打包命令上，前面加上了 NODE_ENV=development 命令，在build打包命令上前面加上了 NODE_ENV=production，因此继续查看代码结果变为如下：



```

console.log('Running App version ' + VERSION); // 打印 Running App version 5fa3b9
console.log(PRODUCTION); // 打印 true
console.log(process.env); // 打印 { NODE_ENV: 'development' }
```


可以看到这个时候 process.env.NODE_ENV 才有值，因此在项目打包中，为了区分开发环境和正式环境我们像如上配置即可，然后在webpack.config.js中通过 process.env.NODE_ENV 这个来区分正式环境还是开发环境即可。


## 理解 cross-env


#### 1. 什么是cross-env呢？

它是运行跨平台设置和使用环境变量的脚本。


#### 2. 它的作用是啥？

当我们使用 NODE_ENV = production 来设置环境变量的时候，大多数windows命令会提示将会阻塞或者异常，或者，windows不支持NODE_ENV=development的这样的设置方式，会报错。因此 cross-env 出现了。我们就可以使用 cross-env命令，这样我们就不必担心平台设置或使用环境变量了。也就是说 cross-env 能够提供一个设置环境变量的scripts，这样我们就能够以unix方式设置环境变量，然而在windows上也能够兼容的。


要使用该命令的话，我们首先需要在我们的项目中进行安装该命令，安装方式如下：

```

npm install --save-dev cross-env

```


然后在package.json中的scripts命令如下如下：

```

"scripts": {
  "dev": "cross-env NODE_ENV=development webpack-dev-server --progress --colors --devtool cheap-module-eval-source-map --hot --inline",
  "build": "cross-env NODE_ENV=production webpack --progress --colors --devtool cheap-module-source-map",
  "build:dll": "webpack --config webpack.dll.config.js"
}

```