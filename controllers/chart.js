const counts = JSON.parse(document.getElementById('counts').innerHTML)[0]

const getRandomRgb = function () {
    var num = Math.round(0xffffff * Math.random())
    return 'rgb(' + num >> 16 + ', ' + num >> 8 & 255 + ', ' + num & 255 + ')'
}

const data = {
    'view': {
        labels: [],
        datasets: [{
            label: 'Most Viewed Pages',
            data: [],
            backgroundColor: [],
            hoverOffset: 4
        }]
    },
    'comment': {
        labels: [],
        datasets: [{
            label: 'Most Commented Pages',
            data: [],
            backgroundColor: [],
            hoverOffset: 4
        }]
    }
}

const config = {
    'view': {
        type: 'doughnut',
        data: data['view'],
    },
    'comment': {
        type: 'doughnut',
        data: data['comment'],
    }
}

const counter = {
    'view': {},
    'comment': {}
}

for (var i = 0; i < counts.length; i++) {
    if (counts[i].type === 'view') {
        counter['view'][counts[i].page] = counts[i].count
    } else {
        counter['comment'][counts[i].page] = counts[i].count
    }
}

const keysForView = Object.keys(counter['view'])

keysForView.forEach((key, index) => {
    data['view'].labels.push(key)
    data['view'].datasets[0].data.push(counter['view'][key])
    data['view'].datasets[0].backgroundColor.push(getRandomRgb())
})

const chartForView = new Chart(
    document.getElementById('mostViewedPages'),
    config['view']
)

const keysForComment = Object.keys(counter['comment'])
keysForComment.forEach((key, index) => {
    data['comment'].labels.push(key)
    data['comment'].datasets[0].data.push(counter['comment'][key])
    data['comment'].datasets[0].backgroundColor.push(getRandomRgb())
})

const chartForComment = new Chart(
    document.getElementById('mostCommentedPages'),
    config['comment']
)

try {
    if ($('#signIn').html() === 'Sign in') {
    } else {
        socket.emit('addOnlineUser', getCookie('current-user'))
    }
} catch (error) {
    console.error(error)
}