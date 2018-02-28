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

var map1waypoint = new Waypoint({
  element: document.getElementById('ff1'),
  handler: function() {    
    // send a message to the map1 child IF it hasn't been done yet (only send it first time. Then have play button on map?)
    pymParent1.sendMessage('arrival', "messageGoesHere");
    
  },
  offset: function(){
  	return 230;
  }
})

var map2waypoint = new Waypoint({
  element: document.getElementById('ff4'),
  handler: function() {    
    // send a message to the map1 child IF it hasn't been done yet (only send it first time. Then have play button on map?)
    pymParent4.sendMessage('arrival', "messageGoesHere");
    
  },
  offset: function(){
    return 230;
  }
})

pymParent5.onMessage('hover', onHover);

function onHover(ward){ 
    pymParent6.sendMessage('hover', ward);  
  }

// var map3waypoint = new Waypoint({
//   element: document.getElementById('ff3'),
//   handler: function() {    
//     // send a message to the map1 child IF it hasn't been done yet (only send it first time. Then have play button on map?)
//     pymParent3.sendMessage('arrival', "messageGoesHere");
    
//   },
//   offset: function(){
//   	return 230;
//   }
// })