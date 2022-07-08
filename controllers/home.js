const majorArray = []
const options = document.getElementById('options')

for (var i = 0; i < options.rows.length; i++) {
    majorArray.push(options.rows[i].innerText.replaceAll('  ', '').replaceAll('\n', ''))
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
        socket.emit('join', getCookie('current-user'))
    }
} catch (error) {
    console.error(error)
}

const listMajors = function (i) {
    if (i < majorArray.length) {
        var row = options.insertRow(i)
        var cell = row.insertCell(0)
        cell.insertAdjacentHTML('beforeend', `
            <a  href='/comment?major=${majorArray[i]}' 
                onclick="countForCharts('${majorArray[i]}')"
            >${majorArray[i]}
            </a><hr>`
        )
        listMajors(i+1)
    }
}

const searchMajors = function (i, j, input) {
    if (i < majorArray.length && majorArray[i].toLowerCase().includes(input.toLowerCase())) {
        var row = options.insertRow(j)
        var cell = row.insertCell(0)
        cell.insertAdjacentHTML('beforeend', `
            <a  href='/comment?major=${majorArray[i]}' 
                onclick="countForCharts('${majorArray[i]}')"
            >${majorArray[i]}
            </a><hr>`
        )
        searchMajors(i+1, j+1, input)
    } else if (i < majorArray.length) {
        searchMajors(i+1, j, input)
    }
}

const countForCharts = function (majorName) {
    socket.emit('updateCount', majorName)
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
        searchMajors(0, 0, this.value)
    } else {
        listMajors(0)
    }
})

document.body.onclick = function (event) {
    if (event.target != input) {
        options.style.display = 'none'
    }
}