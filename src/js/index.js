if ($("#username").text() == 'anonymous') {
    $("#greetLoggedinUser").css('display', 'none')
} else {
    $("#greetLoggedinUser").css('display', 'block')
    $("#loginBtn").css('display', 'none')
}