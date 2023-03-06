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
app.use('/table', require('./table/first.js'));
app.use('/table', require('./table/product.js'));
app.use('/table', require('./table/product_type.js'));
app.use('/table', require('./table/product_business.js'));
app.use('/blog', require('./blog/blog.js'));
app.use('/bug', require('./bug/bug.js'));
app.use('/upload', require('./uploadImg/upload.js'));
app.listen('8001', () => {
  console.log('服务器启动成功')
})
