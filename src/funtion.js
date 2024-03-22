const expresiones = {
    "text": /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    "password":   /^[a-zA-Z0-9\_\-]{4,16}$/,   // /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/, // almenos un digito, alguna letra minuscula, maayuscula, minimo 8 caracteres
    "number": /^.{4,12}$/, // 4 a 12 digitos.
    "date": /d{4}-\d{2}-\d{2}/, //fecha con formato aaaa-mm-dd cambiar el formato como dia mes año
    "range": /^.{1,3}$/, //acepta valores de 1 digito hasta 3
    "email": /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //formato de email con @ y .
    "tel": /^\d{7,14}$/, // 7 a 14 numeros.
    "default":/.*/
}

function obtenerElementos(id){
    const lightComponent = document.querySelectorAll('input-component')
    let i=0;
    let valores=[]
    let tipos=[]
    let resultados=[]

    lightComponent.forEach(input=>{
        valores.push(input.shadowRoot.querySelector(`#${id[i]}`).value)
        tipos.push(input.shadowRoot.querySelector(`#${id[i]}`).type)
        i++
    })

    resultados.push(lightComponent)
    resultados.push(id)
    resultados.push(valores)
    resultados.push(tipos)
    return resultados 
}

//refactorizar validaciones
function asignarError(arreglo, errorM){
    const componente=arreglo[0]
    let id=arreglo[1]
    let valor=arreglo[2]
    let tipos=arreglo[3]
    let resultados=[]
    let mensaje= "Se encontro un error en"
    let i=0
    resultados = []

    valor.forEach(input=>{
        resultados.push(evaluar(tipos[i],valor[i],errorM[i]))
        i++; 
    })
    

    resultados.forEach((valor, indice) => {
        if (valor === 0) {
          mensaje=mensaje + " " +   errorM[indice]
        }
      });

    if(resultados.includes(0)){
    document.querySelector("message-component").setAttribute('estado', "mal")
    document.querySelector("message-component").setAttribute('mensaje', mensaje)
   
    }else{
    document.querySelector("message-component").setAttribute('estado', "bien")
     //se hace el fetch para el login
    }
    
}

function validar(){
    let res = obtenerElementos(["usuario","pass"]) 
    asignarError(res,["usuario","contraseña"]) 
}

function evaluar (tipo, valor, errorM) {
    if(obtenerExpresion(tipo , valor )){
        return 1
    }else{
        console.log("error en " + errorM)
        return 0
    }
}

function obtenerExpresion(tipoInput, valor) {
    let boleano=false
    let tipos=[
        "text",
        "password",
        "email",
        "number",
        "date",
        "checkbox",
        "radio",
        "file",
        "submit",
        "button",
        "color",
        "range",
        "tel",
        "url",
      ];
      
    if(tipos.includes(tipoInput)){
        boleano=expresiones[tipoInput].test(valor)
    }
    else{
        console.log("revisa el tipo de input ")
    }
    return boleano
}
