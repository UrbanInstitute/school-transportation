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
	
d3.csv("data/poverty.csv", function(err, data) {	
	chartDraw(data);		
});

function chartDraw(data) {
	data.forEach(function(d){
		d.time = +d.time;
	})

	// initialize
    var margin = {top: 10, right: 100, bottom: 20, left: 130},
	width = parseInt(d3.select("#map").style("width")),
	// width = (parseInt(d3.select("#master_container").style("width")) > 1000) ? 1000 : parseInt(d3.select("#master_container").style("width")),
	height = 510;

	var labels = ["6th","","9th",""];
	var labels2 = ["Washington, DC","New York City","New Orleans","Detroit","Denver"];

	var colorScale = d3.scaleOrdinal()
		.domain(data)
		.range(["#0096d2","#a2d4ec"]);
	
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

	var chartHeight = ((groupHeight + gapBetweenGroups)*numOfgroups)+gapBetweenBars+gapBetweenBars+extraAxisGap;	

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
	    	var Yheight = (n*barHeight)+(Math.floor(n/2)*gapBetweenBars)+(Math.floor((n+1)/4)*gapBetweenGrades)+(Math.floor((n-1)/4)*gapBetweenGroups)+Math.floor((n+95)/100)*extraAxisGap+extraAxisGap;
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
	    	if (d.time < 0) {
	    		if (d.entry.substring(d.entry.length-3,d.entry.length) === "Low") {
					return "Data Unavailable"	    			
	    		} else {
	    			return ""
	    		}
	    	} else {
	    		return d.time + " mins" 	
	    	}
	    });	    

	bar.append("text")
	    .attr("class", "label")
	    .attr("x", function(d) { return - 10; })
	    .attr("y", function(d,i){
	    	return (barHeight / 2)+spacer-3;
		})
	    .attr("dy", ".35em")
	    .text(function(d,i) {
	      return labels[i % numPerGroup]
	    });

	bar.append("text")
	    .attr("class", "Biglabel")
	    .attr("x", function(d) { return - 90; })
	    .attr("y", groupHeight / 2)
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
      .attr("transform", "translate(" + spaceForLabelsLeft +"," + ((barHeight*4)+gapBetweenBars+gapBetweenBars+extraAxisGap+extraAxisGap) + ")")
      .call(d3.axisBottom(x).ticks(4));    


	var circ1 = g.append("g")
		.attr("transform", "translate(" + spaceForLabelsLeft +"," + (gapBetweenBars*2) + ")")
	
	var circ2 = g.append("g")
		.attr("transform", "translate(" + (spaceForLabelsLeft + 130) +"," + (gapBetweenBars*2) + ")")


	circ1.append("circle")      
      .attr("r",5)
      .attr("fill","#0096d2");

    circ1.append("text")
	    .attr("class", "povLabel")
	    .attr("x", 10)
	    .attr("y", 0)
	    .attr("dy", ".35em")
	    .text("Non Low-Income");	      

    circ2.append("circle")
	  .attr("r",5)
      .attr("fill","#a2d4ec")        

    circ2.append("text")
	    .attr("class", "povLabel")
	    .attr("x", 10)
	    .attr("y", 0)
	    .attr("dy", ".35em")
	    .text("Low-Income");	      

	// What to do when we get to the map in the parent container
	pymChild.onMessage('arrival', onArrivalMessage);
	function onArrivalMessage(message){	
		// this fires on arrival from the parent
	}


}

  