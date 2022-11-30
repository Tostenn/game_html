
car = document.querySelectorAll('#verifi')
// console.log(car)


div = document.querySelector('.div')
div.onclick = function (){
    if (t == 'teal' || r == 'gold'){
        t = "gold"
        r = 'teal'
    }
    else{
        r = 'gold'
        t = 'teal'
    }
    nt = 0
    ng = 0
    h = document.querySelector('.h')
    for (i = 0;i <car.length;i++){
        color = car[i].style.backgroundColor
        if (color == 'teal'){
            nt++
            if (nt ==4){
                h.innerHTML = 'attention teal'
            }
        }
        else if (color == 'gold'){
            ng++
            if (ng ==4){
                h.innerHTML = 'attention gold'
            }
        } 
        else if (nt != 4 || ng != 4){
            h.innerHTML = 'carreau chinois'
        }
    }
    console.log(nt,ng)
    // console.log(gk,tk)
}