if ($("#username").text() == 'anonymous') {
    $("#greetLoggedinUser").css('display', 'none')
} else {
    $("#greetLoggedinUser").css('display', 'block')
    $("#loginBtn").css('display', 'none')
}

const directPage = function(page) {
    window.location.href = `http://localhost:3000/${page}`
}
