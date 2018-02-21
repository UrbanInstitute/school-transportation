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
	mapDraw(data);		
});

function mapDraw(wards) {

	// initialize
    // var container = map.getCanvasContainer()
    var svg = d3.select("#map").append("svg")

  	// declare main g and stuff

	var featureElement = svg.selectAll("path")
		.data(wards)
		.enter()
		.append("path")		
		.attr("class",function(d){
			return "wardmap ward w" + d.properties.WARD;
		})
		.on("mouseover", function(d) {
            d3.select(this).classed("active", true);
            createTooltip(d)
        })
        .on("mouseout", function() {
            // d3.select(this).classed("active", false);            	
            // removeTooltip()
        })

	var tooltip = d3.select("body").append("div") 
	    .attr("class", "tooltip")       
	    .style("opacity", 0.9);


	// Functions!!!!

	function createTooltip(d) {
		
		
        // var contents = "<strong>" + drugtypeIndex(d.drugtype) + ", " + d.Year + " Q" + d.Qtr + "</strong><br>Units Sold: <span style='color:rgb(253, 191, 17)'>" + formatNum(d.units) + "</span><br>Amount Spent: <span style='color:rgb(253, 191, 17)'>$" + formatNum(d.adjmedamt) + "</span>";
        // var contents = "<div><h2> Ward" + d.properties.WARD + "</h2><p>Total Population: " + d.properties.POP_2010 + "</p><p>Number of Students: XXX</p><p>percent of students in poverty</p></div>";

        tooltip.html(contents);

        tooltip.classed("top",true)
        //     .style("left", function(d){
        //     	// console.log(centroid[0])
        //     	return (centroid[0] - 100) + "px";
        //     })   
      		// .style("top", function(d){
      		// 	// console.log(centroid[1])
      		// 	return (centroid[1] - 70) + "px";
      		// });  
	}

	function removeTooltip() {
		tooltip.style("left", "-1000px").style("top","-1000px"); 
	  	tooltip.classed("top",false);
	  	tooltip.classed("bottom",false);
	}

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

  