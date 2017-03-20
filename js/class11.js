/**
 * 1 - Utiliza Google Maps para posicionar al usuario.
 */
(function(){
  if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(coord){
          var location = {
              lat: coord.coords.latitude,
              lng: coord.coords.longitude
          }
          initMap(location);
      });
  } else {
      console.warn('Geolocation not supported');
  }

  /**
   * 
   */
  function initMap(location) {
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: location
      });
      customizeMap(map);
      addUserMarker(location, map);
  }

  /**
   * 
   */
  function addUserMarker(location, map) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });
  }

  function customizeMap(map){
      var styles = [
        {
          stylers: [
            { hue: "#10aecc" },
            { saturation: -20 }
          ]
        },{
          featureType: "road",
          elementType: "geometry",
          stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
          ]
        },{
          featureType: "road",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        }
      ];
      
      map.setOptions({styles: styles});
  }
});

/**
 * 2 - Posiciona todos los vehículos de transporte (trenes y autorbuses) de Los Angeles en el mapa.
 */