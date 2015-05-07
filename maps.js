var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function renderMap() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var location = new google.maps.LatLng(-19.843063,-43.9384724);
  var mapOptions = {
    zoom: 17,
    center: location,
	scrollwheel: false
  };
  map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute(latitude, longitude) {
  var today = new Date();
  var request;
  var dest;

  var Digital=new Date()
  var hours=Digital.getHours()

  if (hours>=7&&hours<=12) //CEFET
    dest = '-19.938285, -43.999692';
  else if (hours>13&&hours<=18) //AXXIOM
    dest = '-19.935729, -43.935647';
  else if (hours>20&&hours<=23) //ESTADIO INDEPENDENCIA -- GAAALOOO
    dest = '-19.908399, -43.917746';
  else //CASA
    dest = '-19.925988, -43.947799';
  request = {
      origin: (latitude + ',' + longitude),
      destination: dest,
      travelMode: google.maps.TravelMode.DRIVING
  };
  
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function renderGeolocationMap() {
  navigator.geolocation.getCurrentPosition(function(position) {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      zoom: 17,
      center: location,
	    scrollwheel: false
    };
    map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
	
    directionsDisplay.setMap(map);
	
    calcRoute(position.coords.latitude, position.coords.longitude);
  });
}

function initialize() {
  renderMap();
  if ('geolocation' in navigator) {
    renderGeolocationMap();
  } else {
    renderMap();
  }
}
google.maps.event.addDomListener(window, 'load', initialize);



// window.onload = loadScript;
