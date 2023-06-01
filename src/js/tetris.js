export default class tetris {
    length=null// 边长 需要根据传过来的数据计算位置
    type=null//方块类型
    arr = null//方块数组
    height=null// 初始高度
    width=null// 初始宽度
    constructor(length = 10,type = this.randomNum(7)) {
        this.type = type ;
        this.length = length;
        this.init7Type()
    }
    //随机数据
    randomNum(size){
        return Math.floor(Math.random()*size)
    }
    //x长度 y长度
    fillArr(x,y){
       let data = [];
       for(let i=0;i<x;i++){
        data.push([]);
        for(let j=0;j<y;j++){
            data[i][j] = 1;
        }
       }
        return data;
    }
    init7Type(){
        //第一层数组长度是列 第二层数组长度是行
        switch (this.type) {
            case 0: //o型
                this.arr = this.fillArr(2,2);
                break;
            case 1: //I型
                this.arr = this.fillArr(1,4);
                break;
            case 2: //S型
                this.arr = this.fillArr(3,2);
                this.arr[0][0] = 0;
                this.arr[2][1] = 0;
                break;
            case 3: //Z型
                this.arr = this.fillArr(3,2);
                this.arr[2][0] = 0;
                this.arr[0][1] = 0;
                break;
            case 4: //L型
                this.arr = this.fillArr(2,3);
                this.arr[1][0] = 0;
                this.arr[1][1] = 0;
                break;
            case 5: //J型
                this.arr = this.fillArr(2,3);
                this.arr[0][0] = 0;
                this.arr[0][1] = 0;
                break;
            case 6: //T型
                this.arr = this.fillArr(3,2);
                this.arr[0][1] = 0;
                this.arr[2][1] = 0;
                break;
        }
        this.height = 0 - this.arr[0].length*this.length;
        this.width = 0 - this.arr.length*this.length;
    }
    moveBlock(){
        this.height = this.height + this.length;
    }
}
