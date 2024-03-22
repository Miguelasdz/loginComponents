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
    const lightComponent = document.querySelectorAll('my-input')
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
    console.log(mensaje)
    document.querySelector("my-message").setAttribute('estado', "mal")
    document.querySelector("my-message").setAttribute('mensaje', mensaje)
   
    }else{
    document.querySelector("my-message").setAttribute('estado', "bien")
    solicitud(valor)
     //se hace el fetch para el login
    }
    
}

function solicitud(valor){
    const url = "https://reqres.in/api/register";
      

      const payload = {
        "email": valor[0] + "@gmail.com",
        "password": valor[1]
      };

      console.log(payload);
      const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(data => {
          

            setTimeout(() => {
                alert("Guardado exitosamente");
                
            }, 1000);
            //console.log(data);
        })
        .catch(error => {
            console.log(payload)
            console.error('Error:', error);
        });
        
}

function validar(){
    let res = obtenerElementos(["usuario","pass"]) //result, 
    asignarError(res,["usuario","contraseña"]) //corregir y pasar objertos literales
}

function evaluar (tipo, valor, errorM) {
    if(obtenerExpresion(tipo , valor )){
        //console.log("pasa 1")
        //document.querySelector("my-message").setAttribute('estado', "bien")
        return 1
    }else{
        //console.log("pasa 0")
        //document.querySelector("my-message").setAttribute('estado', `mal`)
        console.log("error en " + errorM)
        //document.querySelector("my-message").setAttribute('error', `error-${errorM}`)
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
        
        //console.log(expresiones[tipoInput])
        //console.log(expresiones[tipoInput].test(valor))
        boleano=expresiones[tipoInput].test(valor)
    }
    else{
        //no esta escrito las funciones
        console.log("revisa el tipo de input ")
        
    }

    
    return boleano
    // expresiones[expresion.test("default")]

    
}
