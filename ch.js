
b = 'white'
r = 'gold'
t = 'teal'
carre1 = document.querySelector('.car .carre')
c1 = carre1.style
c1.backgroundColor = b
carre1.onclick = function (){
    if (c1.backgroundColor == b || c1.backgroundColor == t){
        c1.backgroundColor = r
        // console.log(c1.backgroundColor)
    }
    else{
        c1.backgroundColor = t
    }
    return c1.backgroundColor
}
carre1.ondblclick = function(){
    if (c1.backgroundColor == b){
         c1.backgroundColor =b
        // console.log(c1.backgroundColor)
    }
     else{
        c1.backgroundColor = b
        // console.log(c1.backgroundColor)
    }
}
carre2 = document.querySelector('.car .carre1')
c2 = carre2.style
c2.backgroundColor = b
carre2.onclick = function (){
    if (c2.backgroundColor == b  || c2.backgroundColor == t){
        c2.backgroundColor= r
    }
    else{
        c2.backgroundColor = t
    }
}
carre2.ondblclick = function(){
    if (c2.backgroundColor == b){
        c2.backgroundColor = b
        // console.log(c2.backgroundColor)
    }
    else{
        c2.backgroundColor = b
        // console.log(c2.backgroundColor)
    }
}
carre3 = document.querySelector('.car .carre2')
c3 = carre3.style
c3.backgroundColor = b
carre3.onclick = function (){
    if (c3.backgroundColor == b  || c3.backgroundColor == t){
        c3.backgroundColor = r
        // console.log(c3.backgroundColor)
    }
    else{
        c3.backgroundColor = t
        // console.log(c3.backgroundColor)
    }
}
carre3.ondblclick = function(){
    if (c3.backgroundColor == b){
        c3.backgroundColor = b
        // console.log(c3.backgroundColor)
    }
    else{
            c3.backgroundColor = b
            // console.log(c3.backgroundColor)
        }
}
carre4 = document.querySelector('.car1 .carre')
c4 = carre4.style
c4.backgroundColor = b
carre4.onclick = function (){
    if (c4.backgroundColor == b  || c4.backgroundColor == t){
        c4.backgroundColor = r
        // console.log(c4.backgroundColor)
    }
    else{
        c4.backgroundColor = t
        // console.log(c4.backgroundColor)
    }
}
carre4.ondblclick = function(){
    if (c4.backgroundColor == b){
        c4.backgroundColor = b
        // console.log(c4.backgroundColor)
    }
    else{
        c4.backgroundColor = b
        // console.log(c4.backgroundColor)
    }
}
carre5 = document.querySelector('.car1 .carre1')
c5 = carre5.style
c5.backgroundColor = b
carre5.onclick = function (){
    if (c5.backgroundColor == b  || c5.backgroundColor == t){
        c5.backgroundColor = r
         // console.log(c5.backgroundColor)
    }
    else{
        c5.backgroundColor = t
        // console.log(c5.backgroundColor)
    }
}
carre5.ondblclick = function(){
    if (c5.backgroundColor == b){
        c5.backgroundColor = b
         // console.log(c5.backgroundColor)
    }
    else{
        c5.backgroundColor = b
        // console.log(c5.backgroundColor)
    }
}
carre6 = document.querySelector('.car1 .carre2')
c6 = carre6.style
c6.backgroundColor = b
carre6.onclick = function (){
    if (c6.backgroundColor == b  || c6.backgroundColor == t){
        c6.backgroundColor = r
         // console.log(c6.backgroundColor)
    }
    else{
        c6.backgroundColor = t
         // console.log(c6.backgroundColor)
    }
}
carre6.ondblclick = function(){
    if (c6.backgroundColor == b){
        c6.backgroundColor = b
        // console.log(c6.backgroundColor)
    }
    else{
        c6.backgroundColor = b
        // console.log(c6.backgroundColor)
    }
}
carre7 = document.querySelector('.car2 .carre')
c7 = carre7.style
c7.backgroundColor = b
carre7.onclick = function (){
    if (c7.backgroundColor == b || c7.backgroundColor == t){
        c7.backgroundColor = r
        // console.log(c7.backgroundColor)
    }
    else{
        c7.backgroundColor = t
         // console.log(c7.backgroundColor)
    }
}
carre7.ondblclick = function(){
    if (c7.backgroundColor == b){
        c7.backgroundColor = t
        // console.log(c7.backgroundColor)
    }
    else{
        c7.backgroundColor = b
        // console.log(c7.backgroundColor)
    }
}
carre8 = document.querySelector('.car2 .carre1')
c8 = carre8.style
c8.backgroundColor = b
carre8.onclick = function (){
    if (c8.backgroundColor == b || c8.backgroundColor == t){
        c8.backgroundColor = r
        // console.log(c8.backgroundColor)
    }
    else{
        c8.backgroundColor = t
            // console.log(c8.backgroundColor)
    }
}
carre8.ondblclick = function(){
    if (c8.backgroundColor == b){
        c8.backgroundColor = b
        // console.log(c8.backgroundColor)
    }
    else{
        c8.backgroundColor = b
        // console.log(c8.backgroundColor)
    }
}
carre9 = document.querySelector('.car2 .carre2')
c9 = carre9.style
c9.backgroundColor = b
carre9.onclick = function (){
    if (c9.backgroundColor == b || c9.backgroundColor == t){
        c9.backgroundColor = r
         // console.log(c9.backgroundColor)
    }
    else{
        c9.backgroundColor = t
        // console.log(c9.backgroundColor)
    }
}
carre9.ondblclick = function(){
    if (c9.backgroundColor == b){
        c9.backgroundColor = b
        // console.log(c9.backgroundColor)
    }
    else{
        c9.backgroundColor = b
    }
}

x = 0
window.addEventListener('click',function(){
    posi_1_c1 = [c1.backgroundColor,c2.backgroundColor,c3.backgroundColor]
    if (posi_1_c1[0] == r && posi_1_c1[1] == r && posi_1_c1[2] == r){
        x ++
    }
    posi_1_c1 = [c1.backgroundColor,c5.backgroundColor,c9.backgroundColor]
    if (posi_1_c1[0] == r && posi_1_c1[1] == r && posi_1_c1[2] == r){
        x ++
    }
    posi_1_c1 = [c1.backgroundColor,c4.backgroundColor,c7.backgroundColor]
    if (posi_1_c1[0] == r && posi_1_c1[1] == r && posi_1_c1[2] == r){
        x ++
    }
    posi_1_c2 = [c2.backgroundColor,c5.backgroundColor,c8.backgroundColor]
    if (posi_1_c2[0] == r && posi_1_c2[1] == r && posi_1_c2[2] == r){
        x ++
    }
    posi_1_c3 = [c3.backgroundColor,c6.backgroundColor,c9.backgroundColor]
    if (posi_1_c3[0] == r && posi_1_c3[1] == r && posi_1_c3[2] == r){
        x ++
    }
    posi_1_c3 = [c3.backgroundColor,c5.backgroundColor,c7.backgroundColor]
    if (posi_1_c3[0] == r && posi_1_c3[1] == r && posi_1_c3[2] == r){
        x ++
    }
    posi_1_c4 = [c4.backgroundColor,c5.backgroundColor,c6.backgroundColor]
    if (posi_1_c4[0] == r && posi_1_c4[1] == r && posi_1_c4[2] == r){
        x ++
    }
    posi_1_c7 = [c7.backgroundColor,c8.backgroundColor,c9.backgroundColor]
    if (posi_1_c7[0] == r && posi_1_c7[1] == r && posi_1_c7[2] == r){
        x ++
    }
    // console.log(x)
    posi_1_c1 = [c1.backgroundColor,c2.backgroundColor,c3.backgroundColor]
    if (posi_1_c1[0] == t && posi_1_c1[1] == t && posi_1_c1[2] == t){
        x ++
    }
    posi_1_c1 = [c1.backgroundColor,c5.backgroundColor,c9.backgroundColor]
    if (posi_1_c1[0] == t && posi_1_c1[1] == t && posi_1_c1[2] == t){
        x ++
    }
    posi_1_c1 = [c1.backgroundColor,c4.backgroundColor,c7.backgroundColor]
    if (posi_1_c1[0] == t && posi_1_c1[1] == t && posi_1_c1[2] == t){
        x ++
    }
    posi_1_c2 = [c2.backgroundColor,c5.backgroundColor,c8.backgroundColor]
    if (posi_1_c2[0] == t && posi_1_c2[1] == t && posi_1_c2[2] == t){
        x ++
    }
    posi_1_c3 = [c3.backgroundColor,c6.backgroundColor,c9.backgroundColor]
    if (posi_1_c3[0] == t && posi_1_c3[1] == t && posi_1_c3[2] == t){
        x ++
    }
    posi_1_c3 = [c3.backgroundColor,c5.backgroundColor,c7.backgroundColor]
    if (posi_1_c3[0] == t && posi_1_c3[1] == t && posi_1_c3[2] == t){
        x ++
    }
    posi_1_c4 = [c4.backgroundColor,c5.backgroundColor,c6.backgroundColor]
    if (posi_1_c4[0] == t && posi_1_c4[1] == t && posi_1_c4[2] == t){
        x ++
    }
    posi_1_c7 = [c7.backgroundColor,c8.backgroundColor,c9.backgroundColor]
    if (posi_1_c7[0] == t && posi_1_c7[1] == t && posi_1_c7[2] == t){
        x ++
    }
    // console.log(x)
    if(x == 1){
        div = document.querySelector('.div')
        div.style.display = 'none'
        espa = document.querySelector('.espace')
        espa.style.display = 'none'
        div = document.querySelector('.win')
        div.style.display = 'block'
        h = document.querySelector('.h')
        h.innerHTML = 'victoire!'


    }

    if (x != 0){
        x = 0
    }
})