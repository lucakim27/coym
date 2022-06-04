if ($("#username").text().length === 0) {
    $("#greetLoggedinUser").css('display', 'none')
} else {
    $("#greetLoggedinUser").css('display', 'block')
    $(".loginBtn").css('display', 'none')
}

const directPage = function(page) {
    window.location.href = `/${page}`
}
