const occupationTitle = document.getElementById('occupationTitle')
const commentsArea = document.getElementById('comments')
const commentBtn = document.getElementById('searchBtn')
const userInput = document.getElementById("userInput")
const socket = io()
const occupationArray = []

occupationTitle.innerHTML = getQueryVariable('occupation')
searchBtn.setAttribute("onclick", "comment()")

socket.on('userEnter', (array) => {
    for (var i = 0; i < array.length; i++) {
        occupationArray.push(array[i])
    }
    displayUpdatedComments()
})

socket.on('updatedComment', (array) => {
    occupationArray.splice(0, occupationArray.length)
    for (var i = 0; i < array.length; i++) {
        occupationArray.push(array[i])
    }
    displayUpdatedComments()
})

function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (decodeURIComponent(pair[0]) == variable) {
            if (decodeURIComponent(pair[1]).includes('+') == false) {
                return decodeURIComponent(pair[1])
            }
            else {
                return decodeURIComponent(pair[1].replaceAll('+', ' '))
            }
        }
    }
}

function comment() {
    for (var i = 0; i < occupationArray.length; i++) {
        if (occupationArray[i][0] == occupationTitle.innerText && userInput.value != "") {
            occupationArray[i][1].push(userInput.value)
            occupationArray[i][2].push(0)
            userInput.value = ''
        }
    }
    socket.emit('updateComment', occupationArray)
}

function likeOrDislike(clicked_id) {
    for (var i = 0; i < occupationArray.length; i++) {
        if (occupationArray[i][0] == occupationTitle.innerText) {
            for (var j = 0; j < occupationArray[i][1].length; j++) {
                if (occupationArray[i][1][j] + "+" == clicked_id) {
                    occupationArray[i][2][j]++
                }
            }
        }
    }
    socket.emit('updateComment', occupationArray)
}

function displayUpdatedComments() {
    commentsArea.innerHTML = ""
    for (var i = 0; i < occupationArray.length; i++) {
        if (occupationArray[i][0] == occupationTitle.innerText) {
            for(var j = 0; j < occupationArray[i][1].length; j++) {
                commentsArea.innerHTML += `<div id="eachComment"><p>${occupationArray[i][1][j]}</p><button onclick=likeOrDislike(this.id) id="${occupationArray[i][1][j]}+">${occupationArray[i][2][j]} Likes</button></div><hr>`
            }
        }
    }
}
