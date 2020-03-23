路由和API

API:
前端和后端 不同端(子系统)之间对接的一个术语
url(路由),输入,输出

路由:
API的一部分
后端系统内部的一个定义

登录注册
cookie,session
redis
前端联调nginx
http-server 启一个web服务器

日志 
node stream

日志功能开发和使用

日志文件拆分 日志内容分析

crontab 日志拆分
/Users/liuqi/Desktop/qinode/blog-1/src/utils

readline 日志分析 通过Stream的方式 逐行读取数据

安全 
sql注入 mysql中的escape
xss攻击 xss库
加密密码 crypto 密匙


不使用框架开发server的最后总结

开发了哪些功能模块,完整的流程
用到了哪些核心的知识点
回顾server和前端的区别

处理http接口
连接数据库
实现登录
安全
日志
上线


核心知识点
http,nodeJS处理http,处理路由,mysql
cookie,session,redis,nginx反向代理
sql注入,xss攻击,加密
日志,stream,contrab,redline


server和前端的区别

五个区别
服务稳定性
内存cpu 优化stream 扩展redis
日志记录 
安全(登录验证 )
集群和服务拆分(设计已经支持)

下一步
不使用框架开发 从零开始 关注底层api
很琐碎,很复杂,没有标准可依,很容易将代码写乱
适合学习,不适合应用,接下来开始express和koa2

