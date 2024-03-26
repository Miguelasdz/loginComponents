function returnValues(elementInput,i){
  const input=elementInput.shadowRoot.querySelector(`#${elementInput.id}`)
  let values = {
      "value":input.value,
      "type":input.type,
      "id":elementInput.id
  }
  let jsonString = JSON.stringify(values);
  elementInput.setAttribute('state', jsonString) //document.querySelectorAll("input-component")setAttribute('state', jsonString) esto solo ingresa al primero no al elegido
}
function validate(){
  const lightComponent = document.querySelectorAll('input-component')
  lightComponent.forEach(returnValues)
}
