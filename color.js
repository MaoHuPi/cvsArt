// include <Tab-Studio/TSJSlib/basic.js>

// https://tab-studio.github.io/TSJSlib/color.js
class color{
    constructor(){
        this.brite = {
            'red':'#da7c77', 
            'orange':'#dab277', 
            'yellow':'#d8da77', 
            'green':'#77da83', 
            'blue':'#77ccda', 
            'indigo':'#8f77da', 
            'purple':'#cb77da', 
            'white':'#eeeeee', 
            'gray':'#aaaaaa', 
            'black':'#666666', 
            random:function(){
                let colors = new color;
                let reC = random(0, Object.keys(colors.brite).length-2);
                let i = 0
                for(let c in colors.brite){
                    if(i == reC){
                        reC = colors.brite[c];
                        break;
                    }
                    i++;
                }
                return(reC);
            }
        }
        this.white = '#ffffff'
    }
}
color = new color;