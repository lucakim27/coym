// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }

// window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//         var dropdowns = document.getElementsByClassName("dropdown-content")
//         for (var i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i]
//             if (openDropdown.classList.contains('show')) {
//                 openDropdown.classList.remove('show')
//             }
//         }
//     }
// }


function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
  
  function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }