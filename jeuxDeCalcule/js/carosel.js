
/**
 * Carosel permet faire des image ou autre automatique
 * avec la bonne structure HTML
 * @param {HTMLElement} element 
 * l'element html qui englobe toute autre element enfant a faire défiler
 * @param {object} option 
 * object contenant les différentes options pour modifier le comportement du Carosel
 */
export class Carosel{
    
    compter = 0
    
    constructor(element,option){

        this.element = element
        this.first = element.firstElementChild.cloneNode(true)
        this.element.appendChild(this.first)
        this.child = Array.from(element.children)
        
        // option par defaut
        this.option = Object.assign({},{
            visible:1
            ,defile:1,
            margin:0,
            active:false
        },option)
        
        try {
            
            // les bouton gautche et droite
            this.option.gauche.onclick= ()=> this.nextL()
            this.option.droit.onclick= ()=> this.nextR()
        } catch (error) {}

       
        // la taille d'un element
        this.visible()
        this.w=this.child[this.compter].getBoundingClientRect()
        this.w = this.w.width + this.option.margin
        if (option.auto){
            const t = setInterval(() => {
                this.nextR()
            }, 3000);
        }

        // actif 
        if (option.active){
            this.active()
        }
    }

    visible(){
        if (this.option.visible == 2){

            this.child.forEach(el =>{
                el.style.flex = '1 0 45%'
            })
        }
    }

    nextR(t=1){

        this.compter += this.option.defile 
        const cal = (-this.compter*this.w) 
        this.element.style.transform = 'translateX('+(cal)+'px)'
        this.element.style.transition = t+'s linear'
        
        setTimeout(() => {
            if (this.compter >= this.child.length -1){
                this.compter = 0
                this.element.style.transition = 'uniset'
                this.element.style.transform = 'translateX(0)'
            }
            if (this.option.active){
                this.active()
            }
        }, 1000);

    }

    nextL(t=1){
        this.compter-= this.option.defile
        
        if (this.compter <0){
            this.compter = this.child.length -2
            this.element.style.transition = 'uniset'
            const cal = -this.compter * this.w 
            this.element.style.transform = 'translateX('+(cal)+'px)'
            if (this.option.active){
                this.active()
            }
            return
        }
        this.element.style.transition = t+'s linear'
        const cal = -this.compter * this.w
        this.element.style.transform = 'translateX('+(cal)+'px)'
        if (this.option.active){
            this.active()
        }
        
    }
   active(){
    this.child.forEach(els =>{
        els.style.opacity = '0.5'
    })
    this.child[this.compter].style.opacity = '1'
   }
   /**
    * 
    * @returns {HTMLElement}
    */
   currentTarget(){
    return this.child[this.compter]
   }
   
}

