const express = require('express');
const fs = require('fs');
const connection = require("../sql.js");
const router = express.Router();

//解析FormData
const multiparty = require('multiparty');

const utils = require('../public/utils/utils');

router.post('/addBlog', function (req, res) {
    // 直接返回对象
    //过滤data:URL

    let form = new multiparty.Form();
    form.parse(req,(err, fields, files) => {
        console.log(fields.name[0],fields.content[0])
        let name = fields.name[0];
        let content = fields.content[0];
        let base64Data = fields.blobFile[0].replace(/^data:image\/\w+;base64,/, "");
        let dataBuffer = new Buffer.from(base64Data, 'base64');
        let id = utils.ramdomNum() + utils.nowTime();
        fs.writeFile(`./public/img/${id}.png`, dataBuffer, function(err) {
            if(err){
                res.send({
                    code:'100',
                    msg:err
                })
            }else{
                let connection = require('../sql.js')
                connection.init();
                connection.connect();
                let sql = `INSERT INTO blog_items values ('${id}','${name}','${content}','/public/img/${id}.png',NOW())`;
                connection.query(sql).then(resbon => {
                    res.send({
                        code:'200',
                        msg:'发布成功'
                    });
                }).catch((resbon) => {
                    res.send({
                        code:'100',
                        msg:resbon
                    });
                });
                connection.close();
            }
        });
    })
})
router.post('/getBlog', function (req, res) {
    // 直接返回对象
    let queryData = req.body;
    let connection = require('../sql.js')
    connection.init();
    connection.connect();
    let sql = `SELECT * FROM blog_items order by id desc limit ${queryData.pageNum.length==0?'0':(queryData.pageNum-1)*queryData.pageSize},${queryData.pageSize};`;
    let sql2 = `select count(*) as total from blog_items;`
    // 查询
    let p1 = connection.query(sql);
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
module.exports = router
