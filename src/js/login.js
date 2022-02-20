const socket = io()

function clickLogin() {
    socket.emit('login', [document.getElementById("loginID").value, document.getElementById("loginPw").value])
}

socket.on('loginSuccessful', socketid => {
    alert("Login Successful!")
    document.location.href = 'http://localhost:3000/?socketid=' + socketid
})

socket.on('loginFail', value => {
    alert("ID or Password is wrong.")
})
