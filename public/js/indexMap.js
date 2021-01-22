
var map;
let geocoder;
function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 23.858987, lng:120.917631}
  });

  map.data.loadGeoJson('../json/TaiwanCounty.json')
  map.data.setStyle({
    strokeWeight: 1,
    strokeOpacity: .5,
    strokeColor: '#000',
    fillColor: '#0096c7',
    fillOpacity: .3
  });

map.data.addListener('mouseover', function(event) {
  // map.data.revertStyle();
  map.data.overrideStyle(event.feature, {fillColor: '#000'});
  console.log(event.feature.j.ISO3166);
});

map.data.addListener('mouseout', function(event) {
  map.data.revertStyle();
});
map.data.addListener('click',function(e){
  geocoder.geocode( { 'address': e.feature.j.NAME_2014}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var infowindow = new google.maps.InfoWindow({
        content: `<h4><a href="/articles?q=city&city=${e.feature.j.ISO3166}">${e.feature.j.NAME_2014}</a></h4>`,
        map: map,
        position: results[0].geometry.location
      });
    
      marker
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
})
}