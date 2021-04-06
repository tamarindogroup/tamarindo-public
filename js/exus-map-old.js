
//move this code into the WF embed on completion ***
//update CMS for states so state's parent country name exactly matches country name



//not currently using this location script since we want to just load all content in map view at the start
//this needs tidying up
var latitude;
var longitude;
function geoip(json){
    latitude = json.latitude;
    longitude = json.longitude;
    console.log("latitude is " + latitude);
    }







//load map when DOM loaded, which means we can wait for jQuery
window.addEventListener('DOMContentLoaded', function() {

    //define our energy types
    exusData.energyTypes = exusData.energyTypes || ["Wind", "Solar", "Biomass", "Hydro"];

    //lookup obj for countries to avoid looping through countries arr lots of times
    var countriesLookup = {};
    for (let i = 0; i < exusData.countries.length; i++) {
        countriesLookup[exusData.countries.properties.name] = exusData.countries[i];
    }

    //Loop through states with data and append them to their parent country - currently using countryID as the key to match by
    for (let i = 0; i < exusData.states.length; i++) {
        var myState = exusData.states[i];
        if(!myState.properties.countryID) continue; //if no countryID assigned, skip this state
        if(countriesLookup[myState.properties.countryID]) { //if a country with this countryID exists
            countriesLookup[myState.properties.countryID].properties.states || []; //create arr if does not exist
            countriesLookup[myState.properties.countryID].properties.states.push(myState); //add state to country
            console.log(myState.properties.name + " matched to " + countriesLookup[myState.properties.countryID])
        }
    }





    //initialize map
    //var map = L.map('mapid').setView([51.505, -0.09], 2); //this needs to be not hard coded ***

    var map = L.map('map', //reference the id of the HTML element to hold this map
        {
            attributionControl: false
        }) 

    //native location function, but this requires user consent, which is BAD UX.
    //map.locate({setView: true, maxZoom: 16});

    //if IP API has found location, use this - unclear if this is working ***
    // if (latitude) {
    // 	map.setView([latitude, longitude],2);
    //     console.log("Found location: " + latitude + ", " + longitude)
    // }

    //load tiles - check account access for client for this ***
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidGFtYXJpbmRvIiwiYSI6ImNraTRzaDkwdjNlcGcyenA1ZW1wYXZoYWoifQ.MEvZG-TX5jERN3Nmox1xkw'
    }).addTo(map);


    //custom marker pin
    var officeIcon = L.icon({
        iconUrl: 'https://uploads-ssl.webflow.com/5fc51706f820e1f30a3d5ec9/6009f6760cb9aa7941c2a0db_exus-icon-pin-02.png',
        shadowUrl: 'https://uploads-ssl.webflow.com/5fc51706f820e1f30a3d5ec9/6009f01da1ed9aa45b97a43b_exus-icon-pin-shadow-02.png',
        iconSize: [36, 64], // size of the icon
        shadowSize: [53, 34], // size of the shadow
        iconAnchor:   [18, 64], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 34],  // the same for the shadow
        popupAnchor:  [0, -68] // point from which the popup should open relative to the iconAnchor
        });

    //array to hold office markers
    exusData.officemarkers = [];
    //are we using this? ***
    exusData.officeCounter = 0;

    //get office markers
    /*
    all fields are loaded into the exusData object by the Webflow embed script, but we can't load the address properly if it contains line breaks.
    Instead we load the address from a hidden text element in the DOM. A sibling text element contains the office name, which we can match against.
    */

    //first get all elements in DOM with the office name class
    var officeNameElArr = document.querySelectorAll(".data-text--office-name");

    //loop through offices
    for (var office in exusData.offices) {
        if (exusData.offices.hasOwnProperty(office)) {
            var myOffice = exusData.offices[office];
            //loop through office name elements
            for (let i = 0; i < officeNameElArr.length; i++) {
                //if the name of the office in the DOM element matches our current office
                if(officeNameElArr[i].innerHTML == office) { 
                    //get the sibling element which we hope contains the address text. Check it has the right class. 
                    var officeAddressEl = officeNameElArr[i].nextElementSibling;
                    while (officeAddressEl) {
                        if (officeAddressEl.matches(".data-text--office-address")) break;
                        officeAddressEl = officeAddressEl.nextElementSibling;
                    }
                }
            }
            //update exusData obj with address
            myOffice.address = officeAddressEl.innerHTML;
            //convert string coords to latlong array - unclear if necessary ***
            myOffice.latlong = L.latLng(myOffice.latitude, myOffice.longitude);

            //popup v2
            exusData.officePopup = "<div class='exus-popup__content'><div class='exus-popup__head'>" + myOffice.name + "</div><a href='/contact' class='exus-popup__link'>Contact</a></div>";
            exusData.customPopupOptions = {
                'maxWidth': '500',
                'className': 'exus-popup'
            }

            //put a pin in it and bind popup ***
            // myOffice.marker = L.marker(myOffice.latlong, {icon: officeIcon}).bindPopup(myOffice.name);
            myOffice.marker = L.marker(myOffice.latlong, {icon: officeIcon}).bindPopup(exusData.officePopup, exusData.customPopupOptions);
            //also push this marker into an array
            exusData.officemarkers.push(myOffice.marker);

        }
    }

    //create layer group for office markers (think this is just a layer, but is a group of markers)
    exusData.layers = {};
    exusData.layers.offices = L.layerGroup(exusData.officemarkers).addTo(map);

    //create feature group for getting the bounds of all markers (seems unecessary to have to do this as well as a layer group...)
    var myFeatureGroup = L.featureGroup(exusData.officemarkers);
    //console.log(myFeatureGroup)

    map.fitBounds(myFeatureGroup.getBounds().pad(0.05)); //https://stackoverflow.com/questions/16845614/zoom-to-fit-all-markers-in-mapbox-or-leaflet


    //****************************************//
    //custom control for holding capacity information about country
    exusData.capControl = L.control(
        {
            position: 'bottomleft'
        });

    //create control
    exusData.capControl.onAdd = function (map) {
        //parent div
        this.div = L.DomUtil.create("div", "capControl");
        //heading
        this.name = L.DomUtil.create("div", "capControl__name", this.div); //header obj
            this.name.innerHTML = "Select a country to see capacity";
        //total capacity
        this.capacity = L.DomUtil.create("div", "capControl__cap", this.div); //capacity obj
            this.capacity.style.display="none"; //hide capacity for the moment
        //create elements for each capacity type
        for(let i = 0; i < exusData.energyTypes.length; i++) {
            this["capacityRow_" + exusData.energyTypes[i]] = L.DomUtil.create("div", "capControl__capRow", this.div);
            this["capacityType_" + exusData.energyTypes[i]] = L.DomUtil.create("div", "capControl__capRow__type", this["capacityRow_" + exusData.energyTypes[i]]);
            this["capacityValue_" + exusData.energyTypes[i]] = L.DomUtil.create("div", "capControl__capRow__value", this["capacityRow_" + exusData.energyTypes[i]]);
            this["capacityRow_" + exusData.energyTypes[i]].style.display="none"; //hide row for the moment
        }
        //button to see child states
        this.button = L.DomUtil.create("div", "capControl__btn", this.div); //button obj
        //this.update(); //don't think any point update yet as we don't have a country yet
        return this.div; //onAdd() must return an instance of HTML Element representing the control
    }

    //update control when a state or country is clicked on
    exusData.capControl.update = function (countryOrState) {
        if(countryOrState) {
            this.name.innerHTML = countryOrState.name;
            this.capacity.innerHTML = countryOrState.capacityTotal + " MW";
            this.capacity.style.display=""; //show
            for(let i = 0; i < exusData.energyTypes.length; i++) {
                this["capacityRow_" + exusData.energyTypes[i]].style.display=""; //show
                this["capacityType_" + exusData.energyTypes[i]].innerHTML = exusData.energyTypes[i];
                this["capacityValue_" + exusData.energyTypes[i]].innerHTML = countryOrState["capacity" + exusData.energyTypes[i]] + " MW";
            }
            this.button.innerHTML = "See states";
            //if(countryOrState)
        }
    }

    //add to map
    exusData.capControl.addTo(map);
    //****************************************//



    //styling function
    function styleStates(feature) {
        return {
            fillColor: "#009cb8",
            weight: 2,
            opacity: 1,
            color: 'white',
            //dashArray: '3',
            fillOpacity: 0.7
        };
    }



    //interactivity

    //on mouseover
    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    //mouseout
    function resetHighlightState(e) {
        var layer = e.target;
        //exusData.layers.states.resetStyle(e.target);
        exusData.layers.states.setStyle(styleStates); //this is wrong, really the reset is the way to go, but it keeps resetting to the default style.
    }
    function resetHighlightCountry(e) {
        var layer = e.target;
        //exusData.layers.countries.resetStyle(e.target);
        exusData.layers.countries.setStyle(styleStates);
        //put states back on top
        exusData.layers.states.bringToFront();
    }

    //click to zoom
    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    //function for country click
    function clickOnCountry(e) {
        //zoom to country
        zoomToFeature(e);
        //hide offices
        map.removeLayer(exusData.layers.offices);
        //update control. This passes a properties obj back to update function for control element
        exusData.capControl.update(e.target.feature.properties);
    }

    //for the reset to work, define before listeners and then assign layer afterwards (unclear why...)
    //var geojson;

    //listeners
    function onEachFeatureState(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlightState,
            click: zoomToFeature
        });
    }

    function onEachFeatureCountry(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlightCountry,
            click: clickOnCountry
        });
    }

    // geojson = L.geoJson(statesData, {
    //     style: style,
    //     onEachFeature: onEachFeature
    // }).addTo(map);







    //*******
    //create layers and pass data


    //new GeoJSON layers for states and countries
    exusData.layers.states = L.geoJSON(
        false, //no data yet
        {
            onEachFeature: onEachFeatureState
        });//don't add states layer yet

    exusData.layers.countries = L.geoJSON(
        false, //no data yet
        {
            onEachFeature: onEachFeatureCountry
        }).addTo(map);


    //add geojson objects to layers

    //would prefer that eD.states was a regular array so easier to loop
    for (var key in exusData.states) {
        if (!exusData.states.hasOwnProperty(key)) continue;
        exusData.layers.states.addData(exusData.states[key]);
    }

    for (var key in exusData.countries) {
        if (!exusData.countries.hasOwnProperty(key)) continue;
        exusData.layers.countries.addData(exusData.countries[key]);
    }

    //at the moment both layers the same col, will change
    exusData.layers.states.setStyle(styleStates);
    exusData.layers.countries.setStyle(styleStates);

    //we could have defined this second, but just to demonstrate method
    exusData.layers.states.bringToFront();

    //create obj containing all layers we wish to control, and add a control element. If layer has already been added to map, this will be autoticked.
    var overlayMaps = {
        "States": exusData.layers.states,
        "Countries": exusData.layers.countries,
        "Offices": exusData.layers.offices
    };
    var layerControl = L.control.layers(null, overlayMaps, {collapsed: false}).addTo(map);
    //layerControl.collapsed = false;


    //hide/show layers on zoom levels - unclear if we need to do this though ***
    map.on('zoomend', function() {
        console.log("Zoom level " + map.getZoom());
        if (map.getZoom() <= 8) {
            //if (map.hasLayer(exusData.layers.states)) map.removeLayer(exusData.layers.states);
        }
        else {
        }
    });




})









