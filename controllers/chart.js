


const mostViewedOccuaptionsTable = document.getElementById("mostViewedOccuaptions")
const mostCommentedOccuaptionsTable = document.getElementById("mostCommentedOccuaptions")

function getCookie(cname) {
    let id = ''
    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
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

const getRandomRgb = function () {
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

socket.on('getMostViewed', (value) => {
    const data = {
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
        document.getElementById('mostViewedPages'),
        config
    )
})

socket.on('getMostCommented', (value) => {
    const data = {
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
        document.getElementById('mostCommentedPages'),
        config
    )
})