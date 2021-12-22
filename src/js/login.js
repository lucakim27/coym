function register() {
    if (document.getElementById("email").value.includes("@") == false ) {
        alert("Your email should contain @.")
    }
    else if (document.getElementById("email").value.length < 5) {
        alert("Your email should contain more than 5 characters.")
    }
    else if (document.getElementById("password").value.length < 5) {
        alert("Your password should contain more than 5 characters.")
    }
    else if (document.getElementById("password").value != document.getElementById("repeatPassword").value) {
        alert("Your passwords aren't matching.")
    }
    else {
        document.getElementById("myForm2").style.display = "none"
        document.getElementById("myForm3").style.display = "block"
        document.getElementById("form-container").innerHTML = ""
        document.getElementById("form-container").innerHTML += "The code is sent to ("+ document.getElementById("email").value + ")</p>"
        document.getElementById("form-container").innerHTML += "<label><b>Code</b></label><input id='code' type='code' placeholder='Enter your code here'>"
        document.getElementById("form-container").innerHTML += "<button type='submit' class='btn' onclick='authenticate()'>Authenticate</button>"
        document.getElementById("form-container").innerHTML += "<button type='button' class='btn cancel' onclick='closeEmailAuthenticationForm()'>Close</button>"        
    }
}

function authenticate() {
    console.log(document.getElementById("code").value)
    console.log(document.getElementById("email").value)
    console.log(document.getElementById("password").value)
}

function openForm() {
    document.getElementById("myForm1").style.display = "block"
}

function openRegisterForm() {
    document.getElementById("myForm2").style.display = "block"
}

function closeForm() {
    document.getElementById("myForm1").style.display = "none";
}

function closeRegisterForm() {
    document.getElementById("myForm2").style.display = "none"
}

function closeEmailAuthenticationForm() {
    document.getElementById("myForm3").style.display = "none"
}
