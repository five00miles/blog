# HTTP版本区别
## **HTTP1.0和HTTP1.1的一些区别**
HTTP1.0最早在网页中使用是在1996年，那个时候只是使用一些较为简单的网页上和网络请求上，而HTTP1.1则在1999年才开始广泛应用于现在的各大浏览器网络请求中，同时HTTP1.1也是当前使用最为广泛的HTTP协议。 主要区别主要体现在：
1. **缓存处理**，在HTTP1.0中主要使用header里的If-Modified-Since,Expires来做为缓存判断的标准，HTTP1.1则引入了更多的缓存控制策略例如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略。
2. **带宽优化及网络连接的使用**，HTTP1.0中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，HTTP1.1则在请求头引入了range头域，它允许只请求资源的某个部分，即返回码是206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。
3. **错误通知的管理**，在HTTP1.1中新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。
4. **Host头处理**，在HTTP1.0中认为每台服务器都绑定一个唯一的IP地址，因此，请求消息中的URL并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。HTTP1.1的请求消息和响应消息都应支持Host头域，且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）。
5. **长连接**，HTTP 1.1支持长连接（PersistentConnection）和请求的流水线（Pipelining）处理，在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟，在HTTP1.1中默认开启Connection： keep-alive，一定程度上弥补了HTTP1.0每次请求都要创建连接的缺点。

## **HTTPS与HTTP的一些区别**

- HTTPS协议需要到CA申请证书，一般免费证书很少，需要交费。
- HTTP协议运行在TCP之上，所有传输的内容都是明文，HTTPS运行在SSL/TLS之上，SSL/TLS运行在TCP之上，所有传输的内容都经过加密的。
- HTTP和HTTPS使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
- HTTPS可以有效的防止运营商劫持，解决了防劫持的一个大问题。

![0](~@assets/http/0.png)

# TCP三次握手
TCP三次握手：
第一次握手：建立连接。客户端发送连接请求报文段，将SYN位置为1，Sequence Number为x；然后，客户端进入SYN_SEND状态，等待服务器的确认；

第二次握手：服务器收到SYN报文段。服务器收到客户端的SYN报文段，需要对这个SYN报文段进行确认，设置Acknowledgment Number为x+1(Sequence Number+1)；同时，自己自己还要发送SYN请求信息，将SYN位置为1，Sequence Number为y；服务器端将上述所有信息放到一个报文段（即SYN+ACK报文段）中，一并发送给客户端，此时服务器进入SYN_RECV状态；

第三次握手：客户端收到服务器的SYN+ACK报文段。然后将Acknowledgment Number设置为y+1，向服务器发送ACK报文段，这个报文段发送完毕以后，客户端和服务器端都进入ESTABLISHED状态，完成TCP三次握手。


![SouthEast](/assets/http/SouthEast.jpeg)

为什么要三次握手：为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误。

参考文章：

[1] [(10条消息) 【前端面试】OSI七层模型和TCP三次握手、四次挥手_前端之路-CSDN博客_前端tcp三次握手](https://blog.csdn.net/qq_22944825/article/details/78160659)

# get请求传参长度的误区、get和post请求在缓存方面的区别
HTTP 协议从未规定 GET/POST 的请求长度限制是多少。对get请求参数的限制是来源与浏览器或web服务器，浏览器或web服务器限制了url的长度。

# http状态码

## 常见的状态码

- 1XX 表示消息

  - 101——升级协议，如从http到ws，此时需要反向代理支持，如 Nginx，在 Nginx 配置 websockt 如下:

    ```
    location / {
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection  $connection_upgrade;
    }
    ```

- 2XX 表示成功

  - 200——OK
  - 201——资源创建成功
  - 204——响应不会返回 Body
  - 206——当请求多媒体数据数据较大时，会进行分片传输

- 3XX 表示重定向

  - 301——永久重定向
  - 302——临时重定向
  - 304——资源已被缓存。自上次请求，未修改文件
  - 307——临时重定向

- 4XX 表示客户端错误

  - 400——错误的请求
  - 401——未被授权，需要身份验证，例如token信息等等
  - 403——请求被拒绝
  - 404——资源缺失，接口不存在，或请求的文件不存在等等
  - 405——请求方法不被允许
  - 413——请求body太大
  - 418——常用来处理不合法的参数校验
  - 422——常用来处理不合法的参数校验
  - 429——请求过多被限流

- 5XX 表示服务端错误

  - 500——服务器端的未知错误
- 502——网关错误
  - 503——服务暂时无法使用
- 504——网关超时，上游应用层迟迟未响应



## http 状态码中 301，302 和 307 有什么区别

  - 301，Moved Permanently。永久重定向，该操作比较危险，需要谨慎操作：如果设置了 301，但是一段时间后又想取消，但是浏览器中已经有了缓存，还是会重定向。
  - 302，Found。临时重定向，但是会在重定向的时候改变 method: 把 POST 改成 GET，于是有了 307
  - 307，Temporary Redirect。临时重定向，在重定向时不会改变 method

# gzip

## 可以对图片开启 gzip 压缩吗
不需要开启，如果开启的话，有可能使图片变的更大。如果你注意一些网站的 img 资源时，就会发现他们都没有开启 `gzip`


