// include <Tab-Studio/TSJSlib/basic.js>
// include <Tab-Studio/TSJSlib/color.js>
// include <Tab-Studio/TSJSlib/process-water.js>

// https://maohupi.github.io/cvsArt/灰/script.js
const body = document.body, 
cvs = $('#cvs'), 
ctx = cvs.getContext('2d');
// cvs.width = 100*vw();
cvs.width = 100;
// cvs.height = 100*vh();
cvs.height = 100;
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, cvs.width, cvs.height);
// function windowCWH(w = 0, h = 0){
//     if(w !== 100*vw() || h !== 100*vh()){
//         w = 100*vw();
//         h = 100*vh();
//         cvs.width = w;
//         cvs.height = h;
//     }
//     setTimeout((ww = w, hh = h) => {
//         windowCWH(ww, hh);
//     }, 30);
// }
// windowCWH();
function rx(x){
    return(Math.floor(x/vw()));
}
function ry(y){
    return(Math.floor(y/vh()));
}
let water = [];
for(let i = 0; i < cvs.width; i++){
    water[i] = 0;
}
let water2 = JSON.parse(JSON.stringify(water));
water = [];
for(let i = 0; i < cvs.height; i++){
    water[i] = water2;
}
let water3 = JSON.parse(JSON.stringify(water));
let MY = 0, 
MX = 0, 
drop = false;
body.addEventListener('mousedown', function(event){
    MY = ry(event.pageY);
    MX = rx(event.pageX);
    drop = true;
});
body.addEventListener('mousemove', function(event){
    MY = ry(event.pageY);
    MX = rx(event.pageX);
});
body.addEventListener('mouseup', function(event){
    MY = ry(event.pageY);
    MX = rx(event.pageX);
    drop = false;
});
function aniLoop(){
    if(drop){
        // water[MY][MX] += 100;
        water[0][MX] += 100;
        console.log(MX, MY);
    }
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    water3 = JSON.parse(JSON.stringify(water));
    // for(let i_h = 0; i_h < cvs.height; i_h++){
    for(let i_h = 0; i_h < 1; i_h++){
        for(let i_w = 0; i_w < cvs.width; i_w++){
            // ctx.fillStyle = `hsl(${water[i_h][i_w]*10}deg 100% 75%)`;
            ctx.fillStyle = `hsl(0deg 0% ${50+water[i_h][i_w]}%)`;
            // ctx.fillRect(i_w, i_h, 1, 1);
            ctx.fillRect(i_w, 50-water3[i_h][i_w], 1, 1);
            let p = processWater(
                water3[i_h][i_w], 
                0.6, 
                (i_h-1 >= 0 ? water3[i_h-1][i_w] : 0), 
                // 0, 
                (i_h+1 < cvs.height ? water3[i_h+1][i_w] : 0), 
                // 0, 
                (i_w-1 >= 0 ? water3[i_h][i_w-1] : 0), 
                // 0, 
                (i_w+1 < cvs.width ? water3[i_h][i_w+1] : 0)
                // 0
            );
            water[i_h][i_w] = p;
        }   
    }
    setTimeout(aniLoop, 30);
}
aniLoop();