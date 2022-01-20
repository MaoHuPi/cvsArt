function processWater(hp = 0, damping = 0.2, ...hcs){
    let hcAll = 0;
    hcs.forEach(hc => {
        hcAll += hc;
        // if(hc != 0){
        //     console.log(hcs+''+(hcAll/(hcs.length/2)));
        //     alert('123');
        // }
    });
    let r = ((hcAll/(hcs.length/2)) - hp)*damping;
    // console.log(r);
    return(r);
}