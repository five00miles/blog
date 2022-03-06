

TCP三次握手：

第一次握手：建立连接。客户端发送连接请求报文段，将SYN位置为1，Sequence Number为x；然后，客户端进入SYN_SEND状态，等待服务器的确认；

第二次握手：服务器收到SYN报文段。服务器收到客户端的SYN报文段，需要对这个SYN报文段进行确认，设置Acknowledgment Number为x+1(Sequence Number+1)；同时，自己自己还要发送SYN请求信息，将SYN位置为1，Sequence Number为y；服务器端将上述所有信息放到一个报文段（即SYN+ACK报文段）中，一并发送给客户端，此时服务器进入SYN_RECV状态；

第三次握手：客户端收到服务器的SYN+ACK报文段。然后将Acknowledgment Number设置为y+1，向服务器发送ACK报文段，这个报文段发送完毕以后，客户端和服务器端都进入ESTABLISHED状态，完成TCP三次握手。


![这里写图片描述](../../../imgs/tcp%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B/SouthEast.jpeg)



为什么要三次握手：为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误。

参考文章：

[1] [(10条消息) 【前端面试】OSI七层模型和TCP三次握手、四次挥手_前端之路-CSDN博客_前端tcp三次握手](https://blog.csdn.net/qq_22944825/article/details/78160659)