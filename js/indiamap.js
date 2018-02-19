var pymChild = new pym.Child();

pymChild.onMessage('arrival', onArrivalMessage);

function onArrivalMessage(data){
	console.log(data)
	// Initialize the d3 event where India's dot flys across screen to other dots
		// on end, other dots and India's fly to destinations
}

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
    mapDraw(data);
});

function mapDraw(geojson) {
	var indiaLoc = [-76.933793,38.904854];

	mapboxgl.accessToken = 'pk.eyJ1IjoidXJiYW5pbnN0aXR1dGUiLCJhIjoiTEJUbmNDcyJ9.mbuZTy4hI_PWXw3C3UFbDQ';
	var map = new mapboxgl.Map({
	  container: 'map', 
	  style: 'mapbox://styles/urbaninstitute/cjdozdvbd02lv2sswwwuxsxmr', 
	  // center: [-77.0265709, 38.8970754], 
	  // zoom: 9,
	  interactive: false
	});

	var sw = new mapboxgl.LngLat(-77.1220677, 38.7916431);
	var ne = new mapboxgl.LngLat(-76.9116897, 38.9932155);
	var llb = new mapboxgl.LngLatBounds(sw, ne);

	map.fitBounds(llb, { duration: 0, padding: 20 })

    var container = map.getCanvasContainer()
    var svg = d3.select(container).append("svg")

    var transform = d3.geoTransform({point: projectPoint});
	var path = d3.geoPath().projection(transform);

	var featureElement = svg.selectAll("path")
		.data(geojson.features.filter(function(d){return d.properties.WARD === 7}))
		.enter()
		.append("path")
		.attr("class","ward w7")

	var IndiaContainer = svg.append("g")
	IndiaContainer.append("circle")
		.attr("class","indiapoint")
		.attr("cx", function (d) { return 30})
		.attr("cy", function (d) { return 30})
		.attr("r", function (d) { return 5 })
		.style("fill", function(d) { return "#ff00ff" });

	var IndiaPoint = IndiaContainer.selectAll(".indiapoint");
    
	$("#indiaclick").click(function(){

		var point = map.project(new mapboxgl.LngLat(indiaLoc[0], indiaLoc[1]));

		IndiaPoint.transition().ease(d3.easeLinear).duration(2000)
			.attr("cx", function (d) { return point.x})
			.attr("cy", function (d) { return point.y})
	})

    function update() {
        featureElement.attr("d",path);        
    }

    map.on("viewreset", function(){    	
    	// map.fitBounds(llb, { duration: 0, padding: 20 })
    	update()
		// pymChild.sendHeight()
    });	    	
    map.on("movestart", function(){
		// svg.classed("hidden", true);
	});	
    map.on("rotate", function(){
		// svg.classed("hidden", true);
	});	
    map.on("moveend", function(){
		// getHeight()
		update()
		map.fitBounds(llb, { duration: 0, padding: 20 })
		pymChild.sendHeight()
		// svg.classed("hidden", false);
	})

    update()


	function projectPoint(lon, lat) {
        var point = map.project(new mapboxgl.LngLat(lon, lat));
		this.stream.point(point.x, point.y);
	}


}

  