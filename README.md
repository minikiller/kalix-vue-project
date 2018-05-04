# kalix-vue-project

> A Vue.js project

## Build Setup

``` bash
# install yarn
npm i -g yarn
yarn config set registry https://registry.npm.taobao.org

# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests
yarn run unit

# run e2e tests
yarn run e2e

# run all tests
yarn test
```

## Features
* vue
* vuex
* vue-router
* stylus
* pug
* axios
* mockjs
* element-UI
* vue-ueditor 富文本编辑器
* https://github.com/monterail/vue-multiselect

## doc url
> command:
```
npm i docsify-cli -g

docsify serve ./docs

Serving D:\java-develop\project\kalix-vue-project\docs now.
Listening at http://localhost:3000
```
访问地址： https://minikiller.github.io/kalix-vue-project

## devtool url
https://webpack.js.org/configuration/devtool/#devtool
https://webpack.js.org/configuration/other-options/#cache

## change log
https://github.com/PanJiaChen/vue-element-admin/issues/502#issuecomment-372172636
http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html
```

> use centos7 docker

前提：已经通过windows npm run build打包项目，生成dist

## 下载Nginx image

$ docker pull nginx

## 编写Dockerfile

$ touch Dockerfile  创建空文件(不需要手动创建，git上已经建立)

$ cd /home/vue-develop/project

$ git clone https://github.com/minikiller/kalix-vue-project.git

$ 通过命令copy 最新dist到/home/vue-develop/project/kalix-vue-project目录下

## Docker打包

$ cd /home/vue-develop/project/kalix-vue-project

$ docker build -t kalix-vue-project .

$ docker build -t myproject/kalix-vue-project:v0.0.1 .  基于Dockerfile构建新镜像(仓库/名称)

$ docker build -t myproject/kalix-vue-project:v0.0.1 /home/vue-develop/project/kalix-vue-project

## Docker运行

$ docker run -d --name kalix-vue-project -p 9000:9000 kalix-vue-project

$ docker run -d --name kalix-vue-project -p 9000:9000 myproject/kalix-vue-project:v0.0.1

## 查看运行结果

$ docker ps

访问 http://192.168.0.227:9000
