# 安装docker

### 先卸载旧的

```shell
 sudo apt-get remove docker docker-engine docker.io containerd runc
```



```shell
 sudo apt-get update
 sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
    
    
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg


echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] http://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

sudo docker run hello-world
```



### 卸载docker

```shell
sudo apt-get purge docker-ce docker-ce-cli containerd.io

sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```



### 设置镜像地址

```shell
# /etc/docker/daemon.json 文件添加以下代码
# {"registry-mirrors":["https://reg-mirror.qiniu.com/"]}

sudo systemctl daemon-reload
sudo systemctl restart docker
```



### 常用命令

```shell
docker version
docker info
docker --help
docker images
docker pull mysql
docker rmi -f 镜像id
docker rmi -f $(docker images -aq) # 删除全部镜像

docker run [可选参数] image
--name="容器的名字"
-d 后台方式运行
-it 使用交互方式运行，进入容器查看内容
-p 指定容器端口 主机端口:容器端口
-v 挂载数据卷   主机目录:容器目录

exit # 容器停止并退回到主机
# ctrl+p+q # 容器不停止退出

docker ps [-a] # 运行中的容器

docker rm 容器id
docker rm -f $(docker ps -aq) # 删除所有容器
docker ps -a -q|xargs docker rm
docker start 容器id
docker restart 容器id
docker stop 容器id
docker kill 容器id

docker top 容器id # 容器进程的信息
docker inspect 容器id

# 进入正在运行的容器
docker exec -it 容器id bashshell  # 进入后开启一个新的终端
docker attach 容器id # 不会开新的进程

# 从容器copy文件到主机
docker cp 容器id:容器内的路径  目的主机l
```



### 提交自己的镜像

```shell
docker commit -m="提交的信息" -a="作者" 容器id 目标镜像名
```



### 具名和匿名挂载

```shell
docker run -d -P --name nginx01 -v /ect/nginx nginx

-v 容器内路径  # 匿名挂载
-v 卷名:容器内路径 # 具名挂载
-v 宿主机路径::容器内路径  # 指定路径挂载

# r
rw 可读可写
ro 只读

docker run -d -P --name nginx01 -v myname-nginx:/etc/nginx:rw nginx
```







[文档地址](https://docs.docker.com/engine/install/ubuntu/)

