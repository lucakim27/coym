function directPages(page) {
    if (getQueryVariable('socketid') == '' || getQueryVariable('socketid') == undefined) {
        document.location.href = 'http://localhost:3000/' + page
    } else {
        document.location.href = `http://localhost:3000/${page}?socketid=${getQueryVariable('socketid')}`
    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (decodeURIComponent(pair[0]) == variable) {
            if (decodeURIComponent(pair[1]).includes('+') == false) {
                return decodeURIComponent(pair[1])
            }
            else {
                return decodeURIComponent(pair[1].replaceAll('+', ' '))
            }
        }
    }
}