const socket = io()
const occupationArray = []
var userId = ''

document.getElementById('occupationTitle').innerHTML = getQueryVariable('occupation')
searchBtn.setAttribute("onclick", "comment()")

socket.on('userEnter', (array) => {
    for (var i = 0; i < array.length; i++) {
        occupationArray.push(array[i])
    }
    displayUpdatedComments()

    if (document.getElementById('userId').innerText == 'anonymous') {
        document.getElementById('inputAndCommentBtn').style.display = 'none'
    } else {
        document.getElementById('inputAndCommentBtn').style.display = 'block'
    }
    
    socket.emit('addOnlineUser', document.getElementById('userId').innerText)
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
            } else {
                return decodeURIComponent(pair[1].replaceAll('+', ' '))
            }
        }
    }
}

function comment() {
    if (document.getElementById("userInput").value.length == 0) {
        return 0
    } else if (confirm("Are you sure you wanna comment?")) {
        for (var i = 0; i < occupationArray.length; i++) {
            if (occupationArray[i][0] == occupationTitle.innerText && document.getElementById("userInput").value != "") {
                occupationArray[i][1].push(document.getElementById("userInput").value)
                occupationArray[i][2].push([])
                occupationArray[i][3].push(userId)
                document.getElementById("userInput").value = ''
            }
        }
        socket.emit('updateComment', occupationArray)
    }
}

function like(clicked_id) {
    if (userId == '') return 0
    for (var i = 0; i < occupationArray.length; i++) {
        if (occupationArray[i][0] == occupationTitle.innerText) {
            for (var j = 0; j < occupationArray[i][1].length; j++) {
                if (occupationArray[i][1][j] + "+" == clicked_id) {
                    if (occupationArray[i][2][j].includes(userId) == false) {
                        occupationArray[i][2][j].push(userId)
                    } else {
                        for (var e = 0; e < occupationArray[i][2][j].length; e++) {
                            if (occupationArray[i][2][j][e] == userId) {
                                occupationArray[i][2][j].splice(e, 1)
                            }
                        }
                    }
                }
            }
        }
    }
    socket.emit('updateComment', occupationArray)
}

function displayUpdatedComments() {
    document.getElementById('comments').innerHTML = ""
    for (var i = 0; i < occupationArray.length; i++) {
        if (occupationArray[i][0] == occupationTitle.innerText) {
            for(var j = 0; j < occupationArray[i][1].length; j++) {
                console.log(occupationArray[i])
                document.getElementById('comments').innerHTML += 
                `
                    <div id="eachComment">
                        <img src='../img/accountIMG.jpeg' style='width: 50px; height: 50px;'>
                        <p style='font-weight: bold;'>
                            ${occupationArray[i][3][j]}
                        </p>
                        <p>
                            ${occupationArray[i][1][j]}
                        </p>
                        <button onclick=like(this.id) id="${occupationArray[i][1][j]}+">
                            ${occupationArray[i][2][j].length} Likes
                        </button>
                    </div>
                    <hr>
                `
            }
        }
    }
}
