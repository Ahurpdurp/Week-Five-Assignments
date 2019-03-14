let addGrocery = document.getElementById('addGrocery')
let addButton = document.getElementById('addButton')
let storeListUL = document.getElementById('storeListUL')
let welcome = document.getElementById('welcome')



function Welcome(){
    var urlParams = new URLSearchParams(window.location.search);
    var globalUsername = urlParams.get('username')
    window.globalID = urlParams.get('id')
    welcome.innerHTML = `Welcome, ${globalUsername}! Here's your shopping list :)`
    if(window.globalID == null){
        alert('Login first.')
        window.location = 'signin.html'
    }
}
function displayItems(){
database.ref(`Usernames/${window.globalID}/storeList`)
.on('value',function(snapshot){

  let storeList = []
  snapshot.forEach((childSnapshot) => {
    storeList.push(`<li><div class = "HI">${childSnapshot.val().storeName} <span><button class = 'add-item-button' onclick = 'addGroceryItem("${childSnapshot.key}")'>&plus;</button><button class = 'delete-button fa fa-trash' onclick = 'deleteGroceryStore("${childSnapshot.key}")'></button></span></div>`)
    childSnapshot.forEach( x => {
      if(typeof x.val().Item != 'undefined'){
      storeList.push(`<div class = individual-items>${x.val().Item} <span><button class = 'delete-item' onclick = 'deleteGroceryItem("${childSnapshot.key}","${x.key}")'>&#10006</button></span></div>`)}
    })
    storeList.push("</li>")
  })
  storeListUL.innerHTML = storeList.join("")

})}

addButton.addEventListener('click',function(){

    let store = addGrocery.value
    let storeRef = database.ref(`Usernames/${window.globalID}/storeList`)



    storeRef.push({
      storeName: store
    })
})

function deleteGroceryStore(key){
    database.ref(`Usernames/${window.globalID}/storeList`).child(key).remove()
}

function addGroceryItem(key){
  let itemRef = database.ref(`Usernames/${window.globalID}/storeList/${key}`)
  let itemValue = prompt("Please enter the item you want to add:")
  itemRef.push({
      Item: itemValue
  })
}

function deleteGroceryItem(key1, key2){
  database.ref(`Usernames/${window.globalID}/storeList/${key1}`).child(key2).remove()
}



