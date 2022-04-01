if (document.getElementById('username').innerText == 'anonymous') {
    document.getElementById('greetLoggedinUser').style.display = 'none'
} else {
    document.getElementById('greetLoggedinUser').style.display = 'block'
    document.getElementById('loginBtn').style.display = 'none'
}