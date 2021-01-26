var myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 5,
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
    });

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(queryUrl, function(data) {
    console.log(data);

    createFeatures(data.features);
});
// // Create map with leaflet to plot all of earthquakes based on lat and lon

// // Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
//     // Send the data.features object to createFeatures function
//     createFeatures(data.features);
// });

// function createFeatures(earthquakeData) {

//     // Define function to run for each feature in features array
//     // Create popup with place and time of earthquake
//     // function onEachFeature(feature, layer) {
//     //     layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" 
//     //     + new Date(feature.properties.time) + "</p>" );
//     // }
//     function onEachFeature(feature, layer) {
//         for (var i=0; i< earthquakes.length; i++) {
//             // Conditionals for earthquake size
//             var color = "";
//             if (earthquakes.)
//         }
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
//         id: "mapbox/streets-v11",
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



// Markers: should reflect the magnitude of earthquake and their size and color
// (Earthquakes with higher magnitudes larger and darker in color)


// Popups with additional information about the earthquake, on click

// Create a legend for context

