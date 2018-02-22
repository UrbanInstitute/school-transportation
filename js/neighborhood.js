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

	console.log(data)

	var zipped = [];
	for (var i = data.length - 1; i >= 0; i--) {
		zipped.push(data[i].Black)
		zipped.push(data[i].White)
		zipped.push(data[i].Hispanic)
		zipped.push(data[i].Asian)
	}
	console.log(zipped)

	// initialize
    var margin = {top: 10, right: 100, bottom: 20, left: 90},
	width = parseInt(d3.select("#map").style("width")),
	// width = (parseInt(d3.select("#master_container").style("width")) > 1000) ? 1000 : parseInt(d3.select("#master_container").style("width")),
	height = 400;

	var labels = ["Black","White","Hispanic & Latino","Asian"]
	var colorScale = d3.scaleOrdinal()
		.domain(zipped)
		.range(["#a2d4ec","#0a4c6a","#062635","#0096d2"]);
	
	var gapBetweenBars = 15,
		gapBetweenGroups = 20,
		numOfRecs = zipped.length,
		barHeight = 10,
		numOfgroups = data.length,
		numPerGroup = numOfRecs / numOfgroups,
		spaceForLabels   = 30,
    	spacer = 10;

	var chartHeight = ((numPerGroup*barHeight) + ((numPerGroup-1)*gapBetweenBars) + gapBetweenGroups)*numOfgroups;	

  	// var chartHeight = ((height - margin.top - margin.bottom)-((numOfRecs)*spacer)) / numOfRecs;
  	var chartWidth = width - margin.left-margin.right;

  	var x = d3.scaleLinear()
	    .domain([0, d3.max(zipped)])
	    .range([0, chartWidth-spaceForLabels]);

	var svg = d3.select("#map").append("svg")
	    .attr("width", width)
	    .attr("height", chartHeight + margin.top + (3*margin.bottom));
	    console.log(chartHeight)
	    console.log(chartHeight + margin.top + (3*margin.bottom));

  	// declare main g and stuff
  	var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + 0 + ")");

  	var bar = g.selectAll("g")
	    .data(zipped)
	    .enter().append("g")
	    .attr("transform", function(d, i) {
	      return "translate(" + spaceForLabels + "," + ((i * barHeight)+(i*gapBetweenBars) + gapBetweenGroups * (0.5 + Math.floor(i/numPerGroup))) + ")";
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

  	g.append("g")
      .attr("transform", "translate(" + spaceForLabels +"," + (chartHeight+2*margin.bottom) + ")")
      .call(d3.axisBottom(x).ticks(4).tickFormat(d3.format(".0%")));    


	// What to do when we get to the map in the parent container
	pymChild.onMessage('arrival', onArrivalMessage);
	function onArrivalMessage(message){	
		// this fires on arrival from the parent
	}


}

  