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
	
d3.csv("data/drive_vs_transit.csv", function(err, data) {	
	chartDraw(data);		
});

function chartDraw(data) {	
	data.forEach(function(d){
		d.time = +d.time;
		d.transit = +d.transit;
		d.drive = +d.drive;
	})

	// initialize
	var breakpoint = 768 - 14,
		width = parseInt(d3.select("#map").style("width"));

  	var IndiaTime = 60;
  	var SkyTime = 30;
  	var spacer = 10;
  	var nameSpacer = 15;
  	var numOfRecs = 2;

	if (width > breakpoint) {

		var margin = {top: 10, right: 10, bottom: 40, left: 150},
			height = 200,
			chartWidth = width - margin.left - margin.right,
			chartHeight = ((height - margin.top - margin.bottom)-((numOfRecs)*spacer)) / numOfRecs,
			BigLabelXTop = spacer,
			BigLabelYTop = margin.top+spacer,
			BigLabelXBottom = spacer,				
	    	BigLabelYBottom = margin.top+chartHeight+spacer+spacer+spacer+spacer,
	    	htmlLLL = "<p>Driving<br>with traffic</p>",
	    	tickNum = 20;

	} else {
		var margin = {top: 10, right: 10, bottom: 40, left: 10},
			height = 300,
			chartWidth = width - margin.right - margin.left,
			chartHeight = ((height - margin.top - margin.bottom)-((numOfRecs)*spacer)) / numOfRecs,
			BigLabelXTop = spacer,
			BigLabelYTop = (1*3)-5,
			BigLabelXBottom = spacer,	    	
	    	BigLabelYBottom = margin.top+chartHeight+spacer,
	    	htmlLLL = "<p>Driving with traffic</p>",
	    	tickNum = 10;
	}



	var svg = d3.select("#map").append("svg")
	    .attr("width", width)
	    .attr("height", height);

  	// declare main g and stuff
  	// var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  	var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + 0 + ")");

  	var IndiaTime = 60;
  	var SkyTime = 30;
  	var spacer = 10;
  	var nameSpacer = 15;
  	var numOfRecs = 2;
  	// var chartHeight = ((height - margin.top - margin.bottom)-((numOfRecs)*spacer)) / numOfRecs;
  	

	var x = d3.scaleLinear()
	    .rangeRound([0, chartWidth]);

	var ydrive = d3.scaleLinear()
	    .rangeRound([(chartHeight+margin.top), (margin.top+spacer)]);

	var ytransit = d3.scaleLinear()
	    .rangeRound([((2*chartHeight)+spacer+margin.top), (margin.top+chartHeight+spacer+spacer)]);

	var areadrive = d3.area()
	    .x(function(d) { return x(d.time); })
	    .y1(function(d) { return ydrive(d.drive); });

	var areatransit = d3.area()
	    .x(function(d) { return x(d.time); })
	    .y1(function(d) { return ytransit(d.transit); });	    

	x.domain(d3.extent(data, function(d) { return d.time; }));
  	ydrive.domain([0, d3.max(data, function(d) { 
  		return d.drive; })]);
  	ytransit.domain([0, d3.max(data, function(d) { 
  		return d.drive; })]);

  	areadrive.y0(ydrive(0));
  	areatransit.y0(ytransit(0));

  	g.append("path")
      .datum(data)
      .attr("fill", "#0096d2")
      .attr("d", areadrive);

  	g.append("path")
      .datum(data)
      .attr("fill", "#fdbf11")
      .attr("d", areatransit);      

  	g.append("g")
      .attr("transform", "translate(0," + (height-margin.bottom) + ")")
      .call(d3.axisBottom(x).ticks(tickNum));

	g.append("text")
		.attr("class","axis-label")
    	.attr("transform", "translate(" + chartWidth/2 + "," + (height-margin.bottom+spacer+spacer+spacer+spacer) + ")")
		.text("Commute time in minutes") 

	// Functions!!!!

	var India = g.append("g")
		.attr("class","aveBar")
		.attr("transform", "translate(" + x(IndiaTime) +"," + (margin.top) + ")")

	var Skyler = g.append("g")
		.attr("class","aveBar")
		.attr("transform", "translate(" + x(SkyTime) +"," + (margin.top+chartHeight+spacer) + ")")		

	India.append("rect")
		.attr("x", x(IndiaTime))
		.attr("y", nameSpacer)
		.attr("x", 0)
		.attr("width", 3)
		.attr("height", (chartHeight-nameSpacer))
		.attr("fill","rgb(143,223,255");

	Skyler.append("rect")
		.attr("x", x(IndiaTime))
		.attr("y", nameSpacer)
		.attr("x", 0)
		.attr("width", 3)
		.attr("height", (chartHeight-nameSpacer))
		.attr("fill","rgb(248,231,28)");

	India.append("text")
		.attr("class","nametext")
		.attr("dy", "1em")
		.text("India")

	Skyler.append("text")
		.attr("class","nametext")
		.attr("dy", "1em")
		.text("Skyler")


	var nameTop = d3.select("body").append("div") 
	    .attr("class", "name")       
	    .html(htmlLLL)
	    .style("left", BigLabelXTop + "px")
	    .style("top", BigLabelYTop + "px"); 

	var nameBottom = d3.select("body").append("div") 
	    .attr("class", "name")       
	    .html("<p>Transit</p>")
	    .style("left", BigLabelXBottom + "px")
	    .style("top", BigLabelYBottom + "px"); 	   


	// What to do when we get to the map in the parent container
	pymChild.onMessage('arrival', onArrivalMessage);
	function onArrivalMessage(message){	
		// this fires on arrival from the parent
	}


}

  