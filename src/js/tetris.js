export default class tetris {
    constructor(type = this.randomNum(7)) {
        this.type = type ;
        this.init7Type()
    }
    //随机数据
    randomNum(size){
        return Math.floor(Math.random()*size)
    }
    //x长度 y长度
    fillArr(x,y){
       let data = new Array(x).fill([]).map(() => Array().fill(1))
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
                this.arr = this.fillArr(1,4);
                break;
            case 4: //L型
                this.arr = this.fillArr(1,4);
                break;
            case 5: //J型
                this.arr = this.fillArr(1,4);
                break;
            case 6: //T型
                this.arr = this.fillArr(1,4);
                break;
        }
    }
}
