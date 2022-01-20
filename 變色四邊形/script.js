// include <Tab-Studio/TSJSlib/basic.js>
// include <Tab-Studio/TSJSlib/color.js>
// include <Tab-Studio/TSJSlib/magic-shape.js>

// https://maohupi.github.io/cvsArt/變色四邊形/script.js
const cvs = $('#cvs'), 
ctx = cvs.getContext('2d'), 
// msc = [color.brite.red, color.brite.green], 
msc = [random(0, 360), random(0, 360)], 
// msc = [color.brite.white, color.brite.gray], 
ms = [];
while(Math.abs(msc[0] - msc[1]) < 10){
    msc[1] = random(0, 360);
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
msc.forEach(cDeg => {
    let nms = new magicShape({'c':`hsl(${cDeg}deg 100% 75%)`, 's':0.5, 'f':false});
    nms.cDeg = cDeg;
    ms.push(nms);
});
function aniLoop(){
    ctx.fillStyle = '#00000034';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    setTimeout(aniLoop, 30);
    ms.forEach(msi => {
        let cDeg = msi.cDeg;
        if(cDeg < 360){
            cDeg += 0.2;
        }
        else{
            cDeg = 0;
        }
        msi.cDeg = cDeg;
        msi.c = `hsl(${cDeg}deg 100% 75%)`;
        msi.update();
    });
}
aniLoop();