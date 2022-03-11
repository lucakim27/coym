function clickProfile() {
    if (document.getElementById('myForm').classList.contains('show')) {
        document.getElementById('myForm').classList.remove('show')
    } else {
        document.getElementById("myForm").classList.toggle("show")
    }
}

function logoutBtn() {
    document.location.href = 'http://localhost:3000'
}

function clickLoginBtn() {
    document.location.href = 'http://localhost:3000/login'
}
