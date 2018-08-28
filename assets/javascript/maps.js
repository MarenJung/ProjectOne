window.onload = getMyLocation; 




  // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyCRWWf-p1-d4RxyL6fG2KQ9UnQcP-kcgpk",
//     authDomain: "project-one-minstp201806fsf5.firebaseapp.com",
//     databaseURL: "https://project-one-minstp201806fsf5.firebaseio.com",
//     projectId: "project-one-minstp201806fsf5",
//     storageBucket: "project-one-minstp201806fsf5.appspot.com",
//     messagingSenderId: "683353945429"
//   };
//   firebase.initializeApp(config);


var map; 
function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation);
    } else {
        alert("Oops, no geolocation support");
    }
}

function displayLocation(position) {
    var latitude = position.coords.latitude; 
    var longitude = position.coords.longitude;
    
    var latLng = new google.maps.LatLng(latitude, longitude);

    showMap(latLng);
    
    addNearByPlaces(latLng);
    apiMarkerCreate(latLng);
}

function showMap(latLng) {
    var mapOptions = {
        center: latLng,
        zoom: 14, 
        mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    map = new google.maps.Map(document.getElementById('mapHere'), mapOptions);
}

function addNearByPlaces(latLng) {

    var nearByService = new google.maps.places.PlacesService(map);

    var request = {
        location: latLng,
        radius: 10936,
        types: ['restaurant']
    };

    nearByService.nearbySearch(request, searchNearBy);
}

function searchNearBy(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            apiMarkerCreate(place.geometry.location, place);
        }

    }
}

function apiMarkerCreate(latLng, placeResult) {
    var markerOptions = {
        position: latLng, 
        map: map, 
        animation: google.maps.Animation.DROP,
        clickable: true
    }
    var marker = new google.maps.Marker(markerOptions);

}

function windowInfoCreate(marker, latLng, content) {
    var infoWindowOptions = {
        content: content,
        position: latLng
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    google.maps.event.addListener(marker, "click", function() {
        infoWindow.open(map);
    
    });

}