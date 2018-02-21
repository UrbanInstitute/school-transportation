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
	d3.csv("data/ward7_2.csv",function(err,ward7){
		ward7.forEach(function(d) {
	        d.drivedura_50 = +d.drivedura_50;
			d.drivedura_mean = +d.drivedura_mean;
			d.drive_traf_dura_50 = +d.drive_traf_dura_50;
			d.drive_traf_dura_mean = +d.drive_traf_dura_mean;
			d.transdura_50 = +d.transdura_50;
			d.transdura_mean = +d.transdura_mean;
			d.tractLat = +d.tractLat;
			d.tractLon = +d.tractLon;
			d.schoolLat = +d.schoolLat;
			d.schoolLon = +d.schoolLon;
	    });
		mapDraw(data,ward7);	
	});    
});

function mapDraw(geojson,ward7) {
	var indiaLoc = [-76.9274017,38.903382];
	var indiaSchool = [-77.0707787,38.915167];
	// console.log(ward7)

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
		.data(geojson.features.filter(function(d){return d.properties.WARD === 7}))
		.enter()
		.append("path")
		.attr("class","ward w7")

	var IndiaContainer = svg.append("g")
	IndiaContainer.append("circle")
		.attr("class","indiapoint")
		.attr("cx", function (d) { return 200})
		.attr("cy", function (d) { return -30})
		.attr("r", 15)

	var IndiaPoint = IndiaContainer.selectAll(".indiapoint");

	var PointsContainer = svg.append("g")

	var Ward7Points = PointsContainer.selectAll("circle")
		.data(ward7)
		.enter().append("circle")
		.attr("class","dot")
        .attr("r", 5)
        .attr("cx", function(d) { 
        	var point = map.project(new mapboxgl.LngLat(d.tractLon,d.tractLat));
        	return point.x; 
        })
        .attr("cy", function(d) { 
			var point = map.project(new mapboxgl.LngLat(d.tractLon,d.tractLat));
        	return point.y }
        );

	// Functions!!!!

    function update() {
        featureElement.attr("d",path);        
    }


	function projectPoint(lon, lat) {
        var point = map.project(new mapboxgl.LngLat(lon, lat));
		this.stream.point(point.x, point.y);
	}

	function movePoints(message){
		if (startIndex === 0) {
			startIndex+=1;
			// if is mobile, india starting point is x
			// else if is desktop, india starting point x

		
			// Initialize the d3 event where India's dot flys across screen to other dots
				// on end, other dots and India's fly to destinations
			IndiaPoint.transition().ease(d3.easeLinear).duration(1000)	
				.attr("cy", function (d) { return 100})
				.style("opacity","1")
				.attr("r",5)
				.on("end",function(){

					d3.select(this).transition().delay(1000).ease(d3.easeLinear).duration(3000)
						.attr("cx", function (d) { return point.x})
						.attr("cy", function (d) { return point.y})
						.on("end",function(){
							var point = map.project(new mapboxgl.LngLat(indiaSchool[0], indiaSchool[1]));

							d3.select(this).transition().ease(d3.easeLinear).duration(200*35)
								.attr("cx", function (d) { return point.x})
								.attr("cy", function (d) { return point.y})

							Ward7Points.transition().ease(d3.easeLinear).duration(function(d){
									return 200*d.drive_traf_dura_mean;
								})
								.attr("cx", function(d) { 
						        	var point = map.project(new mapboxgl.LngLat(d.schoolLon,d.schoolLat));
						        	return point.x; 
						        })
						        .attr("cy", function(d) { 
									var point = map.project(new mapboxgl.LngLat(d.schoolLon,d.schoolLat));
						        	return point.y }
						        )
						        .on("end",function(){
						        	d3.select(this).transition().ease(d3.easeLinear).duration(1000)
						        		.style("fill","#C5E4F3")
						        })
						})
				})

			var point = map.project(new mapboxgl.LngLat(indiaLoc[0], indiaLoc[1]));


				// On end, we bring out all the other points
					//on end of that we move them all to school


		}
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

    
    $("#indiaclick").click(function(){
    	movePoints("clicked")
    })

	// What to do when we get to the map in the parent container
	pymChild.onMessage('arrival', onArrivalMessage);
	function onArrivalMessage(message){	
		movePoints(message)	
	}


}

  