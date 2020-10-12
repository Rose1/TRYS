/*-----------Hour function-------------*/
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
/*---------------menu responsive function---------------*/
function hamburgerMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

/*----------MAP---------- */

var myMap = L.map('mapid').setView([51.505, -0.09], 13)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(myMap);


//  Modal monitoring vehicle
// get the modal
var modalConsultVehicle = document.getElementById("modalMonitoringVehicle");

// get the button that opens the modal
var btnModalConsultVehicle = document.getElementById("btnOpenModal");

// get the <span> element that closesthe modal
var span1 = document.getElementById("close1");

// button.click
btnModalConsultVehicle.onclick = function() {
    modalConsultVehicle.style.display = "block";
}

// close modal
span1.onclick = function() {
    modalConsultVehicle.style.display = "none";
}

// when the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalConsultVehicle) {
        modalConsultVehicle.style.display = "none";
    }
}