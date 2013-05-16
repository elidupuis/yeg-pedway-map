(function(){
  'use strict';

  var markers = []
  var lrt_entrances = []
  var current_location = false
  var center = [53.53671135113535, -113.50722312927246]
  var map = L.map('main-map', {
    zoomControl: false
  }).setView(center, 14)

  // http://a.tile.stamen.com/toner/12/656/1583.png
  L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
      maxZoom: 18
  }).addTo(map);

  L.control.zoom({ position: 'topright' }).addTo(map);

  var icons = {
    lrt_entrance: L.divIcon({className: 'marker lrt-entrance'}),
    user: L.divIcon({className: 'marker user'})
  }
  $.getJSON('data/data.json', function(data){
    lrt_entrances = data
    $.each(lrt_entrances, function(i, item) {
      console.log(item)
      var marker = L.marker([item.lat, item.lng], { icon: icons.lrt_entrance }).addTo(map);
      marker.bindPopup('<b>' + item.station_name + ' Station</b><br>' + item.description)
      markers.push(marker)
    })
  })

  map.locate({
    watch: true,
    enableHighAccuracy: true
  })

  map.on('locationfound', function(e) {
    console.log('locationfound', e)
    // var marker = L.circleMarker(e.latlng).addTo(map)
    if (!current_location) {
      current_location = L.marker(e.latlng, { icon: icons.user }).addTo(map);
      current_location.bindPopup('You are here!')
    }else{
      current_location.setLatLng(e.latlng)
    }
  })

})()
