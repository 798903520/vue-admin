export default class ball {
    len=null//半径
    top=null//顶部距离
    left=null//左部距离
    color=null//颜色
    speed=null//速度
    moveType=null// 方向
    constructor(
        len=this.randomNum(100),
        // top,
        // left,
        // speed=this.randomNum(10-1)+1,
        moveType=this.randomNum(12)
    ) {
        this.len = len;
        this.top = this.randomNum(500-(len*2))+len;
        this.left = this.randomNum(500-(len*2))+len;
        this.color = this.randomColor();
        this.speed = (100 - len)/30;
        this.moveType = moveType;
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

    move(){
        //left => x   top => y
        let sd = this.speed-(this.speed/2),
            sd_1 = this.speed,
            sd_2 = this.speed+(this.speed/2);
          switch (this.moveType){
            case 0:
              this.top-=sd_2;
              this.left+=sd;
              this.top<=0+this.len/2?this.moveType=5:'';
              this.left>=600-this.len/2?this.moveType=11:'';
              break;
            case 1:
              this.top-=sd_1;
              this.left+=sd_1;
              this.top<=0+this.len/2?this.moveType=4:'';
              this.left>=600-this.len/2?this.moveType=10:'';
              break;
            case 2:
              this.top-=sd;
              this.left+=sd_2;
              this.top<=0+this.len/2?this.moveType=3:'';
              this.left>600-this.len/2?this.moveType=9:'';
              break;
            case 3:
              this.top+=sd;
              this.left+=sd_2;
              this.top>=500-this.len/2?this.moveType=2:'';
              this.left>=600-this.len/2?this.moveType=8:'';
              break;
            case 4:
              this.top+=sd_1;
              this.left+=sd_1;
              this.top>=500-this.len/2?this.moveType=1:'';
              this.left>=600-this.len/2?this.moveType=7:'';
              break;
            case 5:
              this.top+=sd_2
              this.left+=sd;
              this.top>=500-this.len/2?this.moveType=0:'';
              this.left>=600-this.len/2?this.moveType=6:'';
              break;
            case 6:
              this.top+=sd_2;
              this.left-=sd;
              this.left<=0+this.len/2?this.moveType=5:'';
              this.top>=500-this.len/2?this.moveType=11:'';
              break;
            case 7:
              this.top+=sd_1;
              this.left-=sd_1;
              this.left<=0+this.len/2?this.moveType=4:'';
              this.top>=500-this.len/2?this.moveType=10:'';
              break;
            case 8:
              this.top+=sd;
              this.left-=sd_2
              this.left<=0+this.len/2?this.moveType=3:'';
              this.top>=500-this.len/2?this.moveType=9:'';
              break;
            case 9:
              this.top-=sd;
              this.left-=sd_2;
              this.top<=0+this.len/2?this.moveType=8:'';
              this.left<=0+this.len/2?this.moveType=2:'';
              break;
            case 10:
              this.top-=sd_1;
              this.left-=sd_1;
              this.top<=0+this.len/2?this.moveType=7:'';
              this.left<=0+this.len/2?this.moveType=1:'';
              break;
            case 11:
              this.top-=sd_2;
              this.left-=sd;
              this.top<=0+this.len/2?this.moveType=6:'';
              this.left<=0+this.len/2?this.moveType=0:'';
              // this.top<=0+this.len/2?this.top=-(this.top):this.top-=sd_2;
              // this.left<=0+this.len/2?this.left=-(this.left):this.left-=sd;
              break;
          }
    }
}
