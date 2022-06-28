function getCookie(cname) {
    let id = ''
    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            for (var j = 9; j < c.substring(name.length, c.length).length; j++) {
                if (c.substring(name.length, c.length)[j] === '"') {
                    break
                } else {
                    id += c.substring(name.length, c.length)[j]
                }
            }
            return id
        }
    }
    return ""
}

const getQueryVariable = function (variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (decodeURIComponent(pair[0]) == variable) {
            if (decodeURIComponent(pair[1]).includes('+') == false) {
                return decodeURIComponent(pair[1])
            } else {
                return decodeURIComponent(pair[1].replaceAll('+', ' '))
            }
        }
    }
}

const animateText = function (text) {
    var value = '<h1 id="header" class="waviy" style="color: black;">'
    for (var i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            value += '<span style="--i:' + (i + 1).toString() + '">-' + '</span>'
        } else {
            value += '<span style="--i:' + (i + 1).toString() + '">' + text[i] + '</span>'
        }
    }
    value += '</h1>'
    return value
}

// once user enters
$("#occupationTitle").html(animateText(getQueryVariable('occupation')))

// append comment div tag
$('#commentCenterTag').append(`<div id='${getQueryVariable('occupation').replaceAll(' ', '-')}' style="height: 800px; overflow-y: scroll"></div>`)

try {
    searchBtn.setAttribute("onclick", "comment()")
} catch (error) {
    console.error(error)
}

// To let server knows which page the user is on
socket.emit('emitPage', getQueryVariable('occupation'))

socket.on('getComments', (newOccupationArray, occupation) => {
    displayComments(newOccupationArray, occupation.replaceAll(' ', '-'))

    try {
        if ($('#signIn').html() !== 'Sign in') {
            socket.emit('addOnlineUser', getCookie('current-user'))
        }
    } catch (error) {
        console.error(error)
    }
})

socket.on('updatedComment', (updatedOccupationArray, occupation, toastrContent) => {
    displayComments(updatedOccupationArray, occupation.replaceAll(' ', '-'))
    toastr.success(toastrContent)
})

const displayComments = function (occupationArray, occupation) {
    appendComments(0, occupationArray, occupation)
}

const appendComments = function (j, newOccupationArray, occupation) {
    if (j < newOccupationArray.comments.length) {
        $(`#${occupation}`).append(
            `
                <div id="eachComment">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="44"
                    fill="currentColor"
                    class="bi bi-person-circle"
                    viewBox="0 0 16 16"
                    >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                            fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                    </svg>
                    <p style='font-weight: bold;'> ${newOccupationArray.username[j]} </p>
                    <p> ${newOccupationArray.comments[j]} </p>
                    <p> ${newOccupationArray.dates[j]} </p>
                    <button onclick=like();> ${newOccupationArray.likes[j].length} Likes </button>
                    <a style="font-size: 27px; margin-left: 10px; color: rgb(54, 153, 207);"> Reply </a>
                </div><hr>
            `
        )
        appendComments(j+1, newOccupationArray, occupation)
    }
}

socket.on('duplicatedComment', () => {
    toastr.error('The comment is dupliacted...')
})

const comment = function () {
    if ($('#userInput').val() === '') {
        toastr.error('You have not typed anything yet...')
        return 0
    } else if (confirm("Are you sure you wanna comment?")) {
        socket.emit('updateComment',
            getCookie('current-user'),
            $('#userInput').val(),
            getQueryVariable('occupation')
        )
        $('#userInput').val('')
    }
}

const like = function () {
    // if (getCookie('current-user') == '') {
    //     toastr.error('You are not logged in...')
    //     return 0
    // } else {
    //     socket.emit('updateLike',
    //         row,
    //         getCookie('current-user'),
    //         getQueryVariable('occupation')
    //     )
    // }
}

const showReply = function (row) {
    $(`.${row}_input`).show()
}

const hideReply = function (row) {
    $(`.${row}_input`).hide()
}