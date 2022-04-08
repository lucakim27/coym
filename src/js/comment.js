const socket = io()
const occupationArray = []
searchBtn.setAttribute("onclick", "comment()")

socket.on('userEnter', (array) => {
    pushOccupationArray(array, 0)
    displayUpdatedComments(0)
    socket.emit('addOnlineUser', $("#userId").text())
    if ($("#userId").text() == 'anonymous') {
        $("#inputAndCommentBtn").css('display', 'none')
    } else {
        $("#inputAndCommentBtn").css('display', 'block')
    }
    socket.emit('addOnlineUser', $("#userId").text())
})

socket.on('updatedComment', (array) => {
    occupationArray.splice(0, occupationArray.length)
    pushOccupationArray(array, 0)
    displayUpdatedComments(0)
})

const pushOccupationArray = function(array, i) {
    if (i < array.length) {
        occupationArray.push(array[i])
        pushOccupationArray(array, i+1)
    }
}

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

$("#occupationTitle").text(getQueryVariable('occupation'))

const comment = function() {
    if ($('#userInput').val() === '') return 0
    else if (confirm("Are you sure you wanna comment?")) {
        socket.emit('updateComment',
            $("#userId").text(),
            $('#userInput').val(),
            $("#occupationTitle").text()
        )
        $('#userInput').val('')
    }
}

const like = function(comment) {
    if ($("#userId").text() == 'anonymous') return 0
    else {
        socket.emit('updateLike', comment,
            $("#userId").text(),
            $("#occupationTitle").text()
        )
    }
}

const displayUpdatedComments = function(i) {
    $("#comments").html('')
    if (i < occupationArray.length) {
        if (occupationArray[i][0] == $("#occupationTitle").text()) {
            appendComments(i, 0)
            return 0
        }
        displayUpdatedComments(i+1)
    }
}

const appendComments = function(i, j) {
    if (j < occupationArray[i][1].length) {
        document.getElementById('comments').innerHTML +=
        `
            <div id="eachComment">
                <img src='../img/accountIMG.jpeg' style='width: 50px; height: 50px;'>
                <p style='font-weight: bold;'>
                    ${occupationArray[i][3][j]}
                </p>
                <p>${occupationArray[i][1][j]}</p>
                <button onclick=like('${occupationArray[i][1][j]}')>
                    ${occupationArray[i][2][j].length} Likes
                </button>
            </div><hr>
        `
        appendComments(i, j+1)
    }
}
