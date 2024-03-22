class buttonComponent extends HTMLElement{
    constructor(){
        super() //investigar super
        this.attachShadow({mode: "open"})
        this.buttonC=document.createElement("button")//buttonC porque buttonComponent se llama el componente principal
    }
    //estilos
    getTemplate(){
        const template=document.createElement("template")
        template.innerHTML=
        `<style>
        .btn-17{
            background-color:#dc2626;
            color:white;
            padding: .7rem 8.5rem;
            outline:0;
            border-radius: .5rem;
            border:none;
        }

        </style>`
        return template
    }
    render(){
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
    }


    get labelText() {
        return this.getAttribute('label-text');
    }

    set labelText(value) {
        if(value) {
            this.setAttribute('label-text', value);
        }
    }
    
    connectedCallback(){
        let labelButton=this.getAttribute("labelButton")
        let actionButton=this.getAttribute("actionButton")
        let colorButton=this.getAttribute("color")
        this.buttonC.innerText=labelButton
        this.buttonC.setAttribute("onclick", actionButton)
        this.buttonC.setAttribute("class", "btn-17")
        this.shadowRoot.appendChild(this.buttonC)
        this.render()
        
        
    }
}
customElements.define("button-component",buttonComponent)//cambiar el nombre a input