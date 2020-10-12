/*----------Hour function----------*/

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

/*----------responsive menu function-------------*/

function hamburgerMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

/*----------------MODAL----------------*/
//  Modal consult vehicle
// get the modal
var modalVehicleQuery = document.getElementById("modalVehicleQuery");

// get the button that opens the modal
var btnModalVehicleQuery = document.getElementById("btnOpenModal");

// get the <span> element that closesthe modal
var span1 = document.getElementById("close1");

// button.click
btnModalVehicleQuery.onclick = function() {
    modalVehicleQuery.style.display = "block";
}

// close modal
span1.onclick = function() {
    modalVehicleQuery.style.display = "none";
}

// when the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalVehicleQuery) {
        modalVehicleQuery.style.display = "none";
    }
}

/**/