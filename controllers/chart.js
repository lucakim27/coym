const counts = JSON.parse(document.getElementById('counts').innerHTML)[0]

const random_rgba = function () {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

var data = {
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

var config = {
    'view': {
        type: 'doughnut',
        data: data['view'],
    },
    'comment': {
        type: 'doughnut',
        data: data['comment'],
    }
}

var counter = {
    'view': {},
    'comment': {}
}

for (var i = 0; i < counts.length; i++) {
    if (counts[i].view) {
        counter['view'][counts[i].page] = counts[i].view
    }
    if (counts[i].comment) {
        counter['comment'][counts[i].page] = counts[i].comment
    }
}

var keysForView = Object.keys(counter['view'])
keysForView.forEach((key, index) => {
    data['view'].labels.push(key)
    data['view'].datasets[0].data.push(counter['view'][key])
    data['view'].datasets[0].backgroundColor.push(random_rgba())
})

var chartForView = new Chart(
    document.getElementById('mostViewedPages'),
    config['view']
)

var keysForComment = Object.keys(counter['comment'])
keysForComment.forEach((key, index) => {
    data['comment'].labels.push(key)
    data['comment'].datasets[0].data.push(counter['comment'][key])
    data['comment'].datasets[0].backgroundColor.push(random_rgba())
})

var chartForComment = new Chart(
    document.getElementById('mostCommentedPages'),
    config['comment']
)

try {
    if ($('#signIn').html() !== 'Sign in') {
        socket.emit('join', getCookie('current-user'))
    } 
} catch (error) {
    console.error(error)
}

socket.on('updatedCounts', (array) => {
    data = {
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
    
    config = {
        'view': {
            type: 'doughnut',
            data: data['view'],
        },
        'comment': {
            type: 'doughnut',
            data: data['comment'],
        }
    }

    counter = {
        'view': {},
        'comment': {}
    }

    for (var i = 0; i < JSON.parse(array)[0].length; i++) {
        if (JSON.parse(array)[0][i].view) {
            counter['view'][JSON.parse(array)[0][i].page] = JSON.parse(array)[0][i].view
        }
        if (JSON.parse(array)[0][i].comment) {
            counter['comment'][JSON.parse(array)[0][i].page] = JSON.parse(array)[0][i].comment
        }
    }

    const keysForView = Object.keys(counter['view'])

    keysForView.forEach((key, index) => {
        data['view'].labels.push(key)
        data['view'].datasets[0].data.push(counter['view'][key])
        data['view'].datasets[0].backgroundColor.push(random_rgba())
    })

    chartForView = new Chart(
        document.getElementById('mostViewedPages'),
        config['view']
    )

    const keysForComment = Object.keys(counter['comment'])
    keysForComment.forEach((key, index) => {
        data['comment'].labels.push(key)
        data['comment'].datasets[0].data.push(counter['comment'][key])
        data['comment'].datasets[0].backgroundColor.push(random_rgba())
    })

    chartForComment = new Chart(
        document.getElementById('mostCommentedPages'),
        config['comment']
    )
    
})