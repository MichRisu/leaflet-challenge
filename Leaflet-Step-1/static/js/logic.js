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

function quakeColor(magnitude) {
    if (magnitude >= 5) {
        return '#cd0000'
    }
    else if (magnitude >= 4) {
        return '#ffa500'
    }
    else if (magnitude >= 3) {
        return '#cdcd00'
    }
    else if (magnitude >= 2) {
        return '#ffdab9'
    }
    else if (magnitude >= 1) {
        return '#98fb98'
    }
}

function renderCircles(data) {
    var earthquakes = data.features
    console.log(earthquakes);

    var eqMarkers = []

    for (var i=0; i < earthquakes.length; i++) {
        var earthquake = earthquakes[i]
        var eqMarker = L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
            fillOpacity: 0.75,
            color: "black",
            weight: .5,
            fillColor: quakeColor(earthquake.properties.mag),
            radius: earthquake.properties.mag * 20000
        }).bindPopup("<h3>" + "Location: " + earthquake.properties.place + "</h4><hr><p>" + 
            "Magnitude: " + (earthquake.properties.mag) + "</p>");
        eqMarkers.push(eqMarker);
    }

    var map = createMap(L.layerGroup(eqMarkers));

    createLegend(map);

};

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(queryUrl, renderCircles);

function createLegend(map) {
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var legendLayers = ['0-1', '1-2', '2-3', '3-4', '4-5', '5+']
        var legendColors = [
            '#98fb98',
            '#ffdab9',
            '#cdcd00',
            '#ffa500',
            '#cd0000',
            '#000080']
        var labels = [];
        
        for (var i = 0; i < legendLayers.length; i++) {
            labels.push(
            "<i style='background: " + legendColors[i] + "'></i> " + labels[i]
            );
        }
        div.innerHTML = labels.join("<br>");
            return div;
    };
    legend.addTo(map);
};


// Markers: should reflect the magnitude of earthquake and their size and color
// (Earthquakes with higher magnitudes larger and darker in color)


// Popups with additional information about the earthquake, on click

// Create a legend for context

// ---------------This works....  basic... ------------------- //
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// // Create map with leaflet to plot all of earthquakes based on lat and lon

// // Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
//     // Send the data.features object to createFeatures function
//     createFeatures(data.features);
// });

// function createFeatures(earthquakeData) {

//     // Define function to run for each feature in features array
//     // Create popup with place and time of earthquake
//     function onEachFeature(feature, layer) {
//         layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" 
//         + new Date(feature.properties.time) + "</p>" );
//     }

//     // Create GeoJson layer containing the features array on earthquakeData object
//     // Use onEachFeature function for each piece of data in the array
//     var earthquakes = L.geoJSON(earthquakeData, {
//         onEachFeature: onEachFeature
//     });

//     // Send earthquakes layer to createMap function
//     createMap(earthquakes);
// }

// function createMap(earthquakes) {
//     // Define streetmap and darkmap layers
//     var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//         tileSize: 512,
//         maxZoom: 18,
//         zoomOffset: -1,
//         id: "mapbox/outdoors-v11",
//         accessToken: API_KEY
//       });
    
//       var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//         maxZoom: 18,
//         id: "dark-v10",
//         accessToken: API_KEY
//       });
    
//     //  Define baseMaps object to hold base layers
//     var baseMaps = {
//         "Street Map": streetmap,
//         "Dark Map": darkmap
//     };

//     // Create overlay object to hold overlay layer
//     var overlayMaps = {
//         Earthquakes: earthquakes 
//     };

//     // Create map, giving it streetmap and earthquakes layer to display on load
//     var myMap = L.map("map", {
//         center: [
//             37.09, -95.71
//         ],
//         zoom: 5,
//         layers: [streetmap, earthquakes]
//     });

//     // Create layer control, pass baseMaps and overlayMaps, and add layer control
//     L.control.layers(baseMaps, overlayMaps, {
//         collapsed: false
//     }).addTo(myMap);
// }