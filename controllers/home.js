const occupationArray = []
const options = document.getElementById('options')

for (var i = 0; i < options.rows.length; i++) {
    console.log(options.rows[i])
    occupationArray.push(options.rows[i].innerText.replaceAll('  ', '').replaceAll('\n', ''))
}

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

try {
    if ($('#signIn').html() !== 'Sign in') {
        socket.emit('addOnlineUser', getCookie('current-user'))
    }
} catch (error) {
    console.error(error)
}

const listOccupations = function (i) {
    if (i < occupationArray.length) {
        var row = options.insertRow(i)
        var cell = row.insertCell(0)
        cell.insertAdjacentHTML('beforeend', `
            <a  href='/comment?occupation=${occupationArray[i]}' 
                onclick="countForCharts('${occupationArray[i]}')"
            >${occupationArray[i]}
            </a><hr>`
        )
        listOccupations(i+1)
    }
}

const searchOccupations = function (i, j, input) {
    if (i < occupationArray.length && occupationArray[i].toLowerCase().includes(input.toLowerCase())) {
        var row = options.insertRow(j)
        var cell = row.insertCell(0)
        cell.insertAdjacentHTML('beforeend', `
            <a  href='/comment?occupation=${occupationArray[i]}' 
                onclick="countForCharts('${occupationArray[i]}')"
            >${occupationArray[i]}
            </a><hr>`
        )
        searchOccupations(i+1, j+1, input)
    } else if (i < occupationArray.length) {
        searchOccupations(i+1, j, input)
    }
}

const countForCharts = function (occupationName) {
    socket.emit('countUpMostViewed', occupationName)
}

$.event.special.inputchange = {
    setup: function () {
        var self = this, val
        $.data(this, 'timer', window.setInterval(function () {
            val = self.value
            if ($.data(self, 'cache') != val) {
                $.data(self, 'cache', val)
                $(self).trigger('inputchange')
            }
        }, 20))
    },
    teardown: function () {
        window.clearInterval($.data(this, 'timer'))
    },
    add: function () {
        $.data(this, 'cache', this.value)
    }
}

$('input').on('inputchange', function () {
    options.innerHTML = '<hr>'
    options.style.display = 'block'
    if (this.value.length !== 0) {
        searchOccupations(0, 0, this.value)
    } else {
        listOccupations(0)
    }
})

document.body.onclick = function (event) {
    if (event.target != input) {
        options.style.display = 'none'
    }
}