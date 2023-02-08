const express = require('express')
const request = require('request')//node端请求
const cheerio = require('cheerio')//node端解析模块
const router = express.Router()

// 抓取
router.post('/debugIt', function (req, res) {
    // 直接返回对象
    let url = req.body.URL;
    request({
        url:url,
        method:'get'
    },function (e,r,b){
    //    e 错误代码   b 传回的内容
        if(e){
            console.log('e->',e)
            res.send({
                code:'100',
                msg:'抓取失败'
            })
        }else{
            // console.log('b->',b)
            let $ = cheerio.load(b);
            let result = [];
            let title = $('.info>.title');
            let upName = $('.detail>a>.up-name');
            let upSpace = $('.detail>a');
            let other = $('.detail .detail-state');
            for (let i=0; i<title.length;i++){
                result.push({
                    name:$(title[i]).text(),
                    href:$(title[i]).attr('href').split('//')[1],
                    upName:$(upName[i]).text().split('\n')[1].replace(/\s+/g,''),
                    upSpace:$(upSpace[i]).attr('href').split('//')[1],
                    userLook:$(other[i]).children().eq(0).text().split('\n')[1].replace(/\s+/g,''),
                    userTalk:$(other[i]).children().eq(1).text().split('\n')[1].replace(/\s+/g,''),
                });
            }
            res.send({
                code:'200',
                data:result,
                msg:'抓取成功'
            })
        }
    })
})
module.exports = router
