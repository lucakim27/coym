const socket = io()

function clickRegister() {
    if (document.getElementById("registerID").value.length < 5 || document.getElementById("registerPw").value.length < 5) {
        alert("The length of ID or Password should be at least more than 5 characters.")
    } else if (document.getElementById("registerPw").value !== document.getElementById("registerPwAgain").value) {
        alert("Your passwords aren't matching.")
    } else {
        alert("Registered Successfully!")
        socket.emit('registerAccount', [document.getElementById("registerID").value, document.getElementById("registerPw").value])
        document.location.href = 'http://localhost:3000/login'
    }
}

function directToHome() {
    document.location.href = 'http://localhost:3000'
}