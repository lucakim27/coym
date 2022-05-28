(function showProfileModal() {

    var div = document.createElement('div')

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

    div.innerHTML = `
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">
                            ${getCookie('current-user')}
                        </h4>
                    </div>
                    <div class="modal-body">
                        <ul>
                            <li><a onclick="clickTab1()" id='tab1' style='color: black;'>Pending Friends Request</a></li>
                            <li>|</li>
                            <li><a onclick="clickTab2()" id='tab2' style='color: #337ab7;'>Settings</a></li>
                        </ul><hr style="width: 598px; margin-left: -15px;">
                        <center>
                            <div style="
                                height: 30vh;
                                min-width: 70%;
                                flex: 0;
                                background-color: rgb(235, 235, 235);
                                padding: 10px; 
                                border-radius: 5px;
                                overflow-y: scroll;"
                            >
                                <table id="pendingFriendsRequest" class="table table-striped header-fixed"></table>
                                <b id='settings' style='font-size: 30px; display: none;'></b>
                            </div>
                        </center>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default loginBtn" onclick="window.location.href='http://localhost:3000/login'">
                            Login
                        </button>
                        <form action="/logout" method="post" class='logoutForm'>
                            <button type="submit" value="logout" class="btn btn-default logoutBtn">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `

    if (getCookie('current-user') === "Login") {
        div.getElementsByClassName('logoutForm')[0].style.display = 'none'
    } else {
        div.getElementsByClassName('loginBtn')[0].style.display = 'none'
    }
    
    document.querySelector('body').appendChild(div)
})()

const clickTab1 = function() {
    $("#pendingFriendsRequest").show()
    $("#settings").hide()
    $("#tab1").css('color', 'black')
    $("#tab2").css('color', '#337ab7')
}

const clickTab2 = function() {
    $("#pendingFriendsRequest").hide()
    $("#settings").show()
    $("#tab1").css('color', '#337ab7')
    $("#tab2").css('color', 'black')
}
