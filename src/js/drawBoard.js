class Rectangle {
    // 定位
    x=null
    y=null
    width=null
    height=null
    ctx=null
    strokeColor='black'
    fillColor='white'
    constructor(ctx,x=100,y=100,width=100,height=100) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // this.drawRectangle();
    }
    draw(){
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.fillStyle = this.fillColor;
        this.ctx.beginPath();
        this.ctx.rect(this.x-parseInt(this.width/2),this.y-parseInt(this.height/2),this.width,this.height);
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.closePath();
    }
    clean(){
        this.ctx.fillStyle = 'rgba(255,255,255,1)'
        this.ctx.fillRect(this.x-parseInt(this.width/2),this.y-parseInt(this.height/2),this.width,this.height);
    }
}


export {Rectangle}
