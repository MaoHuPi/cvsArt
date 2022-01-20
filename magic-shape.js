// include <Tab-Studio/TSJSlib/basic.js>

// https://tab-studio.github.io/TSJSlib/magic-shape.js
class magicDot{
    constructor(settings = {}){
        this.x = settings['x'] !== undefined ? settings['x'] : 0;
        this.y = settings['y'] !== undefined ? settings['y'] : 0;
        this.xp = settings['xp'] !== undefined ? settings['xp'] : 0;
        this.yp = settings['yp'] !== undefined ? settings['yp'] : 0;
    }
    update(){
        this.x += this.xp;
        this.y += this.yp;
        if(this.x > 100 || this.x < 0){
            this.xp *= -1;
            this.x = this.x > 100 ? 100 : 0;
        }
        if(this.y > 100 || this.y < 0){
            this.yp *= -1;
            this.y = this.y > 100 ? 100 : 0;
        }
    }
}
class magicShape{
    constructor(settings = {}){
        this.c = settings['c'] !== undefined ? settings['c'] : '#ffffff';
        this.s = settings['s'] !== undefined ? settings['s'] : 0.5;
        this.d = settings['d'] !== undefined ? settings['d'] : 4;
        this.f = settings['f'] !== undefined ? settings['f'] : false;
        this.ds = [];
        for(let i = 0; i < this.d; i++){
            this.ds.push(new magicDot({
                'x':random(0, 100), 
                'y':random(0, 100), 
                'xp':random(0, 1) == 0 ? -this.s : this.s, 
                'yp':random(0, 1) == 0 ? -this.s : this.s
            }));
        }
    }
    update(){
        this.ds.forEach(d => d.update());
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(this.ds[0].x*vw(), this.ds[0].y*vh());
        for(let i = 1; i < this.ds.length; i++){
            ctx.lineTo(this.ds[i].x*vw(), this.ds[i].y*vh());
        }
        ctx.closePath();
        ctx.lineWidth = 1*vw();
        if(this.f){
            ctx.fillStyle = this.c+'22';
            ctx.fill();
        }
        ctx.strokeStyle = this.c;
        ctx.stroke();
    }
}