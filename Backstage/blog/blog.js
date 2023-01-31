const express = require('express');
const fs = require('fs');
const connection = require("../sql.js");
const router = express.Router();

const utils = require('../public/utils/utils');

router.post('/addBlog', function (req, res) {
    // 直接返回对象
    // console.log('name&psw',req.body);
    let imgData = req.body.blobFile;
    //过滤data:URL
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = new Buffer.from(base64Data, 'base64');
    let id = utils.ramdomNum() + utils.nowTime();
    console.log(id);
    fs.writeFile(`./public/img/${id}.png`, dataBuffer, function(err) {
        if(err){
            res.send({
                code:'100',
                msg:err
            })
        }else{
            res.send({
                code:'200',
                msg:'图片保存成功'
            });
        }
    });
    // let connection = require('../sql.js')
    // connection.init();
    // connection.connect();
    // let sql = `select * from user where userName = '${req.body.name}'`;
    // connection.query(sql).then(rsb => {
    //     if(rsb.length == 0){
    //         res.send({ code: '2300', token: 'zhangc', msg: '用户不存在!请联系管理员' });
    //     }
    //     let data = {...rsb[0]};
    //     if(data.psw == req.body.psw){
    //         res.send({ code: '200', token: 'zhangc', msg: '登录成功' });
    //         return;
    //     }else{
    //         res.send({ code: '2300', token: 'zhangc', msg: '密码错误！' });
    //     }
    // }).catch(rsb => {
    //     console.log('error', rsb);
    //     res.send({ code: '2300', token: 'zhangc', msg: '后端错误，请联系管理员' });
    //
    // });
    // connection.close();
})
module.exports = router
