function clickProfile() {
    if (document.getElementById('myForm').style.display == 'block') {
        document.getElementById('myForm').style.display = 'none';
    } else {
        document.getElementById('myForm').style.display = 'block';
    }
}

function logoutBtn() {
    document.location.href = 'http://localhost:3000'
}

function clickLoginBtn() {
    document.location.href = 'http://localhost:3000/login'
}
