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
	
d3.csv("data/cityaverages.csv", function(err, data) {	
	chartDraw(data);		
});

function chartDraw(data) {
	data.forEach(function(d){
		d.time = +d.time;
	})

	console.log(data)

	// initialize
    var margin = {top: 10, right: 100, bottom: 20, left: 130},
	width = parseInt(d3.select("#map").style("width")),
	// width = (parseInt(d3.select("#master_container").style("width")) > 1000) ? 1000 : parseInt(d3.select("#master_container").style("width")),
	height = 240;

	var labels = ["6th","9th"];
	var labels2 = ["Washington, DC","New York City","New Orleans","Detroit","Denver"];

	var colorScale = d3.scaleOrdinal()
		.range(["#0096d2","#fdbf11"]);
	
	var gapBetweenBars = 5,
		gapBetweenGrades = 10,
		gapBetweenGroups = 20,
		extraAxisGap = 30,
		numOfRecs = data.length,
		barHeight = 10,
		numOfgroups = labels2.length,
		numPerGroup = numOfRecs / numOfgroups,
		spaceForLabelsLeft   = 70,
		spaceForLabelsRight = 30,
    	spacer = 10,
    	groupHeight = (barHeight*numPerGroup)+(gapBetweenBars*(numPerGroup-2)+gapBetweenGrades);

	var chartHeight = ((groupHeight + gapBetweenGroups)*(numOfgroups-1))+extraAxisGap+(spacer);	

	console.log(chartHeight)

  	// var chartHeight = ((height - margin.top - margin.bottom)-((numOfRecs)*spacer)) / numOfRecs;
  	var chartWidth = width - margin.left-margin.right;

	var x = d3.scaleLinear()
	    .domain([0, d3.max(data,function(d){
	    	return d.time;
	    })])
	    .range([0, chartWidth-(spaceForLabelsLeft+spaceForLabelsRight)]);

	var svg = d3.select("#map").append("svg")
	    .attr("width", width)
	    .attr("height", chartHeight + margin.top + (3*margin.bottom));	  

  	// declare main g and stuff
  	var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + 0 + ")");

  	var bar = g.selectAll("g")
	    .data(data)
	    .enter().append("g")
	    .attr("transform", function(d, i) {
	    	// console.log(0.5 + Math.floor(i/numPerGroup))
	    	var n = i+1;
	    	var Yheight = (n*barHeight)+(Math.floor(n/2)*gapBetweenBars)+(Math.floor((n+1)/4)*gapBetweenGrades)+(Math.floor((n-1)/4)*gapBetweenGroups)+Math.floor((n+97)/100)*extraAxisGap+extraAxisGap;
	      	return "translate(" + spaceForLabelsLeft + "," + Yheight + ")";
	    });	

	bar.append("rect")
	    .attr("fill", function(d,i) { 
	    	return colorScale(i);})
	    .attr("class", "bar")
	    .attr("width", function(d){
	    	// console.log(x(d.time));
	    	if (d.time < 0) {
	    		// console.log('here')
				return 0
	    	} else {
	    		return x(d.time);
	    	}
	    })
	    .attr("height", barHeight);

	bar.append("text")
		.attr("class","afterText")
	    .attr("x", function(d) { 
	    	if (d.time < 0) {
				return 0
	    	} else {
	    		return x(d.time) + spacer;
	    	}
	    })
	    .attr("y", function(d){
	    	if (d.time < 0) {
	    		return barHeight / 2 - 8;
	    	} else {
	    		return barHeight / 2
	    	}	    	
	    })
	    .attr("dy", ".35em")
	    .text(function(d) { 
	    	if (d.time <= 0) {
				return "Data Unavailable"	    			
	    	} else {
	    		return d.time + " mins" 	
	    	}
	    });	    

	bar.append("text")
	    .attr("class", "label")
	    .attr("x", function(d) { return - 10; })
	    .attr("y", function(d,i){
	    	return (barHeight / 2);
		})
	    .attr("dy", ".35em")
	    .text(function(d,i) {
	      return labels[i % numPerGroup]
	    });

	bar.append("text")
	    .attr("class", "Biglabel")
	    .attr("x", function(d) { return - 50; })
	    .attr("y", 5)
	    .attr("dy", ".35em")
	    .text(function(d,i) {
	    	if (i % numPerGroup === 0)
		        return labels2[i % numOfgroups];
		      else
		        return ""
		});	      
	    

  	g.append("g")
      .attr("transform", "translate(" + spaceForLabelsLeft +"," + (chartHeight+margin.bottom) + ")")
      .call(d3.axisBottom(x).ticks(4));    

    g.append("g")
      .attr("transform", "translate(" + spaceForLabelsLeft +"," + ((barHeight*2)+gapBetweenBars+gapBetweenBars+gapBetweenBars+gapBetweenBars+extraAxisGap) + ")")
      .call(d3.axisBottom(x).ticks(4));    	      

	// What to do when we get to the map in the parent container
	pymChild.onMessage('arrival', onArrivalMessage);
	function onArrivalMessage(message){	
		// this fires on arrival from the parent
	}


}

  