# (以后可能做个商城,目前就我自己写着玩的)
1. 安装mysql80
```
后面有空找个安装链接
安装完成
创建表
use sakila;
create table user (
userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(50) NOT NULL,
    psw VARCHAR(50) NOT NULL,
);
//创建用户名密码,可自行修改
insert into user value(2, 'zhangc','zhangc')
 
 ```

2. 安装依赖
```angular2html
安装express和mysql

打开just_test文件夹

npm install

等待安装完成
```

3. 启动前端项目
```angular2html
npm serve
```

5. 运行后台服务
```angular2html
打开前端文件夹
在前端文件夹目录控制台 运行命令
cd Backstage
node index.js

启动成功控制台会显示消息
```

