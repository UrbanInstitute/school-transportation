function IS_DESKTOP(){
	return d3.select("#isDesktop").style("display") == "block";
}
function IS_TABLET(){
	return d3.select("#isTablet").style("display") == "block";
}
function IS_PHONE(){
	return d3.select("#isPhone").style("display") == "block";
}


var waypoint = new Waypoint({
  element: document.getElementById('main-content-text'),
  handler: function() {
    $(".follow-dot.india").toggleClass("active")
  }
})