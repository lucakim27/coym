const socket = io()
const occupationArray = []
var socketid = ''

socket.on('userEnter', (array) => {
    for (var i = 0; i < array.length; i++) {
        occupationArray.push(array[i])
    }
    
    for (var i = 0; i < occupationArray.length; i++) {
        var row = document.getElementById("occupationTable").insertRow(i)
        var cell = row.insertCell(0)
        cell.insertAdjacentHTML('beforeend', `
            <a href='http://localhost:3000/comment?occupation=${occupationArray[i][0]}' onclick="countForCharts('${occupationArray[i][0]}')">
                ${occupationArray[i][0]}
            </a><hr>`
        )
    }

    if (document.getElementById('userAccountId').innerText == 'anonymous') {
        document.getElementById('logoutBtn').style.display = 'none'
        document.getElementById('loginBtn').style.display = 'block'
    } else {
        document.getElementById('loginBtn').style.display = 'none'
        document.getElementById('logoutBtn').style.display = 'block'
    }

})

socket.on('updatedComment', (array) => {
    occupationArray = array
})

function countForCharts(occupationName) {
    socket.emit('countUpMostViewed', occupationName)
}

function searchOccupationBtn() {
    var table = document.getElementById("occupationTable")
    var countRow = 0
    table.innerHTML = ""
    for (var i = 0; i < occupationArray.length; i++) {
        if (occupationArray[i][0].toLowerCase().includes(document.getElementById('userInput').value.toLowerCase()) == true) {
            var row = table.insertRow(countRow)
            var cell = row.insertCell(0)
            var a = document.createElement('a')
            a.href = `http://localhost:3000/comment?occupation=${occupationArray[i][0]}`
            a.innerHTML = occupationArray[i][0]
            cell.appendChild(a)
            cell.appendChild(document.createElement('hr'))
            countRow++
        }
    }
}
