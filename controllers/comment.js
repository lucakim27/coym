const getQueryVariable = function (variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (decodeURIComponent(pair[0]) == variable) {
            if (decodeURIComponent(pair[1]).includes('+') == false) {
                return decodeURIComponent(pair[1])
            } else {
                return decodeURIComponent(pair[1].replaceAll('+', ' '))
            }
        }
    }
}

const animateText = function (text) {
    var value = '<h1 id="header" class="waviy" style="color: black;">'
    for (var i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            value += '<span style="--i:' + (i + 1).toString() + '">-' + '</span>'
        } else {
            value += '<span style="--i:' + (i + 1).toString() + '">' + text[i] + '</span>'
        }
    }
    value += '</h1>'
    return value
}

$("#majorTitle").html(animateText(getQueryVariable('major')))
$('#commentCenterTag').append(`<div id='${getQueryVariable('major').replaceAll(' ', '-')}' style="height: 800px; overflow-y: scroll"></div>`)

try {
    if ($('#signIn').html() !== 'Sign in') {
        socket.emit('join', getCookie('current-user'))
    }
} catch (error) {
    console.error(error)
}

const commentsTable = document.getElementById('commentsArea')

const appendComments = function (array) {

 
     var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
 
     for (let index = 0; index < array.length; index++){
         tableRef.insertRow().innerHTML = 
         "<th scope='row'>" + `<a>${array[index].username}</a>` + "</th>" + 
         "<td>" + array[index].comment + "</td>"+
         "<td>" + array[index].date.slice(0, 10) + "</td>" +
         "<td>" + `<p id='${array[index].comment}'> 0 </p>` + "</td>" + 
         "<td>" + `<button id='${array[index].comment}' onClick='like(this.id)'> Likes </button>` + "</td>";
     }
}

const comments = JSON.parse(document.getElementById('comments').innerHTML)[0]
appendComments(comments)
   

const like = function (comment) {
    if (getCookie('current-user') == '') {
        toastr.error('You are not logged in...')
        return 0
    } else {
        socket.emit('updateLike',
            comment,
            getCookie('current-user'),
            getQueryVariable('major')
        )
        toastr.success('Successfully liked...')
    }
}

var container = {}
const renderLikes = function (array) {
    for (var i = 0; i < array.length; i++) {
        if (container[array[i].comment] === undefined) {
            container[array[i].comment] = 1
        } else {
            container[array[i].comment]++
        }
    }
    Object.keys(container).forEach(key => {
        $(`#${key}`).html(`${container[key]}`)
    })
}

const updateLikes = function (newArray) {

    var newContainer = {}

    for (var i = 0; i < newArray.length; i++) {
        if (newContainer[newArray[i].comment] === undefined) {
            newContainer[newArray[i].comment] = 1
        } else {
            newContainer[newArray[i].comment]++
        }
    }

    if (Object.keys(container).length > Object.keys(newContainer).length) {
        Object.keys(container).forEach(key => {
            if (container[key] !== newContainer[key]) {
                $(`#${key}`).html(`${(newContainer[key] === undefined) ? 0 : newContainer[key]} Likes`)
            }
        })
    } else {
        Object.keys(newContainer).forEach(key => {
            if (container[key] !== newContainer[key]) {
                $(`#${key}`).html(`${(newContainer[key] === undefined) ? 0 : newContainer[key]} Likes`)
            }
        })
    }

    container = newContainer
}

const likes = JSON.parse(document.getElementById('likes').innerHTML)[0]
renderLikes(likes)

$('#commentBtn').click(function () {
    if ($('#userInput').val() === '') {
        toastr.error('You have not typed anything yet...')
        return 0
    } else if (confirm("Are you sure you wanna comment?")) {
        socket.emit('updateComment',
            getCookie('current-user'),
            $('#userInput').val(),
            getQueryVariable('major')
        )
    }
    $('#userInput').val('')
    toastr.success('Successfully commented...')
})

socket.on('updatedLikes', (array) => {
    console.log('updatedLikes')
    console.log(JSON.parse(array)[0])
})

socket.on('updatedComment', (array) => {
    console.log('updatedComment')
    console.log(JSON.parse(array)[0])
})