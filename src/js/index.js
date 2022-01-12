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
})

socket.on('updatedComment', (array) => {
    occupationArray = array
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

var app = angular.module('indexHeader', [])
    app.controller('indexHeaderController', function($scope) {
        $scope.login = 1;
        $scope.firstName = "Heesu"
        $scope.lastName = "Kim"
})
