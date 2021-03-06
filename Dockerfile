# Version: 0.0.1
# 使用基础镜像centos:centos7
FROM centos:centos7
# 作者
MAINTAINER HQJ "150091225@qq.com"
# 运行命令
# 安装centos衍生发行版
RUN yum install -y epel-release \
  && yum clean all
# 安装nginx
RUN yum install -y nginx \
  && yum clean all

# 安装node.js环境，下载源码，解压源码，编译安装
# RUN mkdir -p /usr/local/node (copy命令自动创建不存在目录)
# COPY node-v8.11.1-linux-x64/ /usr/local/node/
# RUN tar -xzf /usr/local/node/node-v8.11.1-linux-x64.tar.gz -C /usr/local/node \
#  && ln -s /usr/local/node/node-v8.11.1-linux-x64/bin/node /usr/local/bin/node \
#  && ln -s /usr/local/node/node-v8.11.1-linux-x64/bin/npm /usr/local/bin/npm
ADD node-v8.11.1-linux-x64/node-v8.11.1-linux-x64.tar.gz /usr/local/node/
RUN ln -s /usr/local/node/node-v8.11.1-linux-x64/bin/node /usr/local/bin/node \
  && ln -s /usr/local/node/node-v8.11.1-linux-x64/bin/npm /usr/local/bin/npm

# 安装Supervisor进程管理工具，只能管理非daemon的进程
RUN yum install -y supervisor \
  && yum clean all

# RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisord.conf

# 配置nginx
# 删除nginx 默认配置
# RUN rm /etc/nginx/conf.d/default.conf
# 添加我们自己的配置 default.conf 在下面
COPY default.conf /etc/nginx/conf.d/

# 安装kalix-express-project项目
# RUN mkdir -p /home/app-develop/project/kalix-express-project
COPY kalix-express-project/ /home/app-develop/project/kalix-express-project
# 安装kalix-vue-project项目，把dist文件夹下的文件copy到nginx下面去
COPY dist/ /usr/share/nginx/html/

EXPOSE 3000 8282
# RUN node /home/app-develop/project/kalix-express-project/bin/www
# CMD ["node", "/home/app-develop/project/kalix-express-project/bin/www"]
CMD ["/usr/bin/supervisord"]
