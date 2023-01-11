const express = require('express')
const router = express.Router()
router.get('/getCityList', function (req, res) {
  // 直接返回对象
  let queryData = req.query;
let connection = require('../sql.js')
    connection.init();
    connection.connect();
    let sql = `SELECT * FROM city ${queryData.city.length==0?'':'where city like "%'+queryData.city+'%"'} limit ${queryData.pageNum.length==0?'0':(queryData.pageNum-1)*queryData.pageSize},${queryData.pageSize.length==0?'10':queryData.pageSize};`;
    let sql2 = `select count(*) as total from city ${queryData.city?'where city like "%'+queryData.city+'%"':''};`
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

router.get('/editData', function (req, res) {
  // 直接返回对象
  let queryData = req.query;
  let connection = require('../sql.js')
    connection.init();
    connection.connect();
    let sql = `SELECT * FROM city where city_id = '${queryData.id}'`;
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
router.post('/add', function (req, res) {
  // 直接返回对象
  console.log('name&psw',req.body);
  let data = req.body;
  let connection = require('../sql.js')
  connection.init();
  connection.connect();
  let sql = `INSERT INTO city (city_id,city,country_id,last_update) values ("${data.city_id}","${data.city}","${data.country_id}","${data.last_update}")`;
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
router.post('/edit', function (req, res) {
  // 直接返回对象
  console.log('name&psw',req.body);
  let connection = require('../sql.js')
  connection.init();
  connection.connect();
  let sql = `UPDATE city set city = "${req.body.city}" where city_id = ${req.body.city_id}`;
  connection.query(sql).then(rsb => {
    res.send({ code: '200', token: 'zhangc', msg: '修改成功' });
  }).catch(rsb => {
    console.log('error', rsb);
    res.send({ code: '2300', token: 'zhangc', msg: '修改失败，请联系管理员' });

  });
  connection.close();
})
module.exports = router
