class inputComponent extends HTMLElement{ //cambiar el nombre del titulo inputComponent
    //constructor
    constructor(){
        super() //investigar super
        this.attachShadow({mode: "open"})
        this.inputC=document.createElement("input")//no se puede llamar inputComponent por que mi clase se llama input component
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

    attributeChangedCallback(name, oldValues,newValue){
    //va la validacion nueva
    }


    render(){
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
    }
    connectedCallback(){
//getters     
        let dataLabel= this.getAttribute("data-label")
        let placeholder=this.getAttribute("placeholder")
        let type = this.getAttribute("type")
        let value = this.getAttribute("value")
        let id= this.getAttribute("id")
//setters
        this.inputC.setAttribute("id",id)
        this.inputC.setAttribute("placeholder", placeholder)
        this.inputC.setAttribute("type",type)
        this.inputC.setAttribute("value", value)
//asigna el texto al label del input        
        this.labelC.textContent=dataLabel
//se crean los elementos hijos para visualizarce en la pantalla
        this.shadowRoot.appendChild(this.labelC)
        this.shadowRoot.appendChild(this.inputC)
        this.render()
    }
}

customElements.define("input-component",inputComponent)
//input-component


