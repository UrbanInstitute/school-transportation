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
	console.log(data)
	data.forEach(function(d){
		d.time = +d.time;
		d.transit = +d.transit;
		d.drive = +d.drive;
	})

	// initialize
    var margin = {top: 10, right: 100, bottom: 20, left: 90},
	width = parseInt(d3.select("#map").style("width")),
	// width = (parseInt(d3.select("#master_container").style("width")) > 1000) ? 1000 : parseInt(d3.select("#master_container").style("width")),
	height = 200;

	var svg = d3.select("#map").append("svg")
	    .attr("width", width)
	    .attr("height", height);

  	// declare main g and stuff
  	// var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  	var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + 0 + ")");

  	var spacer = 10;
  	var numOfRecs = 2;
  	var chartHeight = ((height - margin.top - margin.bottom)-((numOfRecs)*spacer)) / numOfRecs;
  	var chartWidth = width - margin.left-margin.right;

	var x = d3.scaleLinear()
	    .rangeRound([0, chartWidth]);

	var ydrive = d3.scaleLinear()
	    .rangeRound([(chartHeight+margin.top), margin.top]);

	var ytransit = d3.scaleLinear()
	    .rangeRound([((2*chartHeight)+spacer+margin.top), (margin.top+chartHeight+spacer)]);

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
      .call(d3.axisBottom(x).ticks(20));

	// Functions!!!!
	var contents = "<p>Mean Time</p><h2>XX mins</h2>";
	var meanTop = d3.select("body").append("div") 
	    .attr("class", "meanTime")       
	    .html(contents)
	    .style("left", width - margin.right + spacer + "px")
	    .style("top", margin.top+spacer+spacer + "px"); 
	    // This is from the above calculation (see notebook) PLUS two spacers

	var meanBottom = d3.select("body").append("div") 
	    .attr("class", "meanTime")       
	    .html(contents)
	    .style("left", width - margin.right + spacer + "px")
	    .style("top",margin.top+chartHeight+spacer+spacer+spacer + "px"); 

	var nameTop = d3.select("body").append("div") 
	    .attr("class", "name")       
	    .html("<p>Driving<br>with Traffic</p>")
	    .style("left", spacer + "px")
	    .style("top", margin.top+spacer+spacer+spacer + "px"); 

	var nameBottom = d3.select("body").append("div") 
	    .attr("class", "name")       
	    .html("<p>Transit</p>")
	    .style("left", spacer + "px")
	    .style("top",margin.top+chartHeight+spacer+spacer+spacer+spacer + "px"); 	    


    function update() {
     	// update featured element;
        // featureElement.attr("d",path);        
    }	

    // Event Listeners
    // On page resize, update the view

    update()



	// What to do when we get to the map in the parent container
	pymChild.onMessage('arrival', onArrivalMessage);
	function onArrivalMessage(message){	
		// this fires on arrival from the parent
	}


}

  