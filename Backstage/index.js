const express = require('express')
const path = require("path");
const app = express();
app.use(express.urlencoded());//传递键值对
app.use(express.json());//传递json
app.use('/public',express.static(path.join(__dirname, './public')));//指定静态资源文件夹

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.use('/login', require('./login/login.js'));
app.use('/first', require('./first/first.js'));
app.use('/blog', require('./blog/blog.js'));
app.listen('8001', () => {
  console.log('服务器启动成功')
})
