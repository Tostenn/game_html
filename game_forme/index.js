
// changer l'image
const fileinput = document.querySelector('input[type=file]')

const image = document.querySelector('main .h img')

fileinput.addEventListener('change',(e)=>{
    image.src = URL.createObjectURL(e.target.files[0])
})

// commande 
const cmd = document.querySelector('.cmd')
const label = Array.from(cmd.querySelectorAll('label') )

label.forEach(el =>{
    el.onclick = ()=>{
        if (!el.nextElementSibling.checked){
            el.setAttribute('class','active')
        }
        else{
            el.setAttribute('class','')    
        }
        image.classList.toggle(el.getAttribute('for'))
    }
})
cmd.nextElementSibling.onclick= ()=>{
    image.setAttribute('class','')
    label.forEach(el =>{
        if (el.nextElementSibling.checked) image.classList.toggle(el.getAttribute('for'))
    })

}