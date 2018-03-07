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
	
d3.csv("data/race2.csv", function(err, data) {	
	chartDraw(data);		
});

function chartDraw(data) {
	data.forEach(function(d){
		d.value = +d.value;
	})

	// initialize
	var breakpoint = 768 - 40,
		width = parseInt(d3.select("#map").style("width"));

	var labels = ["White","Black","Hispanic","Asian"];
	var labels2 = ["9th","","",""];
	var labels3 = ["Washington, DC","New York City","New Orleans","Detroit","Denver"];


	var gapBetweenBars = 5,
		gapBetweenGrades = 0,
		extraAxisGap = 0,
		numOfRecs = data.length,
		barHeight = 10,
		numOfgroups = labels3.length,
		numPerGroup = numOfRecs / (numOfgroups),
    	spacer = 10;

	if (width > breakpoint) {
		var margin = {top: 10, right: 100, bottom: 20, left: 130},
			height = 425,
			gapBetweenGroups = 20,
			spaceForLabelsLeft   = 80,
			spaceForLabelsRight = 30,
			groupHeight = (barHeight*numPerGroup)+(gapBetweenBars*(numPerGroup-2)+gapBetweenGrades),
	    	BigLabelX = -100,
	    	BigLabelY = (barHeight*3)-5;

	} else {
		var margin = {top: 10, right: 40, bottom: 10, left: 30},
			height = 425,
			gapBetweenGroups = 40,
			spaceForLabelsLeft   = 30,
			spaceForLabelsRight = 30,
			groupHeight = (barHeight*numPerGroup)+(gapBetweenBars*(numPerGroup-2)+gapBetweenGrades),
			BigLabelX = 0,
	    	BigLabelY = -15;
	}

	var chartHeight = ((groupHeight + gapBetweenGroups)*numOfgroups)+gapBetweenBars+gapBetweenBars;	
	var colorScale = d3.scaleOrdinal()
		// .domain(data)
		.range(["#fdbf11","#0a4c6a","#ec008b","#000000"]);

	// console.log(chartHeight)

  	// var chartHeight = ((height - margin.top - margin.bottom)-((numOfRecs)*spacer)) / numOfRecs;
  	var chartWidth = width - margin.left-margin.right;

	var x = d3.scaleLinear()
	    .domain([0, d3.max(data,function(d){
	    	return d.value;
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
	    	var Yheight = margin.top + spacer + (n*barHeight)+((n-Math.floor((n+3)/4))*gapBetweenBars)+(Math.floor((n-1)/4)*gapBetweenGrades)+(Math.floor((n-1)/4)*gapBetweenGroups);
	      	return "translate(" + spaceForLabelsLeft + "," + Yheight + ")";
	    });	

	bar.append("rect")
	    .attr("fill", function(d,i) { 
	    	return colorScale(i);})
	    .attr("class", "bar")
	    .attr("width", function(d){
	    	// console.log(x(d.time));
	    	if (d.value < 0) {
	    		// console.log('here')
				return 0
	    	} else {
	    		return x(d.value);
	    	}
	    })
	    .attr("height", barHeight);

	bar.append("text")
		.attr("class","afterText")
	    .attr("x", function(d) { 
	    	if (d.value < 0) {
				return 0
	    	} else {
	    		return x(d.value) + spacer;
	    	}
	    })
	    .attr("y", function(d){
	    	if (d.value < 0) {
	    		return barHeight / 2 - 8;
	    	} else {
	    		return barHeight / 2
	    	}	    	
	    })
	    .attr("dy", ".35em")
	    .text(function(d) { 
	    	if (d.value <= 0) {
	    		// if (d.entry.substring(d.entry.length-3,d.entry.length) === "Low") {
					return "Data Unavailable"	    			
	    		// } else {
	    			// return ""
	    		// }
	    	} else {
	    		return d.value + " mins" 	
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
	      return labels[i % (numPerGroup)]
	    });  

	bar.append("text")
	    .attr("class", "Biglabel")
	    .attr("x", BigLabelX)
	    .attr("y", BigLabelY)
	    .attr("dy", ".35em")
	    .text(function(d,i) {
	    	if (i % numPerGroup === 0)
		        return labels3[i % numOfgroups];
		      else
		        return ""
		});	      
	    
	// bar.append("text")
	//     .attr("class", "Biglabel")
	//     .attr("x", function(d) { return - 100; })
	//     .attr("y", 5)
	//     .attr("dy", ".35em")
	//     .text(function(d,i) {
	//     	return labels2[i % numPerGroup]
	// 	});	 


  	g.append("g")
      .attr("transform", "translate(" + spaceForLabelsLeft +"," + (chartHeight+margin.top+spacer+spacer) + ")")
      .call(d3.axisBottom(x).ticks(4));    


	// What to do when we get to the map in the parent container
	pymChild.onMessage('arrival', onArrivalMessage);
	function onArrivalMessage(message){	
		// this fires on arrival from the parent
	}


}