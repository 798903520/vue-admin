export default class ball {
    len=null//半径
    top=null//顶部距离
    left=null//左部距离
    color=null//颜色
    speed=null//速度
    constructor(
        len=this.randomNum(),
        top=this.randomNum(),
        left=this.randomNum(),
        speed=this.randomNum(),
    ) {
        this.len = len;
        this.top = top;
        this.left = left;
        this.color = this.randomColor();
        this.speed = speed;
    }

    //随机数据
    randomNum(){
        return Math.floor(Math.random()*100)
    }
    //随机颜色
    randomColor(){
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        return `rgb(${r},${g},${b})`
    }
}
