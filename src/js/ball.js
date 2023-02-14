export default class ball {
    len=null//半径
    top=null//顶部距离
    left=null//左部距离
    color=null//颜色
    speed=null//速度
    moveType=null// 方向
    timmer=null//定时器
    constructor(
        len=this.randomNum(100),
        // top,
        // left,
        speed=this.randomNum(10-1)+1,
        moveType=this.randomNum(12)
    ) {
        this.len = len;
        this.top = this.randomNum(500-(len*2))+len;
        this.left = this.randomNum(500-(len*2))+len;
        this.color = this.randomColor();
        this.speed = (100 - len)/40;
        this.moveType = moveType;
        console.log(this.len,this.speed,-(-500))
    }

    //随机数据
    randomNum(size){
        return Math.floor(Math.random()*size)
    }
    //随机颜色
    randomColor(){
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        return `rgb(${r},${g},${b})`
    }
}
