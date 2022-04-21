# ubuntu ssh长连接
只要在/etc/ssh/ssh_config文件里加两个参数就行了

1 TCPKeepAlive yes

2 ServerAliveInterval 300



前一个参数是说要保持连接，后一个参数表示每过5分钟发一个数据包到服务器表示“我还活着”

如果你没有root权限，修改或者创建~/.ssh/ssh_config也是可以的





Ubuntu ssh频繁断开解决办法

$ ssh -o ServerAliveInterval=60 user@server


可在~/.bashrc里定义别名

$ vi ~/.bashrc

按a或i进入编辑模式

alias ssh='ssh -o ServerAliveInterval=60'