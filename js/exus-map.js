
//pseudocode...

//center map so that all offices and countries are within view
//load all offices
//load all countries with capacity
//when clicking on office, show tooltip with info

/*
Loading offices

- load CMS items onto WF page (as hidden or whatever), as long as they are in DOM
- loop through CMS items and pull relevant lat long etc fields into obj
- loop through obj / array and plonk markers on map







*/







//load map when DOM loaded, which means we can wait for jQuery
window.addEventListener('DOMContentLoaded', function() {

//initialize map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

//native location function, but this requires user consent
//mymap.locate({setView: true, maxZoom: 16});

//if IP API has found location, use this
if (latitude) {
	mymap.setView([latitude, longitude],13);
  }

//load tiles
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidGFtYXJpbmRvIiwiYSI6ImNraTRzaDkwdjNlcGcyenA1ZW1wYXZoYWoifQ.MEvZG-TX5jERN3Nmox1xkw'
}).addTo(mymap);


//load office locations from DOM
var exus = {};
exus.offices = [];
for (var i = 0; i < 10; i++) {
    exus.offices[i] = {};
    exus.offices[i].name;
    exus.offices[i].lat;
    exus.offices[i].long;
    exus.offices[i].email;
    exus.offices[i].tel;
    exus.offices[i].address;
}
exus.officemarkers = [];

//hard coded data for now
exus.offices[0].name = "Madrid";
exus.offices[0].lat = 40.4369629;
exus.offices[0].long = -3.6890079;
exus.offices[0].email = "xx@xx.com";
exus.offices[0].tel = "+ 34 910 149 184";
exus.offices[0].address = "Exus Management Partners, Paseo de la Castellana, 60, 3rd 28046 Madrid - Spain";

exus.offices[1].name = "Lisbon";
exus.offices[1].lat = 38.7237142;
exus.offices[1].long = -9.1646183;
exus.offices[1].email = "xx@xx.com";
exus.offices[1].tel = "+ 351 213 407 160";
exus.offices[1].address = "Exus Management Partners, Av. Eng. Duarte Pacheco, Amoreiras, Torre 2, 16 º piso, C, 1070-102 Lisboa, Portugal";

//loop through locs and add markers
for (var i = 0; i < exus.offices.length; i++) {
    var thisOffice = exus.offices[i]; 
    if (!thisOffice.name) continue; //skip item if no name set
    exus.officemarkers[i] = L.marker([thisOffice.lat, thisOffice.long]).addTo(mymap);
    exus.officemarkers[i].bindPopup(thisOffice.name);

}

//this adds sample states data    
//L.geoJson(statesData).addTo(mymap);

exus.stateObjs = [];

//new GeoJSON layer for states
var myStateLayer = L.geoJSON().addTo(mymap);

//would prefer that eD.states was a regular array so easier to loop
for (var key in exusData.states) {
    if (!exusData.states.hasOwnProperty(key)) continue;
    myStateLayer.addData(exusData.states[key]);
}
})






//sample add marker
//var marker = L.marker([51.5, -0.09]).addTo(mymap);

//sample add circle
/*var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

//sample polygon
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);*/

//sample popups
//marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
//circle.bindPopup("I am a circle.");
//polygon.bindPopup("I am a polygon.");

//popup not attached to marker
/*var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap);*/
    
//sample function
/*
function onMapClick(e) {
    popup2
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);*/



