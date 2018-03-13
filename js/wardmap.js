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

	//INDIA AND SKY
	var indiaLoc = [-76.9274017,38.903382];
	var skylerLoc = [-77.032724,38.930235]; 

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
            pymChild.sendMessage('hover', d.properties.WARD);
            d3.select("text.w" + d.properties.WARD)
            	.attr("transform", function(d){
            		return "translate(" + path.centroid(d)[0] + "," + path.centroid(d)[1] + "),rotate(45)"
            	})
            	
        })
        .on("mouseleave", function(d) {
            d3.select(this).classed("active", false);            	
            removeTooltip()
			d3.select("text.w" + d.properties.WARD)
        	.attr("transform", function(d){
        		return "translate(" + path.centroid(d)[0] + "," + path.centroid(d)[1] + "),rotate(0)"
        	})
            
        })

	var tooltip = d3.select("body").append("div") 
	    .attr("class", "tooltip");

	var pointIndia = map.project(new mapboxgl.LngLat(indiaLoc[0], indiaLoc[1]));
	var IndiaContainer = svg.append("g")
	IndiaContainer.append("circle")
		.attr("class","indiapoint stroker")
		.attr("cx", function (d) { return pointIndia.x})
		.attr("cy", function (d) { return pointIndia.y})
		.attr("r", 8)	

	IndiaContainer.append("text")
		.attr("class","pointText")
		.attr("transform", "translate(" + pointIndia.x + "," + pointIndia.y + ")")
		.attr("dy",".45em")
		.attr("dx","1em")
		.text("India")


	var pointskyler = map.project(new mapboxgl.LngLat(skylerLoc[0], skylerLoc[1]));
	var skylerContainer = svg.append("g")
	skylerContainer.append("circle")
		.attr("class","skylerpoint stroker")
		.attr("cx", function (d) { return pointskyler.x})
		.attr("cy", function (d) { return pointskyler.y})
		.attr("r", 8)

	skylerContainer.append("text")
		.attr("class","pointText")
		.attr("transform", "translate(" + pointskyler.x + "," + pointskyler.y + ")")
		.attr("dy",".45em")
		.attr("dx","1em")
		.text("Skyler")

	svg.selectAll(".plus")
		.data(geojson.features)
		.enter()
		.append("circle")		
		.attr("class",function(d){
			return "plus w" + d.properties.WARD;
		})
		.attr("r",10)
		.attr("cx", function (d) { return path.centroid(d)[0]})
		.attr("cy", function (d) { return path.centroid(d)[1]});

	svg.selectAll(".plusText")
		.data(geojson.features)
		.enter()
		.append("text")		
		.attr("class",function(d){
			return "plusText w" + d.properties.WARD;
		})
		.text("+")	
		.attr("dy",".25em")
		.attr("dx","-.3em")
		.attr("transform", function(d){
			return "translate(" + path.centroid(d)[0] + "," + path.centroid(d)[1] + ")"
	})
			// .attr("x",function(d){ return })
		// .attr("y",function(d){ return })	


	// Functions!!!!

	function createTooltip(d) {
		var centroid = path.centroid(d);
		
		var x = d.properties.WARD - 1;

        var contents = "<div><h2> Ward " + d.properties.WARD + "</h2><p><strong>Total population: " + d3.format(",")(demo[x].pop) + "</strong></p>" 
        + "<div class='racial'><p>" 
        + d3.format(".0%")(demo[x].black) + " Black&nbsp;&nbsp;&nbsp;"
		+ d3.format(".0%")(demo[x].white) + " White&nbsp;&nbsp;&nbsp;"
		+ d3.format(".0%")(demo[x].asian) + " Asian&nbsp;&nbsp;&nbsp;"
		+ d3.format(".0%")(demo[x].latino) + " Hispanic&nbsp;&nbsp;&nbsp;"
        +"</p></div>"
        +"<div class='times'>"
	       	+"<div class='times-left times-subset'>"
	        // + left times
		        + "<p><strong>6th-grade average<br>time to school</strong>"
		        + "<br>Driving: " + Math.round(demo[x].drive6) + " min"
		        + "<br>Transit: " + Math.round(demo[x].transit6) + " min"
		        + "</p>"
	        +"</div>"
	        +"<div class='times-right times-subset'>"
	        // + right times
				+ "<p><strong>9th-grade average<br>time to school</strong>"
		        + "<br>Driving: " + Math.round(demo[x].drive9) + " min"
		        + "<br>Transit: " + Math.round(demo[x].transit9) + " min"
		        + "</p>"
	        +"</div>" 
	    +"</div>"
        +"</div>"      

        tooltip.html(contents);

        var width = parseInt(d3.select("#map").style("width"));
        // console.log(width)

    	var props = {
    		x: centroidXer(centroid[0],width),
    		y: centroidYer(centroid[1]),
    		class1: centroid[1] < 250 ? "bottom" : "top",
    		class2: "w" + d.properties.WARD
    	}	

    	props.arrow = props.x - 10;

		tooltip.classed(props.class1,true).classed(props.class2,true)
            .style("left", function(d){
            	return props.x + "px";
            })   
      		.style("top", function(d){
      			return props.y + "px";
      		});      	     
	}

	function centroidXer(pointx,width) {
		if (pointx < 158) {
			return 0;
		}
		else if (pointx > (width-158)){	
			console.log(pointx)
			console.log(width)
			return  (pointx-142)-(158-(width-pointx));
		} else {
			return pointx - (142);
		}
	}

	function centroidYer(pointy) {
		if (pointy < 250) {
			return pointy + 20;
		} else {
			return pointy - 180;
		}	
	}

	

	function removeTooltip() {
		tooltip.style("left", "-1000px").style("top","-1000px"); 
	  	tooltip.classed("top",false);
	  	tooltip.classed("bottom",false);	  	
		tooltip.classed("w1",false);
		tooltip.classed("w2",false);
		tooltip.classed("w3",false);
		tooltip.classed("w4",false);
		tooltip.classed("w5",false);
		tooltip.classed("w6",false);
		tooltip.classed("w7",false);
		tooltip.classed("w8",false);

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
	pymChild.onMessage('hover', onHover);
	function onHover(wardID){	
		if(wardID == ""){
			removeTooltip();
			d3.selectAll(".wardmap.ward").classed("active", false);
		}else{
	        removeTooltip();
	        var datum = geojson.features.filter(function(d){ return d.properties.WARD == +wardID  })[0];
	        d3.selectAll(".wardmap.ward").classed("active", false);
	        d3.selectAll(".wardmap.ward.w" + wardID).classed("active", true);
	        createTooltip(datum);
	    }
	}



}

