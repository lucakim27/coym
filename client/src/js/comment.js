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

try {
    searchBtn.setAttribute("onclick", "comment()")
} catch (error) {
    console.error(error)
}

socket.emit('emitPage', getQueryVariable('occupation'))

socket.on('getComments', (occupationArray) => {
    console.log('getComments')
    console.log(occupationArray)
    displayUpdatedComments(0, occupationArray)
    try {
        if ($('#signIn').html() === 'Sign in') {
        } else {
            socket.emit('addOnlineUser', getCookie('current-user'))
        }
    } catch (error) {
        console.error(error)
    }
})

socket.on('updatedComment', (occupationArray, val) => {
    console.log('updatedComment')
    console.log(occupationArray)
    console.log(val)
    displayUpdatedComments(0, occupationArray)
    if (val === 0) {
        toastr.success('Successfully commented!')
    } else if (val === 1) {
        toastr.success('Successfully liked or unliked!')
    }
})

socket.on('duplicatedComment', () => {
    toastr.error('The comment is dupliacted...')
})

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

$("#occupationTitle").html(animateText(getQueryVariable('occupation')))

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

const like = function (index, row) {
    if (getCookie('current-user') == '') {
        toastr.error('You are not logged in...')
        return 0
    } else {
        socket.emit('updateLike',
            row,
            getCookie('current-user'),
            getQueryVariable('occupation')
        )
    }
}

const displayUpdatedComments = function (i, occupationArray) {
    if (occupationArray === undefined) return 0
    $("#comments").html('')
    appendComments(i, 0, occupationArray)
}

const showReply = function (row) {
    $(`.${row}_input`).show()
}

const hideReply = function (row) {
    $(`.${row}_input`).hide()
}

const appendComments = function (i, j, occupationArray) {
    if (j < occupationArray.comments.length) {
        document.getElementById('comments').innerHTML +=
            `
            <div id="eachComment" class="${j}">
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
                <p style='font-weight: bold;'> ${occupationArray.username[j]} </p>
                <p> ${occupationArray.comments[j]} </p>
                <p> ${occupationArray.dates[j]} </p>
                <button onclick=like(${[i, j]});> ${occupationArray.likes[j].length} Likes </button>
                <a onclick=showReply(${j}); style="font-size: 27px; margin-left: 10px; color: rgb(54, 153, 207);"> Reply </a>
                <div class='${j}_input' style='display: none; margin-top: 20px;'>
                    <input type='text' id='userInput' placeholder='Reply here...'>
                    <button id='searchBtn'> > </button>
                    <button id='searchBtn' onclick='hideReply(${j})'> x </button>
                </div>
            </div><hr>
        `
        appendComments(i, j + 1, occupationArray)
    }
}