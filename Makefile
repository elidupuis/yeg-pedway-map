datapath = 'data/'
osm_api = 'http://overpass.osm.rambler.ru/cgi/interpreter?data=[out:json];'

all: \
	lrt-entrances.json \
	pedway-underground.json

# node["railway"="subway_entrance"](53.53194166330259,-113.51263046264648,53.54897743828181,-113.48499298095703);out;;
# see lrt-entrances-query.txt for reference. this was exported from http://overpass-turbo.eu/
lrt-entrances.json:
	curl -o $(datapath)lrt-entrances.json 'http://overpass.osm.rambler.ru/cgi/interpreter?data=%5Bout:json%5D;node%5B%22railway%22%3D%22subway%5Fentrance%22%5D%2853%2E53194166330259%2C%2D113%2E51263046264648%2C53%2E54897743828181%2C%2D113%2E48499298095703%29%3Bout%3B'


pedway-underground.json:
	curl -o $(datapath)pedway-underground.json 'http://overpass.osm.rambler.ru/cgi/interpreter?data=%5Bout:json%5D;way%5B%22highway%22%3D%22footway%22%5D%5B%22layer%22%3D%22%2D1%22%5D%2853%2E53275790467149%2C%2D113%2E51245880126953%2C53%2E54683559190011%2C%2D113%2E48499298095703%29%3B%28%2E%5F%3B%3E%3B%29%3Bout%3B'
