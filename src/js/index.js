const userInput = document.getElementById("userInput")
const output = document.getElementById("output")
const searchBtn = document.getElementById("searchBtn")
const header = document.getElementById("header")
const homeBtn = document.getElementById("homeBtn")
const socket = io()

var occupationArray = []

socket.on('enter', (array) => {
    this.occupationArray = array
})

socket.on('updatedComment', (array) => {
    occupationArray = array
})

function searchOccupation() {
    searchBtn.value = ''
    displayOccupation(userInput, output)
    userInput.value = ''
}

function displayOccupation(userInput, output) {
    output.innerHTML = ''
    for (var i=0; i < occupationArray.length; i++) {
        if (occupationArray[i][0].toLowerCase().includes(userInput.value.toLowerCase()) == true) {
            output.innerHTML += `<a href="#" onclick="displayComment(${i})">${occupationArray[i][0]}</a><hr>`
        }
    }
}

function displayComment(value) {
    header.innerHTML = `${occupationArray[value][0]}`
    header.setAttribute("href", "#")
    userInput.value = ''
    output.innerHTML = ''
    searchBtn.innerText = "comment"
    searchBtn.setAttribute("onclick", "comment()")
    homeBtn.disabled = false
    displayUpdatedComments()
}

function comment() {
    output.innerHTML = ""
    // iterate occupationArray array
    for (var i = 0; i < occupationArray.length; i++) {
        // if it matches with header and not none
        if (occupationArray[i][0] == header.innerText && userInput.value != "") {
            // insert values into occupationArray
            occupationArray[i][1].push(userInput.value)
            occupationArray[i][2].push(0)
            occupationArray[i][3].push(0)
            userInput.value = ''
        }
    }
    displayUpdatedComments()
    socket.emit('updateComment', this.occupationArray)
}

function likeOrDislike(clicked_id) {

    // like or dislike
    for (var i = 0; i < occupationArray.length; i++) {
        if (occupationArray[i][0] == header.innerText) {
            for (var j = 0; j < occupationArray[i][1].length; j++) {
                if (occupationArray[i][1][j] + "+" == clicked_id) {
                    occupationArray[i][2][j]++
                }
                else if (occupationArray[i][1][j] + "-" == clicked_id) {
                    occupationArray[i][3][j]++ 
                }
            }
        }
    }
    displayUpdatedComments()
    socket.emit('updateComment', this.occupationArray)
}

function openForm() {
    document.getElementById("myForm").style.display = "block"
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function displayUpdatedComments() {
    output.innerHTML = ""
    for (var i = 0; i < occupationArray.length; i++) {
        if (occupationArray[i][0] == header.innerText) {
            for(var j = 0; j < occupationArray[i][1].length; j++) {
                output.innerHTML += `<div id="eachComment"><p>${occupationArray[i][1][j]}</p><button onclick=likeOrDislike(this.id) id="${occupationArray[i][1][j]}+">${occupationArray[i][2][j]} Likes</button></div><hr>`
                // output.innerHTML += `<button onclick="likeOrDislike(this.id)" id="${occupationArray[i][1][j]}-">${occupationArray[i][3][j]} Dislikes</button><hr>`
            }
        }
    } 
}
