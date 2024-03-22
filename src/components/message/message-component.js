class messageComponent extends HTMLElement{
    //constructor
    constructor(){
        super()
        this.attachShadow({mode: "open"})
        this.h1=document.createElement("h1")//cambiar el nombre de la variable elementH1
    }

    getTemplate(){
        const template=document.createElement("template")
        template.innerHTML=
        
        `<style>
        h1{
            text-align:center;
            align-items:center;
            font-size: 1rem;
            line-height: 1.25rem;
            color: rgb(255 255 255);
        }
        </style>`
        return template
    }

    static get observedAttributes(){
        return ["estado", "mensaje"] 
        //[estado,mensaje] [bien, todo bien] crear un objeto con los dos atributos
    }

    cambiartexto(mensaje){
        this.message=document.createElement("h1")
        this.shadowRoot.appendChild(this.message)
        console.log(pasa)
        this.h1.innerHTML=mensaje
    }
   
    attributeChangedCallback(name, oldValues,newValue){

        if(name==="estado"){
            if(newValue==="bien"){
                this.h1.setAttribute("hidden",true)
            }else{
                this.h1.removeAttribute("hidden",false)
            }     
        }
        else if(name==="mensaje"){
            this.h1.innerHTML=newValue
        }    
    }

    render(){
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
    }
    connectedCallback(){
    this.render()
    this.h1.textContent=""
    this.shadowRoot.appendChild(this.h1)
    this.h1.setAttribute("hidden",true)
    }
}
customElements.define("message-component",messageComponent) //message-componet
