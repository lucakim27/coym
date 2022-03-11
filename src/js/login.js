const socket = io()

function clickLogin() {
    socket.emit('login', [document.getElementById("loginID").value, document.getElementById("loginPw").value])
}

socket.on('loginSuccessful', acc => {
    socket.emit('loggedIn', acc)
    document.location.href = 'http://localhost:3000/?socketid=' + acc[2]
})

socket.on('loginFail', value => {
    alert("ID or Password is wrong.")
})

function directToHome() {
    document.location.href = 'http://localhost:3000'
}

function directToAboutPage() {
    document.location.href = 'http://localhost:3000/about' 
}
