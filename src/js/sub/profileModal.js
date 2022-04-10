(function showProfileModal() {

    var div = document.createElement('div')

    div.innerHTML = `
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">${$("#userId").text()}</h4>
                    </div>
                    <div class="modal-body">
                        <p>Some text in the modal.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default loginBtn" onclick="window.location.href='http://localhost:3000/login'">
                            Login
                        </button>
                        <form action="/logout" method="post" class='logoutForm'>
                            <button type="submit" value="logout" class="btn btn-default">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `

    if ($("#userId").text() === 'anonymous') {
        div.getElementsByClassName('logoutForm')[0].style.display = 'none'
    } else {
        div.getElementsByClassName('loginBtn')[0].style.display = 'none'
    }

    document.querySelector('body').appendChild(div)

})()
  