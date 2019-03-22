# 使用Nginx来解决跨域的问题

nginx的版本：(查看nginx命令： /usr/local/nginx/sbin/nginx -v)
nginx/1.4.3

问题是：前端项目域名是 a.xxxx.com, 后端的接口域名是 b.xxx.com，然后后端接口没有设置跨域相关的响应设置头，因此就接口和我们域名就会存在跨域的情况，因此我们可以使用 nginx服务器来配置一下；

网上很多资料将 在nginx配置下 加如下代码就可以解决跨域的问题；

```
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Credentials true;
add_header Access-Control-Allow-Methods GET,POST;

```
比如在nginx上如下配置：

```
server {
    listen 443;
    listen 80;
    server_name b.xxx.com;
    access_log  /data/www/logs/nginx/access.log main;

    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Credentials true;
    add_header Access-Control-Allow-Methods GET,POST;

    include nginx_xxx.conf;
    location / {
        proxy_pass http://192.168.1.212:8136;
        #proxy_pass http://xd-mfa-mng/;
        include nginx_proxy.conf;
    }
    error_page   500 502 503 504  /502.html;
    location = /50x.html {
        oot   html;
    }
}

```
但是还是会存在跨域的情况，俗话说，梦想是美好的，但是现实很残酷的。因此我们需要指定 对应的域名就可以解决上面的跨域问题了。

```
add_header Access-Control-Allow-Origin http://a.xxx.com; 
```
如上配置就可以使用nginx解决跨域的问题了；

因此代码变为如下：

```
server {
    listen 443;
    listen 80;
    server_name b.xxx.com;
    access_log  /data/www/logs/nginx/access.log main;

    add_header Access-Control-Allow-Origin http://a.xxx.com; 
    add_header Access-Control-Allow-Credentials true;

    include nginx_xxx.conf;
    location / {
        proxy_pass http://192.168.1.212:8136;
        #proxy_pass http://xd-mfa-mng/;
        include nginx_proxy.conf;
    }
    error_page   500 502 503 504  /502.html;
    location = /50x.html {
        oot   html;
    }
}

```
###注意：

1.Access-Control-Allow-Origin
服务器默认是不允许跨域的，给Nginx服务器配置 Access-Control-Allow-Origin *; 后的含义，表示服务器可以接受所有的请求源，即接受所有跨域的请求。但是这样设置在项目中并没有解决跨域，但是设置了具体的项目域名，比如 http://a.xxx.com 后，就可以跨域了；这有些不符合常理，但是情况确实如此；






