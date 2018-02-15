// https://bl.ocks.org/shimizu/5f4cee0fddc7a64b55a9

function IS_DESKTOP(){
	return d3.select("#isDesktop").style("display") == "block";
}
function IS_TABLET(){
	return d3.select("#isTablet").style("display") == "block";
}
function IS_PHONE(){
	return d3.select("#isPhone").style("display") == "block";
}
	
d3.json("data/wards.geojson", function(err, data) {
	console.log(data)
	// var dataIndex = d3.map(data.features, function(d) { return d.properties.WARD; });
	// console.log(dataIndex.$7)
    mapDraw(data);
});

function mapDraw(geojson) {
	
	mapboxgl.accessToken = 'pk.eyJ1IjoidXJiYW5pbnN0aXR1dGUiLCJhIjoiTEJUbmNDcyJ9.mbuZTy4hI_PWXw3C3UFbDQ';
	var map = new mapboxgl.Map({
	  container: 'map', 
	  style: 'mapbox://styles/urbaninstitute/cjdozdvbd02lv2sswwwuxsxmr', 
	  center: [-77.0265709, 38.8970754], 
	  zoom: 9,
	  interactive: false
	});

    var container = map.getCanvasContainer()
    var svg = d3.select(container).append("svg")

    var transform = d3.geoTransform({point: projectPoint});
	var path = d3.geoPath().projection(transform);

	var featureElement = svg.selectAll("path")
		.data(geojson.features.filter(function(d){return d.properties.WARD === 7}))
		.enter()
		.append("path")
		.attr("class","ward w7")
    
    function update() {
        featureElement.attr("d",path);
    }

    map.on("viewreset", update)
    map.on("movestart", function(){
		svg.classed("hidden", true);
	});	
    map.on("rotate", function(){
		svg.classed("hidden", true);
	});	
    map.on("moveend", function(){
		update()
		svg.classed("hidden", false);
	})

    update()


	function projectPoint(lon, lat) {		
        var point = map.project(new mapboxgl.LngLat(lon, lat));
		this.stream.point(point.x, point.y);
	}

}

  