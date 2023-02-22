# 
1. 安装mysql80
2. 安装请查看此链接

   ![](src/assets/img/qrcode_blog.png)
```

安装完成


//userId     用户id
//permission 用户权限
//userName   用户名
//psw        用户密码
//imgPath    用户头像
创建用户表
use sakila;
create table user (
userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    permission VARCHAR(15),
    userName VARCHAR(64) NOT NULL,
    psw VARCHAR(64) NOT NULL,
    imgPath varchar(255)
);
//创建用户名密码,可自行修改
use sakila ;
INSERT INTO user VALUES ( NULL,"root","zhangc","zhangc",'/public/img/1675755927056.png');
 
 ```

```
创建保存上传文字图片的表
use sakila;
create table blog_items (
    id varchar (64) NOT NULL UNIQUE PRIMARY KEY,
    name varchar (64) NOT NULL,
    content varchar(200),
    imgPath varchar(255),
    time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
)
```

```
  创建订单表
  use sakila ;
  //创建商品类型表
create table p_type (
    type varchar (24) NOT NULL UNIQUE PRIMARY KEY,
    typeName varchar (24) NOT NULL
);
//创建商家表
create table p_business (
	type varchar (24) NOT NULL,
    p_b_id varchar (64) NOT NULL UNIQUE PRIMARY KEY,
    name varchar (64) NOT NULL,
    content varchar(200),
    headImgPath varchar(255),
    createTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);
//创建商品表
create table product (
	type varchar (24) NOT NULL,
	p_b_id varchar (64) NOT NULL,
    product_id varchar (64) NOT NULL UNIQUE PRIMARY KEY,
    name varchar (64) NOT NULL,
    content varchar(200),
    imgPaths varchar(255),
    create_product_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
)
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

