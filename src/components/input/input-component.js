class inputComponent extends HTMLElement{ //cambiar el nombre del titulo inputComponent
  //constructor
  constructor(){
    super() //investigar super
    this.attachShadow({mode: "open"})
    this.divContent=document.createElement("div")
    this.divHeader=document.createElement("div")
    this.inputC=document.createElement("input")//no se puede llamar inputComponent por que mi clase se llama input component
    this.labelC=document.createElement("label")
    this.message=document.createElement("p")
    this.buttonC=document.createElement("button")
  }
  //estilos
  getTemplate(){
    const template=document.createElement("template")
    template.innerHTML=
    `<style>
    .divHeader{            
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
    }
    .labelComponent{
      font-size: 1.1rem;
      line-height: 1.25rem;
      color: rgb(255 255 255);
      padding-bottom: 10%;
    }
    .message{
      color:#cb1919;
      font-size: 1rem;
      line-height: 1.25rem;
      padding-bottom: 10%;
    }
    .content{
      display:grid;
      margin: 0;
      display: grid;
      grid-template-columns: 3fr 1fr;
      grid-template-areas: 
      "input icon"
    ; 
    }
    .inputComponent{
      grid-area: input;
      font-family: inherit;
      font-size: inherit;
      background-color: #f4f2f2;
      border: none;
      color: #646464;
      padding: 0.7rem 1rem;
      border-radius: 30px;
      width: 12em;
      transition: all ease-in-out .5s;
      margin-right: -2rem;
          
    }
    .inputComponent:hover, .inputComponent:focus {
      box-shadow: 0 0 1em #00000013;
    }
      
    .inputComponent:focus {
      outline: none;
      background-color: #f0eeee;
    }
    .buttonComponent {
      background: none; /* Fondo transparente del botón */
      border: none; /* Eliminar borde del botón */
      cursor: pointer; /* Cambiar cursor al pasar sobre el botón */
    }
    
    .buttonIcon{
      margin-right: 1.7em;
      margin-top: .3em;
      grid-area: icon;
      background: none;
      height: 1.3em;
      width: 1.3em;            
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
    this.buttonC.setAttribute("class", "buttonComponent")
    this.divContent.setAttribute("class","content")
    this.divHeader.setAttribute("class","divHeader")    
//asigna el texto al label del input        
    this.labelC.textContent=dataLabel
//Vuelve los elementos ocultos
    this.message.setAttribute("hidden", true)
    this.buttonC.setAttribute("hidden", true)
//agrega el icono al boton
    this.buttonC.innerHTML=`<button class="buttonComponent"> 
    <img class="buttonIcon" src="./assets/icons/password.png" alt="ver" width="24" height="24">
    </button>`
//verifica que es un tipo password para mostrar el boton
    if(type=="password"){
      this.buttonC.removeAttribute("hidden",false)
    }
//funcion de boton el cual cambia a hidden o no hidden
    this.buttonC.addEventListener('click', () => {
      console.log(type)
      if(type=="password"){
        const lightComponent = document.querySelectorAll('input-component')
        this.inputC.setAttribute("type","text")
        type="text"
        this.buttonC.innerHTML=`<button class="buttonComponent"> 
        <img class="buttonIcon" src="./assets/icons/password.png" alt="ocultar" width="24" height="24">
        </button>`
      }
      else{
        console.log("pas")
        this.inputC.setAttribute("type","password")
        type="password"
        this.buttonC.innerHTML=`<button class="buttonComponent"> 
        <img class="buttonIcon" src="./assets/icons/text.png" alt="ver" width="24" height="24">
        </button>`
        }
    });
//se crean los elementos hijos para visualizarce en la pantalla
      this.shadowRoot.appendChild(this.divHeader)
      this.shadowRoot.appendChild(this.divContent)
      this.divHeader.appendChild(this.labelC)
      this.divHeader.appendChild(this.message)
      this.divContent.appendChild(this.inputC)
      this.divContent.appendChild(this.buttonC)
      //this.message.removeAttribute("hidden",false)
      this.render()
  }
}
customElements.define("input-component",inputComponent)


