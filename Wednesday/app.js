let addGrocery = document.getElementById('addGrocery')
let addButton = document.getElementById('addButton')
let storeListUL = document.getElementById('storeListUL')
let welcome = document.getElementById('welcome')



function Welcome(){
    var urlParams = new URLSearchParams(window.location.search);
    var globalUsername = urlParams.get('username')
    window.globalID = urlParams.get('id')
    welcome.innerHTML = `Welcome, ${globalUsername}!`
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
    storeList.push(`<li>${childSnapshot.val().storeName} <button class = 'delete-button' onclick = 'deleteGroceryStore("${childSnapshot.key}")'>Delete</button></li>`)
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


