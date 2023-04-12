
const express = require('express');
const fs = require('fs');
const connection = require("../sql.js");
const router = express.Router();

//解析FormData
const multiparty = require('multiparty');

const utils = require('../public/utils/utils');

router.post('/uploadImg', function (req, res) {
    // 直接返回对象

    let form = new multiparty.Form();
    form.parse(req,(err, fields, files) => {
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
              res.send({
                code:'200',
                data:`/public/img/${id}.png`
            });
            }
        });
    })
})
module.exports = router
