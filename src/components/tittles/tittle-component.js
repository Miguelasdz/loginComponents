class titleComponent extends HTMLElement{
    constructor(){
        super()
        let shadowDoom=this.attachShadow({mode: "open"})
        this.divTitle=document.createElement("div")
        shadowDoom.appendChild(this.divTitle)
    }

    getTemplate(){
        const template=document.createElement("template")
        template.innerHTML=
        `<style>
        
        h1{
            color:white;
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
    render(){
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
    }

    connectedCallback(){
    //getters     
        let dataLabel= this.getAttribute("dataLabel")
        let typeTitle= this.getAttribute("typeTitle")
        this.divTitle.innerHTML=  this.getAttribute("data-label") 
        //en caso de importar que este mal el tipo de input
        this.divTitle.innerHTML= `<h${typeTitle}
        class="d1"
        >${dataLabel}</h${typeTitle}>`
            
            this.render()
        }
        

}

customElements.define("title-component",titleComponent)