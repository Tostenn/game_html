// effet visuel

//---------mis en place du menu----------
import {Carosel} from './carosel.js';

const main = document.querySelector('main')
const op = {
    visible:1,
    defile:1,
    auto:false
}
let menuNav = new Carosel(main,op)
// console.log(menuNav.currentTarget())
menuNav.nextR(0)
menuNav.nextR(0)

const sectionOver = main.querySelector('section.over')
const sectionQuiz = main.querySelector('section.quiz')
const sectionMenu = main.querySelector('section.menu')
const sectionOptoin = main.querySelector('section.option')

//-------activation des bouton----------
//1- bouton commencer
const butM = sectionMenu.querySelectorAll('.but button')

/**
 * 
 * @param {Event} e 
 */
function revoEvetn(e) {
    if (e.currentTarget.innerHTML == 'option') menuNav.nextR()
    else menuNav.nextL()
    butM[0].removeEventListener('click',revoEvetn)
    setTimeout(() => {
        
        butM[0].addEventListener('click',revoEvetn)
    }, 3000);
}
butM[0].addEventListener('click',revoEvetn)

//2-bouton option
butM[1].addEventListener('click',revoEvetn)



/**
 * 
 * @param {HTMLFormElement} el 
 * @returns {boolean}
 */
function cote(el) {
    try {
        return el.previousElementSibling.dataset.is == el.dataset.g && el.nextElementSibling.dataset.is == el.dataset.l
    } catch (error) {return false}
}

// gestion dynamique des fenetre
window.onclick = ()=>{
    let element = document.querySelectorAll('main > section')
    const current = menuNav.currentTarget()
    console.log(current.dataset.is)
    if(!cote(current)){
        
        let g = current.dataset.g
        let l = current.dataset.l
        console.log(g,l)
        for (const el of element) {
            if (g == el.dataset.is){
                g = el.cloneNode(true)
                el.remove()
                current.insertAdjacentElement("beforebegin",g)
                
            }
            
            else if (l==el.dataset.is) {
                l = el.cloneNode(true)
                el.remove()
                current.insertAdjacentElement('afterend',l)
            }
            
        }
        if (current.dataset.is == 'option'){
            menuNav.nextL(0)
        }
        else menuNav.nextR(0)
        element = Array.from(document.querySelectorAll('main > section'))
        menuNav = new Carosel(document.querySelector('main'),op)
        menuNav.compter = element.indexOf(current)

        // console.log(g,l)
    }
}

// ------------effet sur le input------------------
const saisirInput = sectionQuiz.querySelector('section.saisir form input')

function annimeInput() {
    
    let div = saisirInput.nextElementSibling
    div = div.style
    div.width = '0'
    div.backgroundColor = 'green'
    div.marginLeft = '50%'
    
    setTimeout(() => {
        div.backgroundColor = 'white'
        div.width = '100%'
        div.marginLeft = '0'
        
    }, 1100);
}

saisirInput.onfocus = ()=>annimeInput()
saisirInput.onmouseover = ()=>annimeInput()
