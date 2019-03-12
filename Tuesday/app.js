let coffeeOrdersUL = document.getElementById('coffeeOrdersUL')
let formSubmit = document.getElementById('formSubmit')
let searchButton = document.getElementById('searchButton')
let allItemsButton = document.getElementById('allItems')
let deleteButton = document.getElementById('deleteButton')


function loadOrders(filterEmail = null){
    fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/')
        .then(function(response) {
            return response.json();
        })
        .then(function(lolol){
            let tempArray = []
            for (var key in lolol){
                if(filterEmail != null)
                {
                    if(lolol[key]['emailAddress'] == filterEmail)
                    {
                        tempArray.push(`<li><b>Email Address: </b> ${lolol[key]['emailAddress']} 
                        <b>Coffee: </b> ${lolol[key]['coffee']}`) 
                        if(lolol[key]['size'] != null){tempArray.push(`<b>Size: </b> ${lolol[key]['size']}`)} 
                        if(lolol[key]['flavor'] != null){tempArray.push(`<b>Flavor: </b>${lolol[key]['flavor']}`)} 
                        if(lolol[key]['strength'] != null){tempArray.push(`<b>Size: </b>${lolol[key]['size']}`)} 
                        tempArray.push(`</li>`)
                    }
                }
                else
                {
                    tempArray.push(`<li><b>Email Address: </b> ${lolol[key]['emailAddress']} 
                    <b>Coffee: </b> ${lolol[key]['coffee']}`) 
                    if(lolol[key]['size'] != null){tempArray.push(`<b>Size: </b> ${lolol[key]['size']}`)} 
                    if(lolol[key]['flavor'] != null){tempArray.push(`<b>Flavor: </b>${lolol[key]['flavor']}`)} 
                    if(lolol[key]['strength'] != null){tempArray.push(`<b>Size: </b>${lolol[key]['size']}`)} 
                    tempArray.push(`</li>`)
                }
            }
            coffeeOrdersUL.innerHTML = tempArray.join('')
        })
    }


searchButton.addEventListener('click',function(){
    let searchValue = document.getElementById('searchBar').value
    loadOrders(searchValue)
})

allItemsButton.addEventListener('click',function(){
    loadOrders()
})

deleteButton.addEventListener('click',function(){
    let deleteValue = document.getElementById('deleteBar').value
    if(deleteValue != ""){
    let URL = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders/' + deleteValue
    fetch(URL, {
        method: 'Delete',
      }).then(function(response){
        return response.json()  
      }).then(res => alert('Order has been deleted.'))
      .then(function(){
          location.reload()
      })
    }
    else{alert('Please enter an email to delete.')}

})


