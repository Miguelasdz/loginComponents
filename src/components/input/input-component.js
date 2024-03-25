class inputComponent extends HTMLElement{ //cambiar el nombre del titulo inputComponent
    //constructor
    constructor(){
        super() //investigar super
        this.attachShadow({mode: "open"})
        this.div
        this.inputC=document.createElement("input")//no se puede llamar inputComponent por que mi clase se llama input component
        this.labelC=document.createElement("label")
        this.message=document.createElement("p")
    }

    //estilos
    getTemplate(){
        const template=document.createElement("template")
        template.innerHTML=
        `<style>
      
        .message{
            grid-area: message;
            color:#cb1919;
        }
        .labelComponent{
            grid-area: labelComponent;
            text-align:center;
            align-items:center;
            font-size: 1rem;
            line-height: 1.25rem;
            color: rgb(255 255 255);
            padding-bottom: 10%;
        }
        .inputComponent{
            grid-area: input;
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
        return ["state"]
    }


    validate (type, value) {
        const typeComponent = {
           text:{
            "regex":/^[a-zA-Z0-9\_\-]{4,16}$/,
            error: "Error en el usuario"
           },
           password:{
            "regex":/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
            error: "Error en la contraseña"
           },
            number:{
                "regex":/^.{4,12}$/, // 4 a 12 digitos.
                error: "Error en el dato numerico"
            }, 
            date: /d{4}-\d{2}-\d{2}/, //fecha con formato aaaa-mm-dd cambiar el formato como dia mes año
            range: /^.{1,3}$/, //acepta valores de 1 digito hasta 3
            email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //formato de email con @ y .
            tel: /^\d{7,14}$/, // 7 a 14 numeros.
            default:/.*/
        }
        if(!typeComponent[type].regex.test(value)){
            this.message.textContent=typeComponent[type].error
            this.message.removeAttribute("hidden",false)
        }
        else{
            this.message.setAttribute("hidden",false)
        }
    }

    attributeChangedCallback(name, oldValue,newValue){
        let values = JSON.parse(newValue);
        this.validate(values.type,values.value)
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
        let messageI=this.getAttribute("message")
//setters
        this.inputC.setAttribute("id",id)
        this.inputC.setAttribute("placeholder", placeholder)
        this.inputC.setAttribute("type",type)
        this.inputC.setAttribute("value", value)
        this.inputC.setAttribute("class", "inputComponent")
        this.labelC.setAttribute("class", "labelComponent")
        this.message.setAttribute("class", "message")
//asigna el texto al label del input        
        this.labelC.textContent=dataLabel
        this.message.setAttribute("hidden", true)
//se crean los elementos hijos para visualizarce en la pantalla
        this.shadowRoot.appendChild(this.labelC)
        this.shadowRoot.appendChild(this.inputC)
        this.shadowRoot.appendChild(this.message)
        //this.message.removeAttribute("hidden",false)
        this.render()
    }
}

customElements.define("input-component",inputComponent)
//input-component


