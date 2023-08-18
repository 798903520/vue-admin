
//初始化地图
class HangOut {
    constructor(id , width = 100 ,height = 100 ) {
        this.canvasId = id;
        let dom = document.getElementById(this.canvasId);
        this.canvasW = dom.offsetWidth;
        this.canvasH = dom.offsetHeight;
        this.width = width;
        this.height = height;
        this.lockW = 40;
        this.init();

    }

    init(){
        this.getMap();
        this.bindBtn();
    }

    getMap(){
        let map_arr = [];
        for (let i = 1; i <= this.width; i++) {
            map_arr.push([]);
            for (let j = 1; j <= this.height; j++) {
                map_arr[i - 1][j - 1] = 0;
                // if (i % 2 == 0 && j % 2 == 0) {
                //     map_arr[i - 1][j - 1] = 0;
                //     // empty_block_list.push({x:i-1,y:j-1});
                // } else {
                //     map_arr[i - 1][j - 1] = 1
                // }
            }
        }
        this.map_arr = map_arr;
        this.drawMap();
    }

    drawMap(){
        let dom = document.getElementById(this.canvasId);
        let ctx = dom.getContext('2d');
        ctx.font = "8px";
        ctx.translate(dom.offsetWidth/2, dom.offsetHeight/2)
        for (let i in this.map_arr) {
            for (let j in this.map_arr[i]) {
                switch (this.map_arr[i][j]) {
                    case 0 :
                        ctx.strokeStyle ='#6e6e6e';
                        // ctx.fillStyle='#ffffff'
                        ctx.fillStyle='black'
                        let LT = {x: i * this.lockW-this.lockW*this.width/2, y: j * this.lockW-this.lockW*this.height/2};
                        ctx.fillRect(LT.x, LT.y, this.lockW, this.lockW);
                        ctx.strokeRect(LT.x, LT.y, this.lockW, this.lockW);
                        ctx.fillStyle='#4e4e4e'
                        ctx.fillText(`${i}, ${j}`,LT.x+5, LT.y+25)
                        break;
                }
            }
        }

        ctx.fillStyle = 'white'
        ctx.arc(0, 0,10,(Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
        ctx.fill();
    }


    bindBtn(){
        window.addEventListener('keydown',this.keyIsDown);
    }

    keyIsDown(e){
        console.log('event',e)
    }
}

export {HangOut};
