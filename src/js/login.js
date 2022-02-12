const socket = io()

function clickLogin() {
    socket.emit('login', [document.getElementById("loginID").value, document.getElementById("loginPw").value])
}

socket.on('loginSuccessful', idAndAcc => {
    alert("Login Successful!")
    document.location.href = 'http://localhost:3000/?socketid=' + idAndAcc[0] + "&id=" + idAndAcc[1][0]
})

socket.on('loginFail', value => {
    alert("ID or Password is wrong.")
})
