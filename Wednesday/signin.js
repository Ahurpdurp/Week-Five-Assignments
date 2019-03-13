let createAccount = document.getElementById('createAccount')
let usernameField = document.getElementById('usernameField')
let passwordField = document.getElementById('passwordField')
let login = document.getElementById('login')
let wrongPassword = document.getElementById('wrongPassword')


createAccount.addEventListener('click',function(){
        let username = usernameField.value
        let password = passwordField.value
        let usernames = database.ref("Usernames")

        usernames.push({
        username: username,
        password: password
        })
        
        var user_id = username
         

        alert('Account has been added! Enter credentials to login')
    })

login.addEventListener('click',function(){
    let username = usernameField.value
    let password = passwordField.value
    let usernames = database.ref("Usernames")
    let passCheck = false
    usernames.once('value', snapshot => {
            snapshot.forEach(element => {
                if(element.val()['username'] == username){
                    if(element.val()['password'] == password){
                        globalVar(element.key, element.val()['username'])
                    }
                }
                else{passCheck = true}
                
            })
            if(passCheck == true){
                wrongPassword.innerHTML = 'Wrong credentials. Try again.'
                passCheck = false
            }
        })

})

function globalVar(userId, username){
    window.globalUserId = userId
    window.globalUsername = username
    alert('Logging in now')
    window.location = 'home.html?username='+ username+ '&id=' + userId
}

