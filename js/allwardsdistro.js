var startIndex = 0;

var pymChild = new pym.Child();

// https://bl.ocks.org/shimizu/5f4cee0fddc7a64b55a9

d3.csv("data/ward_transit_dist.csv", function(err, transit) {	
	d3.csv("data/ward_drive_dist.csv", function(err2, drive) {	
		chartDraw(transit,drive);		
	});
});

function chartDraw(transit,drive) {
	
	transit.forEach(function(d){
		d.time = +d.time;
		d.ward1 = +d.ward1;
		d.ward2 = +d.ward2;
		d.ward3 = +d.ward3;
		d.ward4 = +d.ward4;
		d.ward5 = +d.ward5;
		d.ward6 = +d.ward6;
		d.ward7 = +d.ward7;
		d.ward8 = +d.ward8;
	})

	drive.forEach(function(d){
		d.time = +d.time;
		d.ward1 = +d.ward1;
		d.ward2 = +d.ward2;
		d.ward3 = +d.ward3;
		d.ward4 = +d.ward4;
		d.ward5 = +d.ward5;
		d.ward6 = +d.ward6;
		d.ward7 = +d.ward7;
		d.ward8 = +d.ward8;
	})

	// console.log(transit)
	// console.log(drive)

	// initialize
    var margin = {top: 10, right: 100, bottom: 90, left: 40},
		width = parseInt(d3.select("#map").style("width")),
		height = getHeight(width);

	var svg = d3.select("#map").append("svg")
	    .attr("width", width)
	    .attr("height", height);
	var body = d3.select("body");

  	// declare main g and stuff  
  	var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + 0 + ")");

  	var spacer = 10,
	  	numOfWards = 8,
	  	chartHeight = ((height - margin.top - margin.bottom)-((numOfWards)*spacer)) / numOfWards,
	  	chartWidth = width - margin.left;

	// console.log(chartHeight)

	var x = d3.scaleLinear()
	    .rangeRound([0, (chartWidth-(4*spacer))]);

	var y = [];
	var area = [];

	for (var i = 0; i < numOfWards; i++) {
		y["w"+(i+1)] = d3.scaleLinear();
		// // y.push(d3.scaleLinear())
		// area.push(d3.area())
		area["w"+(i+1)] = d3.area();
	}	    	

	
	for (ward in y) {		
 		var n = +ward.slice(1);		// ward index;
 		// console.log(n)
 		var chartStart = ((n-1)*chartHeight)+((n-1)*spacer)+margin.top;
		var chartEnd = (n*chartHeight)+((n-1)*spacer)+margin.top;
		y[ward].rangeRound([chartEnd,chartStart])
			.domain([0, 0.2]);	  	//max is .24 in ward3 of driving;		
	}

	area.w1.x(function(d) { return x(d.time); }).y0(y.w1(0)).y1(function(d){return y.w1(d.ward1)});
	area.w2.x(function(d) { return x(d.time); }).y0(y.w2(0)).y1(function(d){return y.w2(d.ward2)});
	area.w3.x(function(d) { return x(d.time); }).y0(y.w3(0)).y1(function(d){return y.w3(d.ward3)});
	area.w4.x(function(d) { return x(d.time); }).y0(y.w4(0)).y1(function(d){return y.w4(d.ward4)});
	area.w5.x(function(d) { return x(d.time); }).y0(y.w5(0)).y1(function(d){return y.w5(d.ward5)});
	area.w6.x(function(d) { return x(d.time); }).y0(y.w6(0)).y1(function(d){return y.w6(d.ward6)});
	area.w7.x(function(d) { return x(d.time); }).y0(y.w7(0)).y1(function(d){return y.w7(d.ward7)});
	area.w8.x(function(d) { return x(d.time); }).y0(y.w8(0)).y1(function(d){return y.w8(d.ward8)});

	// x.domain(d3.extent(transit, function(d) { return d.time; }));
	x.domain([0,100])

	var contents = "<p>Mean Time</p><h2>XX mins</h2>";

	for (var i = 0; i < numOfWards; i++) {
		g.append("rect")
	      .datum(i+1)
	      .attr("class","hoverbox w" + (i+1))
	      .attr("y", function(d) { return margin.top+(chartHeight*(i))+(spacer*(i))+spacer/2; })
		  .attr("x", -(2.5*spacer))
		  .attr("width",(width-30))
		  .attr("height",chartHeight)
		  .on("mouseover", function(d){
		  	pymChild.sendMessage('hover', d);
		  })
		  .on("mouseout", function(d){
		  	pymChild.sendMessage('hover', "")
		  });

		g.append("path")
	      .datum(drive)
	      .attr("class","ward wardmap w" + (i+1))
	      .attr("d", area["w"+(i+1)])
	      .on("mouseover", function(d){
	      	var ward = d3.select(this).attr("class").replace(/ward/g,"").replace("map","").replace(/\s/g,"").replace("w","")
		  	pymChild.sendMessage('hover', ward);
		  })
		  .on("mouseout", function(d){
		  	pymChild.sendMessage('hover', "")
		  });

		g.append("text")
		    .attr("class", "numYO")
		    .attr("y", function(d) { return margin.top+(chartHeight*(i))+(spacer*(i))+spacer+spacer; })
		    .attr("x", -(2*spacer))
		    // .attr("dy", ".35em")
		    .text(i+1);	 		    
	}  	

	 g.append("g")
      .attr("transform", "translate(0," + (height-margin.bottom) + ")")
      .call(d3.axisBottom(x).ticks(4));

	g.append("text")
		.attr("class","axis-label")
    	.attr("transform", "translate(" + width/2 + "," + (height-margin.bottom+spacer+spacer+spacer+spacer) + ")")
		.text("Commute time in minutes") 
	  

    $("#drive").click(function(){
    	switchTo("drive");
    })

    $("#transit").click(function(){
    	switchTo("transit");
    })

    function switchTo(type) {
    	// console.log(type);
    	$(".button").removeClass("active");
    	$("#" + type).addClass("active");

   		if (type === "drive") {
   			var tada = drive;
   		} else {
   			var tada = transit;
   		}

    	for (var i = 0; i < numOfWards; i++) {


    		var nowThis = g.select(".wardmap.w"+(i+1));

			nowThis
				.datum(tada).transition().ease(d3.easeLinear).duration(1000)
				.attr("d", area["w"+(i+1)]);

    	}

    // 		g.selectAll("path")
				// .data(transit)
				// .transition().ease(d3.easeLinear).duration(2000)
				// .attr("d", function(d,i){
				// 	console.log(i)
				// 	return area["w"+(i+1)]
				// });

		

    }


	// What to do when we get to the map in the parent container
	pymChild.onMessage('hover', onHover);
	
	function onHover(ward){	
		d3.selectAll(".hoverbox").classed("active",false);
		d3.selectAll(".hoverbox.w"+ward).classed("active",true);
	}

	function getHeight(width){
		if (width > 440) {
			return 632;
		} else if (width > 384) {
			return 474;
		} else if (width > 307.2) {
			return 374;
		} else {
			return 300;
		}
	}


}

  