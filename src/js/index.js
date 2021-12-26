const userInput = document.getElementById("userInput")
const outputDOM = document.getElementById("output")
const searchBtn = document.getElementById("searchBtn")
const header = document.getElementById("header")
const homeBtn = document.getElementById("homeBtn")
const occupationTitle = document.getElementById("occupationTitle")

const socket = io()
const occupationArray = []

socket.on('userEnter', (array) => {
    for (var i = 0; i < array.length; i++) {
        occupationArray.push(array[i])
    }
    displayOccupation(userInput, outputDOM, occupationArray)
})

socket.on('updatedComment', (array) => {
    occupationArray = array
})

function searchOccupation() {
    displayOccupation(userInput, outputDOM, occupationArray)
    userInput.value = ''
}

function displayOccupation(userInput, outputDOM, array) {
    outputDOM.innerHTML = ''
    for (var i = 0; i < occupationArray.length; i++) {
        if (array[i][0].toLowerCase().includes(userInput.value.toLowerCase()) == true) {
            outputDOM.innerHTML += `<form action="/comment" method="get"><button type="submit" name="occupation" value="${array[i][0]}">${array[i][0]}</button></form><hr>`
        }
    }
}
