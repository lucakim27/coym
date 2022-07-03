try {
    if ($('#signIn').html() === 'Sign in') {
    } else {
        socket.emit('addOnlineUser', getCookie('current-user'))
    }
} catch (error) {
    console.error(error)
}

var left = 1
var right = 1

$('#incrementLeft').click(function () {
    if (left === 3) {
        left = 1
    } else {
        left++
    }
    showAndHide(left, 'left')
})

$('#incrementRight').click(function () {
    if (right === 3) {
        right = 1
    } else {
        right++
    }
    showAndHide(right, 'right')
})

$('#decrementLeft').click(function () {
    if (left === 1) {
        left = 3
    } else {
        left--
    }
    showAndHide(left, 'left')
})

$('#decrementRight').click(function () {
    if (right === 1) {
        right = 3
    } else {
        right--
    }
    showAndHide(right, 'right')
})

const showAndHide = function (number, direction) {
    if (direction === 'left') {
        $("#onlineHead").hide()
        $("#onlineParagraph").hide()
        $("#commentHead").hide()
        $("#commentParagraph").hide()
        $("#homeHead").hide()
        $("#homeParagraph").hide()
        switch (number) {
            case 1:
                $("#homeHead").show()
                $("#homeParagraph").show()
                break;
            case 2:
                $("#onlineHead").show()
                $("#onlineParagraph").show()
                break;
            case 3:
                $("#commentHead").show()
                $("#commentParagraph").show()
                break;
        }
    } else if (direction === 'right') {
        $("#chartHead").hide()
        $("#chartParagraph").hide()
        $("#contactHead").hide()
        $("#contactParagraph").hide()
        $("#chatHead").hide()
        $("#chatParagraph").hide()
        switch (number) {
            case 1:
                $("#chatHead").show()
                $("#chatParagraph").show()
                break;
            case 2:
                $("#chartHead").show()
                $("#chartParagraph").show()
                break;
            case 3:
                $("#contactHead").show()
                $("#contactParagraph").show()
                break;
        }
    }
}