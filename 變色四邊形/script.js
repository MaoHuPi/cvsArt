// include <Tab-Studio/TSJSlib/basic.js>
// include <Tab-Studio/TSJSlib/color.js>
// include <Tab-Studio/TSJSlib/magic-shape.js>

// https://maohupi.github.io/cvsArt/變色四邊形/script.js
let width = $_GET['width'] != undefined && $_GET['width'] > 0 ? parseFloat($_GET['width']) : 'auto', 
    height = $_GET['height'] != undefined && $_GET['height'] > 0 ? parseFloat($_GET['height']) : 'auto', 
    many = parseInt($_GET['many'] != undefined ? $_GET['many'] : 2), 
    cdeg = parseFloat($_GET['cdeg'] != undefined ? $_GET['cdeg'] : 0.2), 
    fps = parseFloat($_GET['fps'] != undefined ? $_GET['fps'] : 30);
let gco = $_GET['gco'];
if(gco != undefined){
    var gcos = [
        'source-over', 
        'source-in', 
        'source-out', 
        'source-atop', 
        'destination-over', 
        'destination-in', 
        'destination-out', 
        'destination-atop', 
        'lighter', 
        'copy', 
        'xor', 
        'multiply', 
        'screen', 
        'overlay', 
        'darken', 
        'lighten', 
        'color-dodge', 
        'color-burn', 
        'hard-light', 
        'soft-light', 
        'difference', 
        'exclusion', 
        'hue', 
        'saturation', 
        'color', 
        'luminosity'
    ];
    if(gcos.indexOf(gco) > -1){
        gco = $_GET['gco'];
    }
    else if(gco == 'random'){
        gco = gcos[random(0, gcos.length)];
    }
    else{
        gco = undefined;
    }
}
console.log(
    `
width (畫布寬度)  : ${width}
height(畫布高度)  : ${height}
many  (個數)      : ${many}
fps   (動畫貞數)  : ${fps}
cdeg  (顏色變化量): ${cdeg}
gco   (合成效果)  : ${gco}
    `
);
const cvs = $('#cvs'), 
ctx = cvs.getContext('2d'), 
// msc = [color.brite.red, color.brite.green], 
msc = new Array(many).fill(0).map((z, n) => random(0, 360)), 
// msc = [color.brite.white, color.brite.gray], 
ms = [];
cvs.width = width == 'auto' ? 100*vw() : width;
cvs.height = height == 'auto' ? 100*vh() : height;
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, cvs.width, cvs.height);
function windowCWH(w = 0, h = 0){
    if(w !== 100*vw() || h !== 100*vh()){
        w = 100*vw();
        h = 100*vh();
        if(width == 'auto'){
            cvs.width = w;
        }
        if(height == 'auto'){
            cvs.height = h;
        }
    }
    setTimeout((ww = w, hh = h) => {
        windowCWH(ww, hh);
    }, 30);
}
windowCWH();
msc.forEach(cDeg => {
    let nms = new magicShape({'c':`hsl(${cDeg}deg 100% 75%)`, 's':0.5*(width == 'auto' ? 100*vw() : width)/(100*vw()), 'f':false});
    nms.cDeg = cDeg;
    ms.push(nms);
});
function aniLoop(){
    ctx.fillStyle = '#00000034';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    if(gco){
        ctx.globalCompositeOperation = gco;
    }
    ms.forEach(msi => {
        let cDeg = msi.cDeg;
        if(cDeg < 360){
            cDeg += cdeg;
        }
        else{
            cDeg = 0;
        }
        msi.cDeg = cDeg;
        msi.c = `hsl(${cDeg}deg 100% 75%)`;
        msi.update();
    });
    setTimeout(aniLoop, 1000/fps);
}
aniLoop();
