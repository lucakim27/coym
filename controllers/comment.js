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

$("#occupationTitle").html(animateText(getQueryVariable('occupation')))
$('#commentCenterTag').append(`<div id='${getQueryVariable('occupation').replaceAll(' ', '-')}' style="height: 800px; overflow-y: scroll"></div>`)

try {
    if ($('#signIn').html() !== 'Sign in') {
        socket.emit('addOnlineUser', getCookie('current-user'))
    }
} catch (error) {
    console.error(error)
}

const comments = JSON.parse(document.getElementById('comments').innerHTML)[0]
console.log(comments)

socket.on('getComments', (commentsArray, page) => {
    console.log(page)
    console.log(commentsArray[0])
    displayComments(commentsArray, page.replaceAll(' ', '-'))
})

socket.on('updatedComment', (updatedOccupationArray, occupation) => {
    displayComments(updatedOccupationArray, occupation.replaceAll(' ', '-'))
    toastr.success('Successfully commented')
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
                    <button id='${newOccupationArray.comments[j]}' onClick='like(this.id)'> ${newOccupationArray.likes[j].length} Likes </button>
                    </div><hr>
            `
        )
        appendComments(j + 1, newOccupationArray, occupation)
    }
}

const like = function(comment) {
    if (getCookie('current-user') == '') {
        toastr.error('You are not logged in...')
        return 0
    } else {
        socket.emit('updateLike',
            comment,
            getCookie('current-user'),
            getQueryVariable('occupation')
        )
    }
}

$('#commentBtn').click(function () {
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
})

socket.on('duplicatedComment', () => {
    toastr.error('The comment is dupliacted...')
})

socket.on('updatedLike', (like, comment) => {
    document.getElementById(comment).innerHTML = `${like} Likes`
})