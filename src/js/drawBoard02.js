class Rectangle {
    // 定位
    x=null
    y=null
    width=null //宽
    height=null //高
    ctx=null //画笔
    strokeColor='black'
    name=null
    fillColor='rgba(255,255,255,0)'
    domName=null //需要添加的dom id
    selected=null//选中状态
    constructor(domName,x=100,y=100,width=100,height=100) {
        this.domName = domName;
        this.ctx = document.getElementById(domName).getContext('2d');
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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

    draw(){
        this.ctx = document.getElementById(this.domName).getContext('2d');
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.fillStyle = this.fillColor;
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


export {Rectangle}
