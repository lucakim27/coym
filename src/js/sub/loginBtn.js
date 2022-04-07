const clickProfile = function() {
    if (document.getElementById('myForm').classList.contains('show')) {
        document.getElementById('myForm').classList.remove('show')
    } else {
        document.getElementById("myForm").classList.toggle("show")
    }
}

if ($("#userId").text() == 'anonymous') {
    $("#logoutBtn").css('display', 'none')
} else {
    $("#logoutBtn").css('display', 'block')
    $("#loginTab").css('display', 'none')
    $("#registerTab").css('display', 'none')
}
