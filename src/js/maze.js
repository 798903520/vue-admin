import {utils} from "./utils";

class Maze {
    constructor(dom_name) {
        let dom = document.getElementById(dom_name);
        this.dom_name = dom_name;
        this.dom_height = dom.height;
        this.dom_width = dom.width;

        //行走的点
        this.throght_p = {x:0,y:1};

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
        // 绘制完成注册事件 监听键盘 做出操作
        this.add_listen();
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
        map_arr[this.throght_p.x][this.throght_p.y] = 2;
        map_arr[this.yOne_lineNum-1][this.xOne_lineNum-2] = 0;

        //赋值
        this.empty_block_list = empty_block_list;
        this.empty_list_len = empty_block_list.length;
        return map_arr;
    }

    //生成迷宫
    create_maze(){
        let hell = [];
        let path = [];
        let _that = this;

        //判断当前点位是否在路径列表中    tf:根据类型 是否添加进path
        function addHell(data,tf){
            let dd = path.filter(item => {
                return item.x == data.x&&item.y == data.y
            });
            if(dd.length == 0){
                if(tf == 'add'){
                    path.push(data);
                }
                return false;
            }else{
                return true;
            }
        }

        function findHell(data={x:1,y:1}){
            addHell(data,'add');
            //    获得当前通路上下左右的块
            let four_point =
                [{x: data.x, y: data.y - 1},//上
                    {x: data.x, y: data.y + 1},//下
                    {x: data.x - 1, y: data.y},//左
                    {x: data.x + 1, y: data.y}];//右
            //除去访问过的
            let empty = four_point.filter((item) => {
                return _that.map_arr[item.x][item.y] == 1
            });
            // 除去四边实心墙
            empty = empty.filter((item) => {
                return item.x != 0&&item.x!=_that.yOne_lineNum-1&&item.y != 0&&item.y!=_that.xOne_lineNum-1
            })
            hell = hell.concat(empty);
            while(hell.length>0){
                hellBreake()
            }
        }
        function hellBreake(){
            let key = utils.get_random_num(0,hell.length-1);
            let oneHell = hell[key];
            if(oneHell.x%2 == 0){
                //    左右存在路径
                let left = addHell({x:oneHell.x-1,y:oneHell.y},'TF'),
                    right = addHell({x:oneHell.x+1,y:oneHell.y},'TF');
                left&&right?'':_that.map_arr[oneHell.x][oneHell.y]=0;
                hell.splice(key,1);
                if(!left){findHell({x:oneHell.x-1,y:oneHell.y})}
                if(!right){findHell({x:oneHell.x+1,y:oneHell.y})}
            }else{
                //    上下存在路径
                let top = addHell({x:oneHell.x,y:oneHell.y-1},'TF'),
                    bottom = addHell({x:oneHell.x,y:oneHell.y+1},'TF');
                top&&bottom?'':_that.map_arr[oneHell.x][oneHell.y]=0;
                hell.splice(key,1);
                //判断没走过的点 ,加入路径列表中
                if(!top){findHell({x:oneHell.x,y:oneHell.y-1})}
                if(!bottom){findHell({x:oneHell.x,y:oneHell.y+1})}
            }
        }
        findHell();
    }

    //    绘制图形
    draw_block() {
        let ctx = document.getElementById(this.dom_name).getContext('2d');
        ctx.clearRect(0,0,this.dom_width,this.dom_height);
        for(let i in this.map_arr){
            for(let j in this.map_arr[i]) {
                if (this.map_arr[i][j] == 1) {
                    ctx.strokeStyle ='#ffffff';
                    ctx.fillStyle='#6e6e6e'
                    let LT = {x: i * this.item_width, y: j * this.item_width};
                    ctx.fillRect(LT.x, LT.y, this.item_width, this.item_width);
                    ctx.strokeRect(LT.x, LT.y, this.item_width, this.item_width);
                }else if(this.map_arr[i][j] == 2){
                    console.log('i,j',i,j)
                    ctx.strokeStyle ='#ffffff';
                    ctx.fillStyle='#ff8383'
                    let LT = {x: i * this.item_width, y: j * this.item_width};
                    ctx.fillRect(LT.x, LT.y, this.item_width, this.item_width);
                    ctx.strokeRect(LT.x, LT.y, this.item_width, this.item_width);
                }
            }
        }
    }

    add_listen(){
        let _this = this;
        window.addEventListener('keydown',function(e){
            switch (e.code) {
                case 'ArrowLeft':
                    if(_this.throght_p.x-1>0 && _this.map_arr[_this.throght_p.x-1][_this.throght_p.y] == 0){
                        _this.map_arr[_this.throght_p.x][_this.throght_p.y] = 0;
                        _this.throght_p.x--;
                        _this.map_arr[_this.throght_p.x][_this.throght_p.y] = 2;
                        _this.draw_block();
                    }
                    break;
                case 'ArrowDown':
                    if(_this.throght_p.y+1<_this.xOne_lineNum-1 && _this.map_arr[_this.throght_p.x][_this.throght_p.y+1] == 0){
                        _this.map_arr[_this.throght_p.x][_this.throght_p.y] = 0;
                        _this.throght_p.y++;
                        _this.map_arr[_this.throght_p.x][_this.throght_p.y] = 2;
                        _this.draw_block();
                    }
                    break;
                case 'ArrowRight':
                    if(_this.throght_p.x+1<_this.yOne_lineNum-1 && _this.map_arr[_this.throght_p.x+1][_this.throght_p.y] == 0){
                        _this.map_arr[_this.throght_p.x][_this.throght_p.y] = 0;
                        _this.throght_p.x++;
                        _this.map_arr[_this.throght_p.x][_this.throght_p.y] = 2;
                        _this.draw_block();
                    }
                    break;
                case 'ArrowUp':
                    if(_this.throght_p.y-1>0 && _this.map_arr[_this.throght_p.x][_this.throght_p.y-1] == 0){
                        _this.map_arr[_this.throght_p.x][_this.throght_p.y] = 0;
                        _this.throght_p.y--;
                        _this.map_arr[_this.throght_p.x][_this.throght_p.y] = 2;
                        _this.draw_block();
                    }
                    break;
                default:
                    break;
            }
        })
    }
}

export {Maze}
