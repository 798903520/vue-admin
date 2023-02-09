const express = require('express')
const router = express.Router()
router.post('/login', function (req, res) {
  // 直接返回对象
  console.log('name&psw',req.body);
  let connection = require('../sql.js')
  connection.init();
  connection.connect();
  let sql = `select * from user where userName = '${req.body.name}'`;
  connection.query(sql).then(rsb => {
    if(rsb.length == 0){
      res.send({ code: '2300', token: 'zhangc', msg: '用户不存在!请联系管理员' });
      return;
    }
    let data = {...rsb[0]};
    if(data.psw == req.body.psw){
      res.send({ code: '200', token: 'zhangc',data:data, msg: '登录成功' });
      return;
    }else{
      res.send({ code: '2300', token: 'zhangc', msg: '密码错误！' });
    }
  }).catch(rsb => {
    console.log('error', rsb);
    res.send({ code: '2300', token: 'zhangc', msg: '后端错误，请联系管理员' });

  });
  connection.close();
})
module.exports = router
