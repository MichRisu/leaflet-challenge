// Setup initial map 
function createMap(earthquakeData) {
    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/outdoors-v11",
        accessToken: API_KEY
      });
    
      var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
      });
    
    //  Define baseMaps object to hold base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };

    // Create overlay object to hold overlay layer
    var overlayMaps = {
        Earthquakes: earthquakeData
    };

    // Create map, giving it streetmap and earthquakes layer to display on load
    var map = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, earthquakeData]
    });

    // Create layer control, pass baseMaps and overlayMaps, and add layer control
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

    return map;
}
// function createMap(earthquakeData) {
//     // Add tile layer
//     var streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//             attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//             tileSize: 512,
//             maxZoom: 18,
//             zoomOffset: -1,
//             id: "mapbox/outdoors-v11",
//             accessToken: API_KEY
//         });

//     var map = L.map("map", {
//         center: [
//             37.09, -95.71
//         ],
//         zoom: 5,
//     });

//         return map;
// }

// Create function to get colors for circle markers
function getColor(magnitude) {
    switch (true) {
        case magnitude > 5: 
            return '#cd0000';
        case magnitude > 4:
            return '#ffa500';
        case magnitude > 3:
            return '#cdcd00';
        case magnitude > 2:
            return '#ffdab9';
        case magnitude > 1:
            return '#98fb98';
        default:
            return '#000080';

    }
}

// Create function to render circles marker size by magnitude
function renderCircles(data) {
    var earthquakes = data.features
   
    console.log(earthquakes);

    var eqMarkers = []
    // Loop through earthquakes to retrieve location and magnitude
    for (var i=0; i < earthquakes.length; i++) {
        var earthquake = earthquakes[i]
        var eqMarker = L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
            fillOpacity: 0.75,
            color: "black",
            weight: .5,
            fillColor: getColor(earthquake.properties.mag),
            radius: earthquake.properties.mag * 20000
        }).bindPopup("<h3>" + "Location: " + earthquake.properties.place + "</h4><hr><p>" + 
            "Magnitude: " + (earthquake.properties.mag) + "</p>");
        eqMarkers.push(eqMarker);
    }

    var map = createMap(L.layerGroup(eqMarkers));

    createLegend(map);

};

// Create url variable for API
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Get the data with d3 and execute renderCircles function
d3.json(queryUrl, renderCircles);

// Create function for legend
function createLegend(map) {
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "info legend"),
            grades = [0,1,2,3,4,5],
            labels = [];
        for (var i=0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i]+1) + 
                '"></i>' + grades[i] + (grades[i+1] ? '&ndash;' + grades[i+1] +
                '<br>' : '+');
        }
        
        return div;
    };
    legend.addTo(map);

};

