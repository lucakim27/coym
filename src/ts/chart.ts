import Chart from "chart.js"
import { io } from "socket.io-client"

const socket: any = io()
const mostVisitedOccuaptions: any = document.getElementById("mostViewedPages")
const mostCommentedPages: any = document.getElementById("mostCommentedPages")

const getRandomRgb = function() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

try {
    if ($('#signIn').html() === 'Sign in') {
    } else {
        socket.emit('addOnlineUser', getCookie('current-user'))
    }
} catch (error) {
    console.error(error)
}

socket.on('getMostViewed', (value: { [x: string]: any; }) => {
    const data: any = {
        labels: [],
        datasets: [{
          label: 'My First Dataset',
          data: [],
          backgroundColor: [],
          hoverOffset: 4
        }]
    };
    
    const config = {
        type: 'doughnut',
        data: data,
    }
    
    const keys = Object.keys(value)

    keys.forEach((key, index) => {
        data.labels.push(key)
        data.datasets[0].data.push(value[key])
        data.datasets[0].backgroundColor.push(getRandomRgb())
    })

    const myChart = new Chart(
        mostVisitedOccuaptions,
        config
    )
})

socket.on('getMostCommented', (value: { [x: string]: any; }) => {
    const data: any = {
        labels: [],
        datasets: [{
          label: 'My First Dataset',
          data: [],
          backgroundColor: [],
          hoverOffset: 4
        }]
    };
    
    const config = {
        type: 'doughnut',
        data: data,
    }
    
    const keys = Object.keys(value)

    keys.forEach((key, index) => {
        data.labels.push(key)
        data.datasets[0].data.push(value[key])
        data.datasets[0].backgroundColor.push(getRandomRgb())
    })

    const myChart = new Chart(
        mostCommentedPages,
        config
    )
})

function getCookie(cname: string) {
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