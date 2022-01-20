// include <Tab-Studio/TSJSlib/basic.js>
// include <Tab-Studio/TSJSlib/color.js>
// include <Tab-Studio/TSJSlib/magic-shape.js>

// https://maohupi.github.io/cvsArt/四邊形/script.js
const cvs = $('#cvs'), 
ctx = cvs.getContext('2d'), 
// msc = [color.brite.red, color.brite.green], 
msc = [color.brite.random(), color.brite.random()], 
// msc = [color.brite.white, color.brite.gray], 
ms = [];
while(msc[0] == msc[1]){
    msc[1] = color.brite.random();
}
cvs.width = 100*vw();
cvs.height = 100*vh();
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, cvs.width, cvs.height);
function windowCWH(w = 0, h = 0){
    if(w !== 100*vw() || h !== 100*vh()){
        w = 100*vw();
        h = 100*vh();
        cvs.width = w;
        cvs.height = h;
    }
    setTimeout((ww = w, hh = h) => {
        windowCWH(ww, hh);
    }, 30);
}
windowCWH();
msc.forEach(c => ms.push(new magicShape({'c':c, 's':0.5, 'f':false})));
function aniLoop(){
    ctx.fillStyle = '#00000034';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    setTimeout(aniLoop, 30);
    ms.forEach(msi => {
        // let c = msi.c.replace('#', '');
        // let cp = 0;
        // msi.c = '#' + (parseInt(c[0] + c[1], 16)+cp).toString(16) + (parseInt(c[2] + c[3], 16)+cp).toString(16) + (parseInt(c[4] + c[5], 16)+cp).toString(16);
        msi.update();
    });
}
aniLoop();