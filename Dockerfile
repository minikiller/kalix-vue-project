# Version: 0.0.1
# 使用基础镜像nginx
FROM nginx
# 作者
MAINTAINER HQJ "150091225@qq.com"
# 运行命令

# 删除nginx 默认配置
RUN rm /etc/nginx/conf.d/default.conf
# 添加我们自己的配置 default.conf 在下面
ADD default.conf /etc/nginx/conf.d/
# 把dist文件夹下的文件copy到nginx下面去
COPY dist/ /usr/share/nginx/html/
