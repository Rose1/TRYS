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

//*---------------menu responsive function---------------*/
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

/*-------------MODAL-----------*/
//  Modal add station
var modalAddStation = document.getElementById("modalAddStation");
var btnModalAddStation = document.getElementById("btnOpenModal");
var span6 = document.getElementById("close1");
btnModalAddStation.onclick = function() {
    modalAddStation.style.display = "block";
}
span6.onclick = function() {
    modalAddStation.style.display = "none";
}

//  Modal send configuration

var modalSendInitialConfiguration = document.getElementById("modalSendInitialConf");
var btnModalSendInitialConfiguration = document.getElementById("btnModalInitialConf");
var span1 = document.getElementById("close2");
btnModalSendInitialConfiguration.onclick = function() {
    modalSendInitialConfiguration.style.display = "block";
}
span1.onclick = function() {
    modalSendInitialConfiguration.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modalSendInitialConfiguration) {
        modalSendInitialConfiguration.style.display = "none";
    }
}

//  Modal  SendControlPoints
var modalSendControlPoints = document.getElementById("modalSendControlPoints");
var btnModalSendControlPoints = document.getElementById("btnModalControlPoints");
var span2 = document.getElementById("close3");
btnModalSendControlPoints.onclick = function() {
    modalSendControlPoints.style.display = "block";
}
span2.onclick = function() {
    modalSendControlPoints.style.display = "none";
}

//  Modal  reset
var modalReset = document.getElementById("modalSendReset");
var btnModalReset = document.getElementById("btnModalReset");
var span4 = document.getElementById("close4");
btnModalReset.onclick = function() {
    modalReset.style.display = "block";
}
span4.onclick = function() {
    modalReset.style.display = "none";
}

//  Modal  change vehicle number
var modalChangeVehicleNumber = document.getElementById("modalChangeNro");
var btnModalChangeVehicleNumber = document.getElementById("btnModalChangeNro");
var span5 = document.getElementById("close5");
btnModalChangeVehicleNumber.onclick = function() {
    modalChangeVehicleNumber.style.display = "block";
}
span5.onclick = function() {
    modalChangeVehicleNumber.style.display = "none";
}

//  Modal send station
var modalSendTariff = document.getElementById("modalSendStations");
var btnModalSendTariff = document.getElementById("btnModalSendStations");
var span3 = document.getElementById("close6");
btnModalSendTariff.onclick = function() {
    modalSendTariff.style.display = "block";
}
span3.onclick = function() {
    modalSendTariff.style.display = "none";
}


//  Modal send station
var modalSendStation = document.getElementById("modalSendStation");
var btnModalSendStation = document.getElementById("btnOpenModalSendStations");
var span7 = document.getElementById("close7");
btnModalSendStation.onclick = function() {
    modalSendStation.style.display = "block";
}
span7.onclick = function() {
    modalSendStation.style.display = "none";
}