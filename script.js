// Initialize the map and set its center and zoom level
var map = L.map('map').setView([20, 0], 2); // [latitude, longitude], zoom level

// Use Mapbox tile layer (requires Mapbox access token)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    id: 'mapbox/streets-v11',  // Style name for English names
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2hhcmlzaCIsImEiOiJjbTUxYzZhaGUxYjljMmxwbXNlbmVnNGp2In0.4jkRik2JkDfFWg2xxnGYTQ'  // Replace with your Mapbox access token
}).addTo(map);

// Capture click event and get latitude and longitude
map.on('click', function(event) {
    var lat = event.latlng.lat;
    var lon = event.latlng.lng;
    console.log("Latitude: " + lat + ", Longitude: " + lon); // Output coordinates in console

    // Get timezone and current time for the clicked location
    getTimezoneAndTime(lat, lon);
});

// Function to fetch the timezone using latitude and longitude
function getTimezoneAndTime(lat, lon) {
    // GeoNames API URL for timezone
    var apiUrl = `http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=charish`; // Replace with your GeoNames username

    fetch(apiUrl)
        .then(response => response.json())  // Convert the response to JSON
        .then(data => {
            console.log(data);  // Log the response for debugging
            if (data && data.timezoneId) {
                var timezone = data.timezoneId;  // Get the timezone from the response
                // Now, fetch the current time using the timezone
                getCurrentTime(timezone);  // Call the next function to get current time
            } else {
                console.log("Timezone data not found.");
                alert("Failed to fetch timezone.");
            }
        })
        .catch(error => {
            console.error('Error fetching timezone data:', error);
            alert("Failed to fetch timezone.");
        });
}

// Function to get the current time using the timezone
function getCurrentTime(timezone) {
    var timeApiUrl = `http://worldtimeapi.org/api/timezone/${timezone}.json`;  // Use WorldTime API for current time

    fetch(timeApiUrl)
        .then(response => response.json())  // Convert to JSON
        .then(data => {
            console.log(data);  // Log the response for debugging
            if (data && data.datetime) {
                var currentTime = data.datetime;  // Get the current time from the response
                alert("Timezone: " + timezone + "\n\nCurrent Time: " + currentTime);
            } else {
                console.log("Current time data not found.");
                alert("Failed to fetch current time.");
            }
        })
        .catch(error => {
            console.error('Error fetching current time:', error);
            alert("Failed to fetch current time.");
        });
}

