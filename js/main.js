var center = [53.53671135113535, -113.50722312927246]
var map = L.map('main-map', {
	zoomControl: false
}).setView(center, 14);

// http://a.tile.stamen.com/toner/12/656/1583.png
L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
    maxZoom: 18
}).addTo(map);

L.control.zoom({ position: 'topright' }).addTo(map);