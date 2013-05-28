(function(){
  'use strict';

  var markers = []
  var lrt_entrances = []
  var current_location = false
  var center = [53.53671135113535, -113.50722312927246]
  var map = L.map('main-map', {
    zoomControl: false
  }).setView(center, 14)



  L.control.zoom({ position: 'topright' }).addTo(map);

  // icons
  var icons = {
    lrt_entrance: L.divIcon({className: 'marker lrt-entrance'}),
    user: L.divIcon({className: 'marker user'})
  }

  // tile layers
  // http://a.tile.stamen.com/toner/12/656/1583.png
  var tileLayer = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
      maxZoom: 18
  }).addTo(map);

  // overlay layers
  var pedwayLayer = L.layerGroup().addTo(map);
  var entrancesLayer = L.layerGroup().addTo(map);
  var overlayMaps = {
    "Pedway": pedwayLayer,
    "LRT Entrances": entrancesLayer
  }
  L.control.layers(null, overlayMaps, { position: 'bottomright' }).addTo(map);

  // main street level LRT entrances
  $.getJSON('data/lrt-entrances.json', function(data){
    lrt_entrances = data.elements
    $.each(lrt_entrances, function(i, item) {
      // console.log(item)
      var tags = item.tags || {}
      var marker = L.marker([item.lat, item.lon], { icon: icons.lrt_entrance }).addTo(entrancesLayer);
      if (tags.name) {
        marker.bindPopup('<b>' + tags.name + '</b>')
      }
      markers.push(marker)
    })
  })

  // underground pedway footpaths
  $.getJSON('data/pedway-underground.json', function(data){
    var pedway = data.elements
    _.each(pedway, function(element){

      // for each way
      if (element.type === 'way') {
        // loop through node references
        var latlngs = _.map(element.nodes, function(id){
          // find associated node in order to return latlng
          var node = _.find(pedway, function(n){
            return n.id === id
          })
          return [node.lat, node.lon]
        })

        // add pedway section to pedway layer.
        // use MultiPolyline instead?
        var polyline = L.polyline(latlngs).addTo(pedwayLayer);

      }

    })
  })

  // geolocation
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


  map.on('moveend', function(e){
    var center = map.getCenter()
    var zoom = map.getZoom()
    $('.osm-edit').attr('href', 'http://openstreetmap.us/iD/release/#background=Bing&map=' + zoom + '/'+ center.lng +'/'+ center.lat)
  })

})()
