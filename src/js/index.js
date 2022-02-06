const socket = io()
const occupationArray = []
var socketid = ''

socket.on('userEnter', (array) => {
    for (var i = 0; i < array.length; i++) {
        occupationArray.push(array[i])
    }

    if (getQueryVariable('login') === '') {
        document.getElementById('userId').style.display = 'none'
    }
    else {
        document.getElementById('loginBtn').style.display = 'none'
    }

})

socket.on('updatedComment', (array) => {
    occupationArray = array
})

socket.on('loggedIn', (array) => {
    alert(array)
})

var app4 = new Vue ({
    el: '#app-4',

    data: {
        searchQuery: null,
        data: occupationArray
    },

    computed: {
        resultQuery() {
            if (this.searchQuery) {
                return this.data.filter ((item) => {
                  return this.searchQuery.toLowerCase().split(' ').every(v => item.toString().toLowerCase().includes(v))
                })
            }
            else {
                return this.data
            }
        }
    }
})

function directPage(occupationName) {
    document.location.href = 'http://localhost:3000/comment?occupation=' + occupationName
}

function clickLoginBtn() {
    document.location.href = 'http://localhost:3000/login'
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    return query
}
