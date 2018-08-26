    
    // var queryUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=44.983758,-93.180473&radius=1500&type=restaurant&key=AIzaSyAUCRBjRZyAYWMlrjubm_7G1B5m6468KTc&libraries=places&callback=map";
    var queryURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAUCRBjRZyAYWMlrjubm_7G1B5m6468KTc&libraries=places&callback=map";
    var pos
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
            pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var marker = new google.maps.Marker({
      position: pos,
      title: "You are here"
    
    });

    poly = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      poly.setMap(map);

      map.addListener('click', addLatLng);
    

    // Handles click events on a map, and adds a new point to the Polyline.
    function addLatLng(event) {
      var path = poly.getPath();

      // Because path is an MVCArray, we can simply append a new coordinate
      // and it will automatically appear.
      path.push(event.latLng);

      // Add a new marker at the new plotted point on the polyline.
      var marker = new google.maps.Marker({
        position: event.latLng,
        title: '#' + path.getLength(),
        map: map
      });
    }
    
    marker.setMap(map);
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


  <script async defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAUCRBjRZyAYWMlrjubm_7G1B5m6468KTc&callback=initMap">
  </script>
    
    