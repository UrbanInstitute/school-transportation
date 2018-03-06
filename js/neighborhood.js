var pymChild = new pym.Child();

function IS_DESKTOP(){
	return d3.select("#isDesktop").style("display") == "block";
}
function IS_TABLET(){
	return d3.select("#isTablet").style("display") == "block";
}
function IS_PHONE(){
	return d3.select("#isPhone").style("display") == "block";
}
	
d3.csv("data/neighborhood2.csv", function(err, data) {	
	chartDraw(data);		
});

function chartDraw(data) {
	data.forEach(function(d){		
		d.sixth = +d.sixth;
		d.ninth = +d.ninth;
	})

	var zipped = [];

	for (var i = 0; i < data.length; i++) {
		zipped.push(data[i].sixth)
		zipped.push(data[i].ninth)
	}
	
	// initialize
	var breakpoint = 768 - 40,
		width = parseInt(d3.select("#map").style("width"));

	var gapBetweenBars = 5,		
		numOfRecs = zipped.length,
		barHeight = 10,
		numOfgroups = data.length,
		numPerGroup = numOfRecs / numOfgroups,
    	spacer = 10;	


	if (width > breakpoint) {
		var margin = {top: 10, right: 100, bottom: 20, left: 130},
			height = 225,
			gapBetweenGroups = 20,
			spaceForLabelsLeft   = 80,
			spaceForLabelsRight = 30,
	    	groupHeight = (barHeight*numPerGroup)+(gapBetweenBars*(numPerGroup-1)),
	    	BigLabelX = -100,
	    	BigLabelY = 10;


	} else {
		// Smaller viewports
		var margin = {top: 10, right: 10, bottom: 10, left: 30},
			height = 300,
			gapBetweenGroups = 40,
			spaceForLabelsLeft   = 30,
			spaceForLabelsRight = 30,
	    	groupHeight = (barHeight*numPerGroup)+(gapBetweenBars*(numPerGroup-1)),
			BigLabelX = 0,
	    	BigLabelY = -15;
	}

	var chartHeight = ((numPerGroup*barHeight) + ((numPerGroup-1)*gapBetweenBars) + gapBetweenGroups)*numOfgroups;	

	var labels = ["Sixth","Ninth"];
	var labels2 = ["Black","White","Hispanic","Asian"];

	var colorScale = d3.scaleOrdinal()
		// .range(["#848081","#d5d5d4","#332d2f","#5c5859","#0096d2","#a2d4ec","#0a4c6a","#12719e","#fdbf11","#fce39e","#843215","#e88e2d"]);
		.range(["#0096d2","#fdbf11"])

	// console.log(chartHeight)

  	// var chartHeight = ((height - margin.top - margin.bottom)-((numOfRecs)*spacer)) / numOfRecs;
  	var chartWidth = width - margin.left-margin.right;

  	var x = d3.scaleLinear()
	    .domain([0, d3.max(zipped)])
	    .range([0, chartWidth-(spaceForLabelsLeft+spaceForLabelsRight)]);

	var svg = d3.select("#map").append("svg")
	    .attr("width", width)
	    .attr("height", chartHeight + margin.top + (3*margin.bottom));	    

  	// declare main g and stuff
  	var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + 0 + ")");

  	var bar = g.selectAll("g")
	    .data(zipped)
	    .enter().append("g")
	    .attr("transform", function(d, i) {
	      return "translate(" + spaceForLabelsLeft + "," + ((i * barHeight)+(i*gapBetweenBars) + margin.top + gapBetweenGroups * (0.5 + Math.floor(i/numPerGroup))) + ")";
	    });

	bar.append("rect")
	    .attr("fill", function(d,i) { return colorScale(i);})
	    .attr("class", "bar")
	    .attr("width", x)
	    .attr("height", barHeight);

	bar.append("text")
		.attr("class","afterText")
	    .attr("x", function(d) { return x(d) + spacer; })
	    .attr("y", barHeight / 2)
	    .attr("dy", ".35em")
	    .text(function(d) { return d3.format(".0%")(d) });	    

	bar.append("text")
	    .attr("class", "label")
	    .attr("x", function(d) { return - 10; })
	    .attr("y", barHeight / 2)
	    .attr("dy", ".35em")
	    .text(function(d,i) {
	      return labels[i % numPerGroup]
	    });

	bar.append("text")
	    .attr("class", "Biglabel")
	    .attr("x", BigLabelX)
	    .attr("y", BigLabelY)
	    .attr("dy", ".35em")
	    .text(function(d,i) {
	    	if (i % numPerGroup === 0) {
		        return labels2[i/2];
	    	}
		    else {
		    	return ""
		    }
		        
		});	      
	    
  	g.append("g")
      .attr("transform", "translate(" + spaceForLabelsLeft +"," + (chartHeight+margin.bottom) + ")")
      .call(d3.axisBottom(x).ticks(4).tickFormat(d3.format(".0%")));    


	// What to do when we get to the map in the parent container
	pymChild.onMessage('arrival', onArrivalMessage);
	function onArrivalMessage(message){	
		// this fires on arrival from the parent
	}


}

  