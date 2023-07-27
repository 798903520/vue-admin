import {utils} from "./utils";

class Maze {
    constructor(dom_name) {
        let dom = document.getElementById(dom_name);
        this.dom_name = dom_name;
        this.dom_height = dom.height;
        this.dom_width = dom.width;

        this.item_width = 20;

        this.empty_block_list = [];

        //每行多少个
        this.yOne_lineNum = parseInt(this.dom_width / this.item_width);
        this.yOne_lineNum = this.yOne_lineNum % 2 == 0 ? this.yOne_lineNum - 1 : this.yOne_lineNum;
        //每列多少个
        this.xOne_lineNum = parseInt(this.dom_height / this.item_width);
        this.xOne_lineNum = this.xOne_lineNum % 2 == 0 ? this.xOne_lineNum - 1 : this.xOne_lineNum;

        //初始化迷宫
        this.map_arr = this.init_map();
        //生成迷宫
        this.create_maze();
        //绘制迷宫
        this.draw_block()
    }

    init_map() {
        let _this = this;
        let map_arr = [];
        let empty_block_list = []
        //循环列
        for (let i = 1; i <= this.yOne_lineNum; i++) {
            map_arr.push([]);
            for (let j = 1; j <= this.xOne_lineNum; j++) {
                if (i % 2 == 0 && j % 2 == 0) {
                    map_arr[i - 1][j - 1] = 0;
                    empty_block_list.push({x:i-1,y:j-1});
                } else {
                    map_arr[i - 1][j - 1] = 1
                }
            }
        }
        // 固定坐上入口 右下出口
        map_arr[0][1] = 0;
        map_arr[this.yOne_lineNum-1][this.xOne_lineNum-2] = 0;
        this.empty_block_list = empty_block_list;
        this.empty_list_len = empty_block_list.length;
        return map_arr;
    }

    //生成迷宫
    create_maze(){
        //列表多长 就要随机多少次
        for(let i=0 ;i<this.empty_list_len;i++){
            let any_one = utils.get_random_num(0,this.empty_block_list.length-1);
            let CBlock = this.empty_block_list[any_one];

        //    获得当前通路上下左右的块
            let four_point =
                [{x: CBlock.x, y: CBlock.y - 1},//上
                {x: CBlock.x, y: CBlock.y + 1},//下
                {x: CBlock.x - 1, y: CBlock.y},//左
                {x: CBlock.x + 1, y: CBlock.y}];//右
            let empty = four_point.filter((item) => {
                return (this.map_arr[item.x][item.y] == 0)
            }).length;
            console.log('empty',empty)
            // let ram = utils.get_random_num(0,3);
        }
    }

    //    绘制图形
    draw_block() {
        let ctx = document.getElementById(this.dom_name).getContext('2d');
        ctx.strokeStyle ='#ffffff';
        ctx.fillStyle='#6e6e6e'
        for(let i in this.map_arr){
            for(let j in this.map_arr[i]) {
                if (this.map_arr[i][j] == 1) {
                    let LT = {x: i * this.item_width, y: j * this.item_width};
                    ctx.fillRect(LT.x, LT.y, this.item_width, this.item_width);
                    ctx.strokeRect(LT.x, LT.y, this.item_width, this.item_width);
                }
            }
        }
    }
}

export {Maze}
