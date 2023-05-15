const express = require('express')
const router = express.Router()
router.get('/get_p_List', function (req, res) {
  // 直接返回对象
  let queryData = req.query;
let connection = require('../sql.js')
    connection.init();
    connection.connect();
    let sql = `SELECT * FROM product where ${queryData.name.length==0?'':'name like "%'+queryData.name+'%" and '} p_b_id =  ${queryData.p_b_id};`;
    let sql2 = `select count(*) as total from product ${queryData.name?'where name like "%'+queryData.name+'%"':''};`
    // 查询
    let p1 = connection.query(sql)
    let p2 = connection.query(sql2);
    Promise.all([p1,p2]).then((data)=>{
      res.send({
        code:'200',
        data:data[0],
        total:data[1][0].total,
        msg:'查询成功'
      })
    }).catch(()=>{
      res.send({
        code:'100',
        msg:"查询出错,请通知管理员"
      });
    });
    connection.close();
})

router.get('/get_p_Data', function (req, res) {
  // 直接返回对象
  let queryData = req.query;
  let connection = require('../sql.js')
    connection.init();
    connection.connect();
    let sql = `SELECT * FROM product where product_id = '${queryData.product_id}'`;
    // 查询
    connection.query(sql).then(response => {
      res.send({
        code:'200',
        data:response[0],
        msg:'查询成功'
      })
    }).catch(response => {
      res.send({
        code:'100',
        data:response,
        msg:'失败'
      })
    });
    connection.close();
})

// 新增
router.post('/add_P', function (req, res) {
  // 直接返回对象
  console.log('name&psw',req.body);
  let data = req.body;
  let connection = require('../sql.js')
  connection.init();
  connection.connect();
  let sql = `INSERT INTO product (color,content,imgPaths,name,p_b_id,price,size,type) values ("${data.color}","${data.content}","${data.imgPaths}","${data.name}","${data.p_b_id}","${data.price}","${data.size}","${data.type}")`;
  console.log('sql',sql);
  connection.query(sql).then(rsb => {
    res.send({ code: '200', token: 'zhangc', msg: '新增成功' });
  }).catch(rsb => {
    console.log('error', rsb);
    res.send({ code: '2300', token: 'zhangc', msg: '新增失败，请联系管理员' });

  });
  connection.close();
})
// 编辑
router.post('/edit_P', function (req, res) {
  // 直接返回对象
  console.log('name&psw',req.body);
  let connection = require('../sql.js')
  connection.init();
  connection.connect();
  let sql = `UPDATE product set color = "${req.body.color}",content = "${req.body.content}",imgPaths = "${req.body.imgPaths}",name = "${req.body.name}",price = "${req.body.price}",size = "${req.body.size}" where product_id = ${req.body.product_id}`;
  connection.query(sql).then(rsb => {
    res.send({ code: '200', token: 'zhangc', msg: '修改成功' });
  }).catch(rsb => {
    console.log('error', rsb);
    res.send({ code: '2300', token: 'zhangc', msg: '修改失败，请联系管理员' });

  });
  connection.close();
})

// 删除
router.post('/delete_P', function (req, res) {
  // 直接返回对象
  console.log('name&psw', req.body);
  let connection = require('../sql.js')
  connection.init();
  connection.connect();
  let sql = `delete from product where product_id in (${req.body.ids})`;
  console.log('sql', sql);
  connection.query(sql).then(rsb => {
    res.send({ code: '200', msg: '删除成功' });
  }).catch(rsb => {
    console.log('error', rsb);
    res.send({ code: '2300', msg: '删除失败，请联系管理员' });

  });
  connection.close();
})
module.exports = router
