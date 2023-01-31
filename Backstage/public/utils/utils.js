
module.exports = {
    //时间戳
    nowTime :function (){
        return Date.now();
    },
    //1-10随机数
    ramdomNum :function (){
        return Math.floor(Math.random()*100)
    }
}
