const getQueryVariable = function(variable) {
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

searchBtn.setAttribute("onclick", "comment()")

socket.emit('emitPage', getQueryVariable('occupation'))

socket.on('getComments', (occupationArray) => {
    displayUpdatedComments(0, occupationArray)
    if (getCookie('current-user') === '') {
        $("#inputAndCommentBtn").css('display', 'none')
    } else {
        $("#inputAndCommentBtn").css('display', 'block')
    }
    socket.emit('addOnlineUser', getCookie('current-user'))
})

socket.on('updatedComment', (occupationArray) => {
    displayUpdatedComments(0, occupationArray)
})

function getCookie(cname) {
    let id = ''
    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for(let i = 0; i <ca.length; i++) {
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


const animateText = function(text) {
    var value = '<h1 id="header" class="waviy" style="color: black;">'
    for (var i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            value += '<span style="--i:' + (i+1).toString() + '">-' + '</span>'
        } else {
            value += '<span style="--i:' + (i+1).toString() + '">' + text[i] + '</span>'
        }
    }
    value += '</h1>'
    return value
}

$("#occupationTitle").html(animateText(getQueryVariable('occupation')))

const comment = function() {
    if ($('#userInput').val() === '') {
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

const like = function(index, row) {
    if (getCookie('current-user') == '') {
        toastr.error('You are not logged in...')
        return 0
    } else {
        socket.emit('updateLike',
            index,
            row,
            getCookie('current-user'),
            getQueryVariable('occupation')
        )
    }
}

const displayUpdatedComments = function(i, occupationArray) {
    if (occupationArray === undefined) return 0
    $("#comments").html('')
    appendComments(i, 0, occupationArray)          
}

const appendComments = function(i, j, occupationArray) {
    if (j < occupationArray.comments.length) {
        document.getElementById('comments').innerHTML +=
        `
            <div id="eachComment">
                <img src='../img/accountIMG.jpeg' style='width: 50px; height: 50px;'>
                <p style='font-weight: bold;'>
                    ${occupationArray.username[j]}
                </p>
                <p>${occupationArray.comments[j]}</p>
                <button onclick=like(${[i, j]})>
                    ${occupationArray.likes[j].length} Likes
                </button>
            </div><hr>
        `
        appendComments(i, j+1, occupationArray)
    }
}
