const express = require('express')
const router = express.Router()
router.get('/get_p_t_List', function (req, res) {
  // 直接返回对象
  let queryData = req.query;
let connection = require('../sql.js')
    connection.init();
    connection.connect();
    let sql = `SELECT * FROM p_type ${queryData.typeName.length==0?'':'where typeName like "%'+queryData.typeName+'%"'} limit ${queryData.pageNum.length==0?'0':(queryData.pageNum-1)*queryData.pageSize},${queryData.pageSize.length==0?'10':queryData.pageSize};`;
    let sql2 = `select count(*) as total from p_type ${queryData.typeName?'where typeName like "%'+queryData.typeName+'%"':''};`
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

router.get('/get_p_t_Data', function (req, res) {
  // 直接返回对象
  let queryData = req.query;
  let connection = require('../sql.js')
    connection.init();
    connection.connect();
    let sql = `SELECT * FROM p_type where typeId = '${queryData.typeId}'`;
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
router.post('/add_PT', function (req, res) {
  // 直接返回对象
  console.log('name&psw',req.body);
  let data = req.body;
  let connection = require('../sql.js')
  connection.init();
  connection.connect();
  let sql = `INSERT INTO p_type (type,typeName) values ("${data.type}","${data.typeName}")`;
  console.log('sql',sql);
  connection.query(sql).then(rsb => {
    res.send({ code: '200', msg: '新增成功' });
  }).catch(rsb => {
    console.log('error', rsb);
    res.send({ code: '2300', token: 'zhangc', msg: '新增失败，请联系管理员' });

  });
  connection.close();
})
// 编辑
router.post('/edit_PT', function (req, res) {
  // 直接返回对象
  console.log('name&psw',req.body);
  let connection = require('../sql.js')
  connection.init();
  connection.connect();
  let sql = `UPDATE p_type set type = "${req.body.type}",typeName = "${req.body.typeName}" where typeId = ${req.body.typeId}`;
  connection.query(sql).then(rsb => {
    res.send({ code: '200', token: 'zhangc', msg: '修改成功' });
  }).catch(rsb => {
    console.log('error', rsb);
    res.send({ code: '2300', token: 'zhangc', msg: '修改失败，请联系管理员' });

  });
  connection.close();
})

// 删除
router.post('/delete_PT', function (req, res) {
  // 直接返回对象
  console.log('name&psw',req.body);
  let connection = require('../sql.js')
  connection.init();
  connection.connect();
  let sql = `delete from p_type where typeId in (${req.body.ids})`;
  console.log('sql',sql);
  connection.query(sql).then(rsb => {
    res.send({ code: '200', token: 'zhangc', msg: '删除成功' });
  }).catch(rsb => {
    console.log('error', rsb);
    res.send({ code: '2300', token: 'zhangc', msg: '删除失败，请联系管理员' });

  });
  connection.close();
})
module.exports = router
