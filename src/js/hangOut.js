
import {arr_to_strArray} from "./jsFun.js"
//初始化地图
class HangOut {
    constructor(id ,map_data = {}) {
        this.canvasId = id;
        this.wh = map_data.wh;//画布高度kuandu
        this.lockW = map_data.lockW?map_data.lockW:40;//方块边长
        map_data.map_obj?(this.map_arr = map_data.map_obj):this.getMap();
        this.persion=map_data.persion?map_data.persion:{x:0,y:0};
        this.bindBtn();
        this.getImage();


    }

    getMap(){
        let map_arr = [];
        for (let i = 1; i <= this.width; i++) {
            map_arr.push([]);
            for (let j = 1; j <= this.height; j++) {
                map_arr[i - 1][j - 1] = 0;
            }
        }
        this.map_arr = map_arr;
        this.drawMap();
    }

    drawMap(flag = null){
        // let dom = document.getElementById(this.canvasId);
        // let ctx = dom.getContext('2d');
        // ctx.font = "8px";
        // flag?"":ctx.translate(dom.offsetWidth/2, dom.offsetHeight/2);
        // for (let i in this.map_arr) {
        //     for (let j in this.map_arr[i]) {
        //         switch (this.map_arr[i][j]) {
        //             case 0 :
        //                 ctx.strokeStyle ='#6e6e6e';
        //                 // ctx.fillStyle='#ffffff'
        //                 ctx.fillStyle='black'
        //                 let LT = {x: i * this.lockW-this.lockW*this.width/2, y: j * this.lockW-this.lockW*this.height/2};
        //                 ctx.fillRect(LT.x, LT.y, this.lockW, this.lockW);
        //                 ctx.strokeRect(LT.x, LT.y, this.lockW, this.lockW);
        //                 ctx.fillStyle='#8a8a8a'
        //                 ctx.fillText(`${i}, ${j}`,LT.x+5, LT.y+25)
        //                 break;
        //         }
        //     }
        // }
        //
        // ctx.fillStyle = 'white'
        // ctx.arc(this.persion.x, this.persion.y,12,0, (Math.PI / 180) * 360, false);
        // ctx.fill();
    }


    bindBtn(){
        let _this = this;
        // window.addEventListener('keydown',keyIsDown);
        // function keyIsDown(e){
        //     switch (e.key) {
        //         case "w":
        //             let dom = document.getElementById(_this.canvasId);
        //             let ctx = dom.getContext('2d');
        //             ctx.fillStyle = 'white'
        //             // _this.persion.y-=_this.width/2-10;
        //             console.log('_this.persion',_this.persion)
        //             _this.drawMap();
        //             break;
        //         case "s":
        //             break;
        //         case "a":
        //             break;
        //         case "d":
        //             break;
        //         default:
        //             console.log('123124');
        //             break;
        //     }
        // }
    }

    getImage(){
        let img = new Image();
        img.src=new URL("../assets/img/goods_1.jpg",import.meta.url);
        img.onload = ()=>{
            let dom = document.getElementById(this.canvasId);
            let ctx = dom.getContext('2d');
            ctx.drawImage(img,0,0)
            let dd = arr_to_strArray(ctx.getImageData(0,0,100,100).data,4);
            console.log('dd',dd)
        }

    }
}

export {HangOut};
