    
    // var queryUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=44.983758,-93.180473&radius=1500&type=restaurant&key=AIzaSyAUCRBjRZyAYWMlrjubm_7G1B5m6468KTc";    
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 93.265, lng: 44.977},
          zoom: 14
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var marker = new google.maps.Marker({
                position: pos,
                title: "You are here"
        
              });
              marker.setMap(map);
            //create radius from a location bias from api
            //pull restaurant from Query URL 
            //create another geolocation for restaurant marker - drop marker
            //confirm or deny restaurant location via button
            //pull random restaurant from array Query URL if denied 
            //poly line creates line between location and restaurant 
            infoWindow.setPosition(pos);
            infoWindow.setContent();
            // infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

     

    //   $.ajax({
    //     url: queryURL,
    //     method: 'GET'
    // })
    // .done(function(response) {
        

    //     console.log(queryURL);

    //     console.log(response);
    
    