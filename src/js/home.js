const occupationArray = []
var occupationTable = document.getElementById("occupationTable")

function getCookie(cname) {
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

socket.on('userEnter', (array) => {
    pushOccupationArray(array, 0)
    listOccupations(0)
    try {
        if ($('#signIn').html() === 'Sign in') {
        } else {
            socket.emit('addOnlineUser', getCookie('current-user'))
        }
    } catch (error) {
        console.error(error);
    }
})

const pushOccupationArray = function(array, i) {
    if (i < array.length) {
        occupationArray.push(array[i])
        pushOccupationArray(array, i+1)
    }
}

const listOccupations = function(i) {
    if (i < occupationArray.length) {
        var row = occupationTable.insertRow(i)
        var cell = row.insertCell(0)
        cell.insertAdjacentHTML('beforeend', `
            <a  href='/comment?occupation=${occupationArray[i][0]}' 
                onclick="countForCharts('${occupationArray[i][0]}')"
            >${occupationArray[i][0]}
            </a><hr>`
        )
        listOccupations(i+1)
    }
}

const searchOccupations = function(i, j, input) {
    if (i < occupationArray.length && occupationArray[i][0].toLowerCase().includes(input.toLowerCase())) {
        var row = occupationTable.insertRow(j)
        var cell = row.insertCell(0)
        cell.insertAdjacentHTML('beforeend', `
            <a  href='/comment?occupation=${occupationArray[i][0]}' 
                onclick="countForCharts('${occupationArray[i][0]}')"
            >${occupationArray[i][0]}
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
    setup: function() {
        var self = this, val
        $.data(this, 'timer', window.setInterval(function() {
            val = self.value
            if ( $.data( self, 'cache') != val ) {
                $.data( self, 'cache', val )
                $( self ).trigger( 'inputchange' )
            }
        }, 20))
    },
    teardown: function() {
        window.clearInterval( $.data(this, 'timer') )
    },
    add: function() {
        $.data(this, 'cache', this.value)
    }
};

$('input').on('inputchange', function() {
    occupationTable.innerHTML = ''
    if (this.value.length !== 0) {
        searchOccupations(0, 0, this.value)
    } else {
        listOccupations(0)
    }
})
    