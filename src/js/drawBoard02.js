class Rectangle {
    // 定位
    x=null
    y=null
    type='Rectangle'
    width=null //宽
    height=null //高
    ctx=null //画笔
    strokeColor='black'
    name=null
    fillColor='rgba(255,255,255,0)'
    domName=null //需要添加的dom id
    selected=null//选中状态
    constructor(domName,data = {
        x:100,y:100,width:100,height:100
    }) {
        this.domName = domName;
        this.ctx = document.getElementById(domName).getContext('2d');
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        // this.drawRectangle();
    }

    createdFourBlock(){
        let dom = document.getElementsByClassName('board')[0];
        let topDom = document.createElement('div');
        topDom.setAttribute('style','height: 10px;width: 10px;background-color: rgba(70, 123, 224,0.5);background-color: rgba(70, 123, 224,0.5);user-select: none;cursor: row-resize;')
    }

    setBtn(data = {
        top:{
            x:-10,
            y:-10
        },
        right:{
            x:-10,
            y:-10
        },
        bottom:{
            x:-10,
            y:-10
        },
        left:{
            x:-10,
            y:-10
        }
    }) {
        let dom = document.getElementsByClassName('board')[0];
        dom.style.setProperty('--topLine-top',data.top.y+'px')
        dom.style.setProperty('--topLine-left',data.top.x+'px')

        dom.style.setProperty('--rightLine-top',data.right.y+'px')
        dom.style.setProperty('--rightLine-left',data.right.x+'px')

        dom.style.setProperty('--bottomLine-top',data.bottom.y+'px')
        dom.style.setProperty('--bottomLine-left',data.bottom.x+'px')

        dom.style.setProperty('--leftLine-top',data.left.y+'px')
        dom.style.setProperty('--leftLine-left',data.left.x+'px')
    }

    lineBtnPosition(){
        let data = {
            top:{
                x:this.x -4,
                y:this.y-parseInt(this.height/2)-4
            },
            right:{
                x:this.x+parseInt(this.width/2) -4,
                y:this.y-4
            },
            bottom:{
                x:this.x -4,
                y:this.y+parseInt(this.height/2)-4
            },
            left:{
                x:this.x - parseInt(this.width/2) -4,
                y:this.y-4
            }
        }

        this.setBtn(data)
    }
    isSelect(e){
        return this.x-parseInt(this.width/2)<e.offsetX &&
            e.offsetX < (this.x-parseInt(this.width/2)+this.width) &&
            this.y-parseInt(this.height/2)<e.offsetY &&
            e.offsetY < (this.y-parseInt(this.height/2)+this.height)
    }
    blockPosition(moveDomId,positionArr,e){
        switch (moveDomId){
            case 'topBlock':
                this.y += (e.pageY-positionArr.y)/2;
                this.height -= (e.pageY-positionArr.y);
                break;
            case 'rightBlock':
                this.x += (e.pageX-positionArr.x)/2;
                this.width += (e.pageX-positionArr.x);
                break;
            case 'bottomBlock':
                this.y += (e.pageY-positionArr.y)/2;
                this.height += (e.pageY-positionArr.y);
                break;
            case 'leftBlock':
                this.x += (e.pageX-positionArr.x)/2;
                this.width -= (e.pageX-positionArr.x);
                break;
        }
    }
    draw(){
        this.ctx = document.getElementById(this.domName).getContext('2d');
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.fillStyle = this.fillColor;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.rect(this.x-parseInt(this.width/2),this.y-parseInt(this.height/2),this.width,this.height);
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.closePath();
    }
    clean(){
        this.ctx = document.getElementById(this.domName).getContext('2d');
        this.ctx.clearRect(0,0,this.ctx.width,this.ctx.height);
        this.ctx.fillStyle = 'rgba(255,255,255,1)'
        this.ctx.fillRect(this.x-parseInt(this.width/2),this.y-parseInt(this.height/2),this.width,this.height);
    }
}

class Circle {
    // 定位
    x=null
    y=null
    type='Circle'
    width=null //宽
    height=null //高
    ctx=null //画笔
    strokeColor='black'
    name=null
    fillColor='rgba(255,255,255,1)'
    domName=null //需要添加的dom id
    selected=null//选中状态
    constructor(domName,data = {
        x:100,y:100,width:100
    }) {
        this.domName = domName;
        this.ctx = document.getElementById(domName).getContext('2d');
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.width;
        // this.drawRectangle();
    }

    createdFourBlock(){
        let dom = document.getElementsByClassName('board')[0];
        let topDom = document.createElement('div');
        topDom.setAttribute('style','height: 10px;width: 10px;background-color: rgba(70, 123, 224,0.5);background-color: rgba(70, 123, 224,0.5);user-select: none;cursor: row-resize;')
    }

    setBtn(data = {
        top:{
            x:-10,
            y:-10
        },
        right:{
            x:-10,
            y:-10
        },
        bottom:{
            x:-10,
            y:-10
        },
        left:{
            x:-10,
            y:-10
        }
    }) {
        let dom = document.getElementsByClassName('board')[0];
        dom.style.setProperty('--topLine-top',data.top.y+'px')
        dom.style.setProperty('--topLine-left',data.top.x+'px')

        dom.style.setProperty('--rightLine-top',data.right.y+'px')
        dom.style.setProperty('--rightLine-left',data.right.x+'px')

        dom.style.setProperty('--bottomLine-top',data.bottom.y+'px')
        dom.style.setProperty('--bottomLine-left',data.bottom.x+'px')

        dom.style.setProperty('--leftLine-top',data.left.y+'px')
        dom.style.setProperty('--leftLine-left',data.left.x+'px')
    }

    //小块位置
    lineBtnPosition(){
        let data = {
            top:{
                x:-10,
                y:-10
            },
            right:{
                x:this.x+parseInt(this.width) -4,
                y:this.y-4
            },
            bottom:{
                x:-10,
                y:-10
            },
            left:{
                x:-10,
                y:-10
            }
        }

        this.setBtn(data)
    }

    //是否选中
    isSelect(e){

        let data = (this.x - e.offsetX)*(this.x - e.offsetX)+(this.y - e.offsetY)*(this.y - e.offsetY);
        let dd =  parseInt(Math.sqrt(data)) <= this.width;
        return dd;
    }
    //小方块调整大小
    blockPosition(moveDomId,positionArr,e){
        switch (moveDomId){
            // case 'topBlock':
            //     this.y += (e.pageY-positionArr.y)/2;
            //     this.height -= (e.pageY-positionArr.y);
            //     break;
            case 'rightBlock':
                this.width += (e.pageX-positionArr.x);
                break;
            // case 'bottomBlock':
            //     this.y += (e.pageY-positionArr.y)/2;
            //     this.height += (e.pageY-positionArr.y);
            //     break;
            // case 'leftBlock':
            //     this.x += (e.pageX-positionArr.x)/2;
            //     this.width -= (e.pageX-positionArr.x);
            //     break;
        }
    }
    //绘制
    draw(){
        this.ctx = document.getElementById(this.domName).getContext('2d');
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.fillStyle = this.fillColor;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.width,(Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.closePath();
    }
    //清理
    clean(){
        this.ctx = document.getElementById(this.domName).getContext('2d');
        this.ctx.clearRect(0,0,this.ctx.width,this.ctx.height);
        this.ctx.fillStyle = 'rgba(255,255,255,1)'
        this.ctx.arc(this.x,this.y,this.width,(Math.PI / 180) * 0, (Math.PI / 180) * 180, false);
    }
}




class treeNode{
    x=null
    y=null
    width=null
    height=null
    rote=90
    children=[]
    constructor(x,y,width,height,rote){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rote = rote;
        this.addChildren();
    }
    addChildren(){
        let rrr = 180;
        if(this.children.length == 2){
            return
        }else{
            if(this.width > 3){
                let width = this.width -1;
                let height = this.height - 9;
                //控制开合角度
                let rote = Math.floor(Math.random()*35);
                if(this.children.length == 1){
                    let y = this.y - parseInt(Math.sin(((this.rote-rote)*Math.PI)/rrr)*this.height);
                    let x = this.x - parseInt(Math.cos(((this.rote-rote)*Math.PI)/rrr)*this.height);
                    this.children.push(new treeNode(x,y,width,height,this.rote-rote));
                }else{
                    let y = this.y - parseInt(Math.sin(((this.rote+rote)*Math.PI)/rrr)*this.height);
                    let x = this.x - parseInt(Math.cos(((this.rote+rote)*Math.PI)/rrr)*this.height);
                    this.children.push(new treeNode(x,y,width,height,this.rote+rote));
                }
                this.addChildren();
            }
        }
    }
}
class Tree {
    // 定位
    x=null
    y=null
    type='Tree'
    width=null //宽
    height=null //高
    ctx=null //画笔
    strokeColor='rgb(40,17,17)'
    name=null
    point={}//节点
    fillColor='rgb(255,0,0)'
    domName=null //需要添加的dom id
    selected=null//选中状态
    constructor(domName,data) {
        this.domName = domName;
        this.ctx = document.getElementById(domName).getContext('2d');
        this.x = this.ctx.canvas.width/2;
        this.y = this.ctx.canvas.height;
        this.width = data.width;
        this.height = 90;
        //回显就不用重新生成枝桠数组
        data.point?this.point = data.point:this.createTreeNode();
    }

    createTreeNode(){
        this.point = new treeNode(this.x,this.y - this.height,this.width,this.height,90);
    }

    // createdFourBlock(){
    //     let dom = document.getElementsByClassName('board')[0];
    //     let topDom = document.createElement('div');
    //     topDom.setAttribute('style','height: 10px;width: 10px;background-color: rgba(70, 123, 224,0.5);background-color: rgba(70, 123, 224,0.5);user-select: none;cursor: row-resize;')
    // }

    setBtn(data = {
        top:{
            x:-10,
            y:-10
        },
        right:{
            x:-10,
            y:-10
        },
        bottom:{
            x:-10,
            y:-10
        },
        left:{
            x:-10,
            y:-10
        }
    }) {
        let dom = document.getElementsByClassName('board')[0];
        dom.style.setProperty('--topLine-top',data.top.y+'px')
        dom.style.setProperty('--topLine-left',data.top.x+'px')

        dom.style.setProperty('--rightLine-top',data.right.y+'px')
        dom.style.setProperty('--rightLine-left',data.right.x+'px')

        dom.style.setProperty('--bottomLine-top',data.bottom.y+'px')
        dom.style.setProperty('--bottomLine-left',data.bottom.x+'px')

        dom.style.setProperty('--leftLine-top',data.left.y+'px')
        dom.style.setProperty('--leftLine-left',data.left.x+'px')
    }

    //小块位置
    lineBtnPosition(){
        let data = {
            top:{
                x:-10,
                y:-10
            },
            right:{
                x:-10,
                y:-10
            },
            bottom:{
                x:-10,
                y:-10
            },
            left:{
                x:-10,
                y:-10
            }
        }

        this.setBtn(data)
    }

    //是否选中
    isSelect(e){

        // let data = (this.x - e.offsetX)*(this.x - e.offsetX)+(this.y - e.offsetY)*(this.y - e.offsetY);
        //         // let dd =  parseInt(Math.sqrt(data)) <= this.width;
        //         // return dd;
        return false
    }
    //小方块调整大小
    // blockPosition(moveDomId,positionArr,e){
    //     switch (moveDomId){
    //         // case 'topBlock':
    //         //     this.y += (e.pageY-positionArr.y)/2;
    //         //     this.height -= (e.pageY-positionArr.y);
    //         //     break;
    //         case 'rightBlock':
    //             this.width += (e.pageX-positionArr.x);
    //             break;
    //         // case 'bottomBlock':
    //         //     this.y += (e.pageY-positionArr.y)/2;
    //         //     this.height += (e.pageY-positionArr.y);
    //         //     break;
    //         // case 'leftBlock':
    //         //     this.x += (e.pageX-positionArr.x)/2;
    //         //     this.width -= (e.pageX-positionArr.x);
    //         //     break;
    //     }
    // }
    //循环
    drawFor(obj){
        this.ctx.lineWidth = obj.width;
        this.ctx.stroke();
        if(obj.width <=3 ){
            this.ctx.moveTo(obj.x,obj.y);
            let wid = 0;
            obj.x%2==1?this.ctx.fillStyle = this.fillColor:this.ctx.fillStyle = 'white';
            obj.x%2==1?wid = 5:wid = 4;
            this.ctx.arc(obj.x,obj.y,wid,(Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
            this.ctx.fill();
        };
        if(obj.children.length == 2){
            this.ctx.beginPath();
            this.ctx.moveTo(obj.x,obj.y);
            this.ctx.lineTo(obj.children[0].x,obj.children[0].y);
            this.drawFor(obj.children[0]);

            this.ctx.beginPath();
            this.ctx.moveTo(obj.x,obj.y);
            this.ctx.lineTo(obj.children[1].x,obj.children[1].y);
            this.drawFor(obj.children[1]);
        }else {return}
    }
    //绘制
    draw(){
        this.ctx = document.getElementById(this.domName).getContext('2d');
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.fillStyle = this.fillColor;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x,this.y);
        this.ctx.lineTo(this.point.x,this.point.y);
        this.drawFor(this.point);
    }
    //清理
    clean(){
        this.ctx = document.getElementById(this.domName).getContext('2d');
        this.ctx.clearRect(0,0,this.ctx.width,this.ctx.height);
        this.ctx.fillStyle = 'rgba(255,255,255,1)'
        this.ctx.arc(this.x,this.y,this.width,(Math.PI / 180) * 0, (Math.PI / 180) * 180, false);
    }
}


export {Rectangle,Circle,Tree}
