var startIndex = 0;

var pymChild = new pym.Child();

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
	// var indiaLoc = [-76.9274017,38.903382];
	// var indiaSchool = [-77.0707787,38.915167];

////// Initial map and other initial items//////
	mapboxgl.accessToken = 'pk.eyJ1IjoidXJiYW5pbnN0aXR1dGUiLCJhIjoiTEJUbmNDcyJ9.mbuZTy4hI_PWXw3C3UFbDQ';
	var map = new mapboxgl.Map({
	  container: 'map', 
	  style: 'mapbox://styles/urbaninstitute/cjdozdvbd02lv2sswwwuxsxmr', 
	  // center: [-77.0265709, 38.8970754], 
	  // zoom: 9,
	  interactive: false
	});

	// DC bounds
	var sw = new mapboxgl.LngLat(-77.1220677, 38.7916431);
	var ne = new mapboxgl.LngLat(-76.9116897, 38.9932155);
	var llb = new mapboxgl.LngLatBounds(sw, ne);

	// zoom to DC bounds
	map.fitBounds(llb, { duration: 0, padding: 20 })

    var container = map.getCanvasContainer()
    var svg = d3.select(container).append("svg")

    var transform = d3.geoTransform({point: projectPoint});
	var path = d3.geoPath().projection(transform);

	var featureElement = svg.selectAll("path")
		.data(geojson.features)
		.enter()
		.append("path")
		.attr("class",function(d){
			return "wardmap ward w" + d.properties.WARD;
		})
	// Functions!!!!

    function update() {
        featureElement.attr("d",path);        
    }


	function projectPoint(lon, lat) {
        var point = map.project(new mapboxgl.LngLat(lon, lat));
		this.stream.point(point.x, point.y);
	}

    // Event Listeners
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



	// What to do when we get to the map in the parent container
	pymChild.onMessage('arrival', onArrivalMessage);
	function onArrivalMessage(message){	
		// this fires on arrival from the parent
	}


}

  