/*var btnBurgerMenu = document.getElementById('btnBurgerMenu');
var nav = document.getElementById('navbarMenu');

btnBurgerMenu.addEventListener('click', function() {
    nav.classList.toggle('is-active');
})*/


/* function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
} */
(function() {
    function formatTime(n) {
        return (n < 10) ? "0" + n : n;
    };

    function checkTime() {
        var today = new Date(),

            h = formatTime(today.getHours()),
            min = formatTime(today.getMinutes()),
            seg = formatTime(today.getSeconds()),
            hour = h
        document.getElementById("box-time").innerHTML = hour + ":" + min + ":" + seg;

        var d = setTimeout(function() {
            checkTime()
        }, 500);
    };

    checkTime();
})();

function hamburgerMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}