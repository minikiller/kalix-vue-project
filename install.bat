@echo 'Start to run yarn'
@echo off
call yarn config set registry https://registry.npm.taobao.org

set PHANTOMJS_CDNURL=https://npm.taobao.org/dist/phantomjs

set chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver

call  yarn
