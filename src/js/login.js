const socket = io()

function clickLogin() {
    socket.emit('login', [document.getElementById("loginID").value, document.getElementById("loginPw").value])
}

socket.on('loginSuccessful', id => {
    document.location.href = 'http://localhost:3000'
    socket.emit('logIn', id)
})

socket.on('loginFail', value => {
    alert("ID or Password is wrong.")
})
