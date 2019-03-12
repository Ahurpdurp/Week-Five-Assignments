let formSubmit = document.getElementById('formSubmit')

formSubmit.addEventListener('click',function(){
    let formEmail = document.getElementById('email').value
    let formCoffee = document.getElementById('coffee').value
    if(document.getElementById('size').value != "")
    {var formSize = document.getElementById('size').value
}
    if(document.getElementById('flavor').value != ''){
        var formFlavor = document.getElementById('flavor').value
    }
    if(document.getElementById('strength').value != null){
        var formStrength = document.getElementById('strength').value
    }
    let paramsToSend = {emailAddress: formEmail, coffee: formCoffee, size: formSize, flavor: formFlavor, strength: formStrength}

    fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(paramsToSend)
      }).then(function(response){
        return response.json()  
      }).then(res => alert('Order has been added'))
    })