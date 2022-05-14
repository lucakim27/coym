(function showProfileModal() {

    var div = document.createElement('div')
    var name

    if ($("#userId").text() === 'Login') {
        name = "You're not logged in."
    } else {
        name = $("#userId").text()
    }

    div.innerHTML = `
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">
                            ${name}
                        </h4>
                    </div>
                    <div class="modal-body">
                        <ul>
                            <li><a onclick="clickTab1()" id='tab1' style='color: red;'>Pending Friends Request</a></li>
                            <li>|</li>
                            <li><a onclick="clickTab2()" id='tab2'>Settings</a></li>
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

    if ($("#userId").text() === "Login") {
        div.getElementsByClassName('logoutForm')[0].style.display = 'none'
    } else {
        div.getElementsByClassName('loginBtn')[0].style.display = 'none'
    }
    
    document.querySelector('body').appendChild(div)
})()

const clickTab1 = function() {
    $("#pendingFriendsRequest").show()
    $("#settings").hide()
    $("#tab1").css('color', 'red')
    $("#tab2").css('color', '#337ab7')
}

const clickTab2 = function() {
    $("#pendingFriendsRequest").hide()
    $("#settings").show()
    $("#tab1").css('color', '#337ab7')
    $("#tab2").css('color', 'red')
}
