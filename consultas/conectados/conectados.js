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

/*-------------modal-----------------*/
//  Modal consult vehicle
// get the modal
var modalVehicleAssistance = document.getElementById("modalVehicleConnected");

// get the button that opens the modal
var btnModalVehicleAssistance = document.getElementById("btnOpenModal");

// get the <span> element that closesthe modal
var span1 = document.getElementById("close1");

// button.click
btnModalVehicleAssistance.onclick = function() {
    modalVehicleAssistance.style.display = "block";
}

// close modal
span1.onclick = function() {
    modalVehicleAssistance.style.display = "none";
}

// when the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalVehicleAssistance) {
        modalVehicleAssistance.style.display = "none";
    }
}