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
	
d3.csv("data/neighborhood.csv", function(err, data) {	
	chartDraw(data);		
});

function chartDraw(data) {
	data.forEach(function(d){
		d.White = +d.White;
		d.Black = +d.Black;
		d.Hispanic = +d.Hispanic;
		d.Asian = +d.Asian;
	})

	var zipped = [];
	for (var i = data.length - 1; i >= 0; i--) {
		zipped.push(data[i].Black)
		zipped.push(data[i].White)
		zipped.push(data[i].Hispanic)
		zipped.push(data[i].Asian)
	}
		
	// initialize
    var margin = {top: 10, right: 100, bottom: 20, left: 130},
	width = parseInt(d3.select("#map").style("width")),
	// width = (parseInt(d3.select("#master_container").style("width")) > 1000) ? 1000 : parseInt(d3.select("#master_container").style("width")),
	height = 240;

	var labels = ["Black","White","Hispanic & Latino","Asian"];
	var labels2 = ["K","6TH","9TH"];

	var colorScale = d3.scaleOrdinal()
		.range(["#848081","#d5d5d4","#332d2f","#5c5859","#0096d2","#a2d4ec","#0a4c6a","#12719e","#fdbf11","#fce39e","#843215","#e88e2d"]);

	
	var gapBetweenBars = 5,
		gapBetweenGroups = 25,
		numOfRecs = zipped.length,
		barHeight = 10,
		numOfgroups = data.length,
		numPerGroup = numOfRecs / numOfgroups,
		spaceForLabelsLeft   = 80,
		spaceForLabelsRight = 30,
    	spacer = 10,
    	groupHeight = (barHeight*numPerGroup)+(gapBetweenBars*(numPerGroup-1));

	var chartHeight = ((numPerGroup*barHeight) + ((numPerGroup-1)*gapBetweenBars) + gapBetweenGroups)*numOfgroups;	

	console.log(chartHeight)

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
	      return "translate(" + spaceForLabelsLeft + "," + ((i * barHeight)+(i*gapBetweenBars) + gapBetweenGroups * (0.5 + Math.floor(i/numPerGroup))) + ")";
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
	    .attr("x", function(d) { return - 100; })
	    .attr("y", 5)
	    .attr("dy", ".35em")
	    .text(function(d,i) {
	    	if (i % numPerGroup === 0)
		        return labels2[i % numOfgroups];
		      else
		        return ""
		});	      
	    
  	g.append("g")
      .attr("transform", "translate(" + spaceForLabelsLeft +"," + (chartHeight+spacer) + ")")
      .call(d3.axisBottom(x).ticks(4).tickFormat(d3.format(".0%")));    


	// What to do when we get to the map in the parent container
	pymChild.onMessage('arrival', onArrivalMessage);
	function onArrivalMessage(message){	
		// this fires on arrival from the parent
	}


}

  