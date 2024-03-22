class inputComponent extends HTMLElement{ //cambiar el nombre del titulo inputComponent
    //constructor
    constructor(){
        super() //investigar super
        this.attachShadow({mode: "open"})
        this.inputC=document.createElement("input")
        this.labelC=document.createElement("label")
    }

    //estilos
    getTemplate(){
        const template=document.createElement("template")
        template.innerHTML=
        `<style>
        
        label{
            text-align:center;
            align-items:center;
            font-size: 1rem;
            line-height: 1.25rem;
            color: rgb(255 255 255);
            padding-bottom: 10%;
            
        }
        
        input{
            margin: 0;
            display:block;
            border: 2px solid transparent;
            width: 19rem;
            height: 3.5vh;
            padding-left: 0.8em;
            outline: none;
            overflow: hidden;
            background-color: #F3F3F3;
            border-radius: 10px;
            transition: all 0.5s;
        }
        </style>`
        return template
    }

    static get observedAttributes(){
        return ["estado"]
        
    }
    cambiartexto(newValue){
        this.message=document.createElement("h1")
        this.shadowRoot.appendChild(this.message)
        
        if(newValue===1){
            this.labelC.textContent="Todo bien"
        }else{
            
            this.labelC.textContent="Tienes un error al ingresar datos en usuario"
        }
        
        
    }

    attributeChangedCallback(name, oldValues,newValue){
        console("lee estos")
        //this.cambiartexto(newValue)
        
    }


    render(){
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
    }
    connectedCallback(){
//getters     
        let labelP= this.getAttribute("data-label")
        let placeholder=this.getAttribute("placeholder")
        let type = this.getAttribute("type")
        let value = this.getAttribute("value")
        let diseno= this.getAttribute("diseno")
        let id= this.getAttribute("id")
//setters
        this.inputC.setAttribute("id",id)
        this.inputC.setAttribute("placeholder", placeholder)
        this.inputC.setAttribute("type",type)
        this.inputC.setAttribute("value", value)
        this.inputC.setAttribute("class",diseno)
        
        this.labelC.textContent=labelP

        this.shadowRoot.appendChild(this.labelC)
        this.shadowRoot.appendChild(this.inputC)
        this.render()
    }
}

customElements.define("input-component",inputComponent)//cambiar el nombre a input
//input-component


