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
    .d1{
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
    let typeTitle= this.getAttribute("typeTitle")
    let classComponent= this.getAttribute("class")
    //en caso de importar que este mal el tipo de input
    this.divTitle.innerHTML= `<h${typeTitle}
    class=${classComponent}
    ><slot></slot></h${typeTitle}>`
        this.render()
    }
}

customElements.define("title-component",titleComponent)