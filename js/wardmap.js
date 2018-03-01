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
	d3.csv("data/wardDemographics.csv", function(err, demo) {	
		mapDraw(data,demo);		
	});		
});

function mapDraw(geojson,demo) {
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
		.on("mouseenter", function(d) {
            removeTooltip()
            d3.select(this).classed("active", true);
            createTooltip(d)
            // console.log(d)
            pymChild.sendMessage('hover', d.properties.WARD);
        })
        .on("mouseleave", function() {
            d3.select(this).classed("active", false);            	
            
        })

	var tooltip = d3.select("body").append("div") 
	    .attr("class", "tooltip");



	// Functions!!!!

	function createTooltip(d) {
		var centroid = path.centroid(d);
		

		var x = d.properties.WARD - 1;

        var contents = "<div><h2> Ward " + d.properties.WARD + "</h2><p><strong>Total Population: " + d3.format(",")(demo[x].pop) + "</strong></p>" 
        + "<div class='racial'><p>" 
        + d3.format(".0%")(demo[x].black) + " Black&nbsp;&nbsp;&nbsp;"
		+ d3.format(".0%")(demo[x].white) + " White&nbsp;&nbsp;&nbsp;"
		+ d3.format(".0%")(demo[x].asian) + " Asian&nbsp;&nbsp;&nbsp;"
		+ d3.format(".0%")(demo[x].latino) + " Hispanic/Latino&nbsp;&nbsp;&nbsp;"
        +"</p></div>"
        +"<div class='times'>"
	       	+"<div class='times-left times-subset'>"
	        // + left times
		        + "<p><strong>6th grade average<br>time to school</strong>"
		        + "<br>Driving: " + Math.round(demo[x].drive6) + " min"
		        + "<br>Transit: " + Math.round(demo[x].transit6) + " min"
		        + "</p>"
	        +"</div>"
	        +"<div class='times-right times-subset'>"
	        // + right times
				+ "<p><strong>9th grade average<br>time to school</strong>"
		        + "<br>Driving: " + Math.round(demo[x].drive9) + " min"
		        + "<br>Transit: " + Math.round(demo[x].transit9) + " min"
		        + "</p>"
	        +"</div>" 
	    +"</div>"
        +"</div>"      

        tooltip.html(contents);

        tooltip.classed("top",true)
            .style("left", function(d){
            	// console.log(centroid[0])
            	return (centroid[0] - 130) + "px";
            })   
      		.style("top", function(d){
      			// console.log(centroid[1])
      			return (centroid[1] - 150) + "px";
      		});  
	}

	function removeTooltip() {
		tooltip.style("left", "-1000px").style("top","-1000px"); 
	  	tooltip.classed("top",false);
	  	tooltip.classed("bottom",false);
	}

    function update() {
        featureElement.attr("d",path);        
    }

	function projectPoint(lon, lat) {
        var point = map.project(new mapboxgl.LngLat(lon, lat));
		this.stream.point(point.x, point.y);
	}

    // Event Listeners
 //    map.on("viewreset", function(){    	
 //    	// map.fitBounds(llb, { duration: 0, padding: 20 })
 //    	update()
	// 	// pymChild.sendHeight()
	// 	// console.log("viewreset")
 //    });	    	

   	var resizeTimer;	
	window.addEventListener("resize", function(e){
	  clearTimeout(resizeTimer);
	  resizeTimer = setTimeout(function() {	   	
		map.fitBounds(llb, { duration: 0, padding: 20 })
		update()
		removeTooltip()
		pymChild.sendHeight()

	  }, 250);
	})

    update()



	// What to do when we get to the map in the parent container
	pymChild.onMessage('arrival', onArrivalMessage);
	function onArrivalMessage(message){	
		// this fires on arrival from the parent
	}


}

  