datapath = 'data/'
osm_api = 'http://overpass.osm.rambler.ru/cgi/interpreter?data=[out:json];'

all: \
	lrt-entrances.json

# node["railway"="subway_entrance"](53.53194166330259,-113.51263046264648,53.54897743828181,-113.48499298095703);out;;
lrt-entrances.json:
	curl -o $(datapath)lrt-entrances.json 'http://overpass.osm.rambler.ru/cgi/interpreter?data=%5Bout:json%5D;node%5B%22railway%22%3D%22subway%5Fentrance%22%5D%2853%2E53194166330259%2C%2D113%2E51263046264648%2C53%2E54897743828181%2C%2D113%2E48499298095703%29%3Bout%3B'

