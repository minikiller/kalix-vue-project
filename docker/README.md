# kalix-vue-project

> use centos7 docker

前提：已经通过windows npm run build打包项目，生成dist

要求：docker目录下default.conf、Dockerfile文件、supervisord.conf文件和生成的dist位于同一目录下

同时windows环境下 git clone https://github.com/qingjie1201/kalix-express-project.git

npm install，安装后kalix-express-project项目也需要位于Dockerfile文件同一目录下

## 下载centos:centos7镜像(原下载Nginx image，后修改)

```
$ docker pull centos:centos7
```

## 编写Dockerfile

```
$ touch Dockerfile  创建空文件(不需要手动创建，git上已经建立)

$ cd /home/vue-develop/project

$ git clone https://github.com/minikiller/kalix-vue-project.git
```

通过ssh FTP upload最新dist及kalix-express-project到/home/vue-develop/project/kalix-vue-project/docker目录下

## 使用Dockerfile构建镜像

```
$ cd /home/vue-develop/project/kalix-vue-project/docker

$ docker build -t kalix-vue-project .

$ docker build -t kalix-vue-project:v0.0.1 .

$ docker build -t myproject/kalix-vue-project:v0.0.1 .  基于Dockerfile构建新镜像(仓库/名称)

$ docker build -t myproject/kalix-vue-project:v0.0.1 /home/vue-develop/project/kalix-vue-project
```

## 运行Docker镜像

```
$ docker run -d --name kalix-vue-project -e "KALIX_SERVER_URL=http://192.168.0.221:2222" kalix-vue-project

$ docker run -d --name kalix-vue-project -p 8282:8282 -e "KALIX_SERVER_URL=http://192.168.0.221:8181" kalix-vue-project:v0.0.1

$ docker run -d --name kalix-vue-project -p 8282:8282 -p 3000:3000 -e "KALIX_SERVER_URL=http://192.168.0.221:8181" kalix-vue-project:v0.0.1

$ docker run -d --name kalix-vue-project -p 9000:8282 -p 3000:3000 -e "KALIX_SERVER_URL=http://192.168.0.221:8181" myproject/kalix-vue-project:v0.0.1
```

## 查看运行结果

```
$ docker ps
```

访问 http://192.168.0.227:9000

更多信息，更详细信息可访问：https://github.com/qingjie1201/docker-parent
