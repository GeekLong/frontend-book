# nginx的反向代理proxy_pass指令
## 1. 首先什么是代理服务器？
客户机发送请求时，不会直接发送到目的主机，而是先被代理服务器收到，代理服务器收到客服机的请求后，再向目的机发出，目的机就会返回数据给客户机，在返回给客户机之前，会被代理服务器先收到，会存放在代理服务器的硬盘中。然后代理服务器会再向客户机发出，最后客户机就会收到目的机返回的数据。

## 2. 代理服务器的作用有哪些？

### 1) 可以提高访问速度
因为目标主机返回的数据会存放在代理服务器的硬盘中，因此下一次客户机再次访问相同的站点数据的时候，会直接从代理服务器的硬盘中读取，因此响应速度会更快。

### 2）防火墙的作用

由于所有的客户机请求都必须通过代理服务器访问远程站点，因此可在代理服务器上设限，过滤一些不安全的信息。

## 3. 理解什么是反向代理？

反向代理是指以代理服务器接收Internet上的链接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给Internet上请求连接的客户端。

什么意思呢？上面的解释可能有点不好理解，那么下面我们先来打个比方，比如我的内部服务器是放在212环境上，那么开发的接口如下这样的：
http://192.168.1.212:8136/xxxx 然后端口号是8136，然后直接访问该接口会返回对应的数据，但是接口一般都是域名访问的，因此我们需要在nginx上配置一个域名，假如为 xy.xxx.com, 然后当我们在联调接口的时候，我们使用 http://xy.xxx.com/xxxx 这样的接口时，它会反向代理到 http://192.168.1.212:8136/xxxx 上来，这样它会返回内部服务器的数据给客户端，客户端就拿到对应的数据显示出来了。

### 3.1 理解proxy_pass指令

该指令是用来设置代理服务器的地址，可以是主机名称，IP地址加端口号等形式。基本语法如下所示：


proxy_pass: URL;

因此我们经常会看到如下nginx上的配置：如下代码：


```

server {
  listen 80;
  server_name xy.xxx.com; // 接口的域名
  access_log  /data/www/logs/nginx/access.log main;
  add_header Access-Control-Allow-Origin http://xy.xxx.com; // 允许的域名跨域
  add_header Access-Control-Allow-Credentials true;
  include nginx_xxx.conf;
  location / {
    proxy_pass http://192.168.1.212:8136;
    include nginx_proxy.conf;
  }
  error_page   500 502 503 504  /502.html;
  location = /50x.html {
    root   html;
  }
}

```

如上代码的含义是：监听80端口号，然后我们定义的接口的域名为 xy.xxx.com， 然后当我们访问 http://xy.xxx.com/xxxx这样的接口的时候，它会通过 location / {} 这样的反向代理到 http://192.168.1.212:8136上来，当然对于我们的host也需要绑定下 192.168.1.212 xy.xxx.com 就可以了。


当然如果代理服务器是一组服务器的话，我们可以使用upstream指令配置后端服务器组。如下代码：


```

upstream proxy_xxx {
  server http://192.168.1.211:8136/xxx;
  server http://192.168.1.212:8136/xxx;
  server http://192.168.1.213:8136/xxx;
}

server {
  listen 80;
  server_name xy.xxx.com; // 接口的域名
  access_log  /data/www/logs/nginx/access.log main;
  add_header Access-Control-Allow-Origin http://xy.xxx.com; // 允许的域名跨域
  add_header Access-Control-Allow-Credentials true;
  include nginx_xxx.conf;
  location / {
    proxy_pass proxy_xxx; // 对应上面的upstream 后面的 proxy_xxx
    include nginx_proxy.conf;
  }
  error_page   500 502 503 504  /502.html;
  location = /50x.html {
    root   html;
  }
}


```


但是在上面配置各个服务器中都指明了传输协议为 http://, 但是如果上面的接口没有指明协议的话，那么我们需要在 proxy_pass上加上了，proxy_pass http://proxy_xxx 这样的，如下配置代码：


```

upstream proxy_xxx {
  server 192.168.1.211:8136/xxx;
  server 192.168.1.212:8136/xxx;
  server 192.168.1.213:8136/xxx;
}

server {
  listen 80;
  server_name xy.xxx.com; // 接口的域名
  access_log  /data/www/logs/nginx/access.log main;
  add_header Access-Control-Allow-Origin http://xy.xxx.com; // 允许的域名跨域
  add_header Access-Control-Allow-Credentials true;
  include nginx_xxx.conf;
  location / {
    proxy_pass http://proxy_xxx; // 对应上面的upstream 后面的 proxy_xxx
    include nginx_proxy.conf;
  }
  error_page   500 502 503 504  /502.html;
  location = /50x.html {
    root   html;
  }
}


```


#### 注意点：

1.当我们配置是如下配置：


```

server {
  listen 80;
  server_name xy.xxx.com; // 接口的域名
  access_log  /data/www/logs/nginx/access.log main;
  add_header Access-Control-Allow-Origin http://xy.xxx.com; // 允许的域名跨域
  add_header Access-Control-Allow-Credentials true;
  include nginx_xxx.conf;
  location / {
    proxy_pass http://192.168.1.212:8136;
    include nginx_proxy.conf;
  }
  error_page   500 502 503 504  /502.html;
  location = /50x.html {
    root   html;
  }
}

```
当用户使用接口 http://xy.xxx.com/xxx 的时候，nginx会自动指向内部服务器 http://192.168.1.212:8136/xxx的。这个我们能理解的。


2.当我们的nginx的配置是如下的：


```

server {
  listen 80;
  server_name xy.xxx.com; // 接口的域名
  access_log  /data/www/logs/nginx/access.log main;
  add_header Access-Control-Allow-Origin http://xy.xxx.com; // 允许的域名跨域
  add_header Access-Control-Allow-Credentials true;
  include nginx_xxx.conf;
  location / {
    proxy_pass http://192.168.1.212:8136/yyy;
    include nginx_proxy.conf;
  }
  error_page   500 502 503 504  /502.html;
  location = /50x.html {
    root   html;
  }
}

```

注意上面的 proxy_pass http://192.168.1.212:8136/yyy; 如果客户端还是以 http://xy.xxx.com/xxx 访问接口的时候，那么nginx服务器就会将请求地址指向与 http://192.168.1.212:8136/yyy了，而不是http://192.168.1.212:8136/xxx了。

#### 3. 理解 proxy_pass http://192.168.1.212 和 proxy_pass http://192.168.1.212/的区别；


上面的两者的区别是 proxy_pass 指令的URL变量末尾添加了斜杠 '/', 下面我们再来看下nginx的配置，如下代码：


```

server {
  listen 80;
  server_name xy.xxx.com; // 接口的域名
  access_log  /data/www/logs/nginx/access.log main;
  add_header Access-Control-Allow-Origin http://xy.xxx.com; // 允许的域名跨域
  add_header Access-Control-Allow-Credentials true;
  include nginx_xxx.conf;
  location / {
    #配置1 proxy_pass http://192.168.1.212:8136;
    #配置2 proxy_pass http://192.168.1.212:8136/;
    include nginx_proxy.conf;
  }
  error_page   500 502 503 504  /502.html;
  location = /50x.html {
    root   html;
  }
}

```
在如上配置中，location块使用了 '/' 作为uri变量的值来匹配的，因此上面的配置1和配置2效果是相同的，比如客户端的接口请求是：
http://xy.xxx.com/xxx的时候，不管使用配置1还是配置2，都会指向内部服务器 http://192.168.1.212:8936/xxx.


但是现在我们把代码改成如下配置，那就不一样了：


```

server {
  listen 80;
  server_name xy.xxx.com; // 接口的域名
  access_log  /data/www/logs/nginx/access.log main;
  add_header Access-Control-Allow-Origin http://xy.xxx.com; // 允许的域名跨域
  add_header Access-Control-Allow-Credentials true;
  include nginx_xxx.conf;
  location /bus/ {
    #配置1 proxy_pass http://192.168.1.212:8136;
    #配置2 proxy_pass http://192.168.1.212:8136/;
    include nginx_proxy.conf;
  }
  error_page   500 502 503 504  /502.html;
  location = /50x.html {
    root   html;
  }
}

```

注意：上面的 location /bus/ , location块使用了 /bus/ 作为uri变量的值来匹配，比如我们现在客户端请求 http://xy.xxx.com/bus/xxx的时候，如果使用配置1的话，那么它会指向内部服务器的地址为：http://192.168.1.212:8136/bus/xxx, 那如果我们使用配置2的话，那么它会指向内部服务器的地址为：
http://192.168.1.212:8136/xxx, 这样的。因此这就是加上 反斜杠的区别了。
