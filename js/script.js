function IS_DESKTOP(){
	return d3.select("#isDesktop").style("display") == "block";
}
function IS_TABLET(){
	return d3.select("#isTablet").style("display") == "block";
}
function IS_PHONE(){
	return d3.select("#isPhone").style("display") == "block";
}


// var waypoint = new Waypoint({
//   element: document.getElementById('main-content-text'),
//   handler: function() {
//     $(".follow-dot.india").toggleClass("moving")
//   },
//   offset: function(){
//     return 155;
//   }
// })

var offsetAmount = 230;

// When the user scrolls the page, execute myFunction 

$(document).ready(function(){

  // Get the india_dot
  var india_dot = document.getElementById("india-dot");
  // var skyler_dot = document.getElementById("skyler-dot");

  // Get the offset position of the india_dot
  var sticky = india_dot.offsetTop-offsetAmount;
  // var stickySky = skyler_dot.offsetTop-offsetAmount;

  window.onscroll = function() {stickyIndia()};

  // Add the sticky class to the india_dot when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function stickyIndia() {
    
    if (window.pageYOffset >= sticky) {    
      india_dot.classList.add("sticky")
      $("#india-dot").css('width', 18);
      $("#india-dot").css('height', 18);  
      $("#india-dot span").css('display',"none")
    } else {
      india_dot.classList.remove("sticky");
      $("#india-dot").css('width', 30);
      $("#india-dot").css('height', 30); 
      $("#india-dot span").css('display',"block") 
    }

    for (var i = 0; i < f.length; i++) {
      if (f[i] != "off") {
        if (window.pageYOffset >= f[i].start && window.pageYOffset <= (f[i].end+100)) {
          var op = f[i].direction[0] + (f[i].direction[1]*((f[i].end-window.pageYOffset)/f[i].distance));    
          if (f[i].type === "india") {
            $("#india-dot").css('opacity', op);  
          } else if(f[i].type === "sky") {
            $("#skyler-dot").css('opacity', op);  
          } else {
            $("#india-dot").css('opacity', op);
            $("#skyler-dot").css('opacity', op);  
          }
          
        }
      }
    }
  } 




})

var f = ["off","off","off","off","off","off","off","off","off","off","off","off"]

var wpf0 = new Waypoint({
  element: document.getElementById('fade0start'),
  handler: function() { 
    f[0] = {};
    f[0].start = document.getElementById('fade0start').offsetTop-offsetAmount;
    f[0].end = document.getElementById('fade0end').offsetTop-offsetAmount;
    f[0].distance = f[0].end - f[0].start;
    f[0].direction = [0,1];
    f[0].type = "india"
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf1 = new Waypoint({
  element: document.getElementById('fade1start'),
  handler: function() { 
    f[1] = {};
    f[1].start = document.getElementById('fade1start').offsetTop-offsetAmount;
    f[1].end = document.getElementById('fade1end').offsetTop-offsetAmount;
    f[1].distance = f[1].end - f[1].start;
    f[1].direction = [1,-1];
    f[1].type = "india"
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf2 = new Waypoint({
  element: document.getElementById('fade2start'),
  handler: function() { 
    f[2] = {};
    f[2].start = document.getElementById('fade2start').offsetTop-offsetAmount;
    f[2].end = document.getElementById('fade2end').offsetTop-offsetAmount;
    f[2].distance = f[2].end - f[2].start;
    f[2].direction = [0,1];
    f[2].type = "india"
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf3 = new Waypoint({
  element: document.getElementById('fade3start'),
  handler: function() { 
    f[3] = {};
    f[3].start = document.getElementById('fade3start').offsetTop-offsetAmount;
    f[3].end = document.getElementById('fade3end').offsetTop-offsetAmount;
    f[3].distance = f[3].end - f[3].start;
    f[3].direction = [0,1];
    f[3].type = "sky"
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf4 = new Waypoint({
  element: document.getElementById('fade4start'),
  handler: function() { 
    f[4] = {};
    f[4].start = document.getElementById('fade4start').offsetTop-offsetAmount;
    f[4].end = document.getElementById('fade4end').offsetTop-offsetAmount;
    f[4].distance = f[4].end - f[4].start;
    f[4].direction = [1,-1];
    f[4].type = "sky"
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf5 = new Waypoint({
  element: document.getElementById('fade5start'),
  handler: function() { 
    f[5] = {};
    f[5].start = document.getElementById('fade5start').offsetTop-offsetAmount;
    f[5].end = document.getElementById('fade5end').offsetTop-offsetAmount;
    f[5].distance = f[5].end - f[5].start;
    f[5].direction = [1,-1];
    f[5].type = "india"
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf6 = new Waypoint({
  element: document.getElementById('fade6start'),
  handler: function() { 
    f[6] = {};
    f[6].start = document.getElementById('fade6start').offsetTop-offsetAmount-100;
    f[6].end = document.getElementById('fade6end').offsetTop-offsetAmount;
    f[6].distance = f[6].end - f[6].start;
    f[6].direction = [0,1];
    f[6].type = "both"
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf7 = new Waypoint({
  element: document.getElementById('fade7start'),
  handler: function() { 
    f[7] = {};
    f[7].start = document.getElementById('fade7start').offsetTop-offsetAmount+50;
    f[7].end = document.getElementById('fade7end').offsetTop-offsetAmount;
    f[7].distance = f[7].end - f[7].start;
    f[7].direction = [1,-1];
    f[7].type = "both";
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf8 = new Waypoint({
  element: document.getElementById('fade8start'),
  handler: function() { 
    f[8] = {};
    f[8].start = document.getElementById('fade8start').offsetTop-offsetAmount;
    f[8].end = document.getElementById('fade8end').offsetTop-offsetAmount;
    f[8].distance = f[8].end - f[8].start;
    f[8].direction = [0,1];
    f[8].type = "both";
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf9 = new Waypoint({
  element: document.getElementById('fade9start'),
  handler: function() { 
    f[9] = {};
    f[9].start = document.getElementById('fade9start').offsetTop-offsetAmount;
    f[9].end = document.getElementById('fade9end').offsetTop-offsetAmount;
    f[9].distance = f[9].end - f[9].start;
    f[9].direction = [1,-1];
    f[9].type = "india";
  },
  offset: function(){
    return offsetAmount;
  }
})


var skyWaypoint = new Waypoint({
  element: document.getElementById('sky-dot-cont'),
  handler: function(direction) {
    var skyler_dot = document.getElementById("skyler-dot");
    if (direction === "down") {  
      skyler_dot.classList.add("sticky")
      $("#skyler-dot").css('width', 18);
      $("#skyler-dot").css('height', 18);  
      $("#india-dot").css('margin-left', -20);
      $("#skyler-dot span").css('display',"none")
      // $("#india-dot").css('height', 18);  
    } else {
      skyler_dot.classList.remove("sticky");
      $("#skyler-dot").css('width', 30);
      $("#skyler-dot").css('height', 30);  
      $("#india-dot").css('margin-left', 0);
      $("#skyler-dot span").css('display',"block")
    }
  },
  offset: function(){
    return offsetAmount;
  }
})


var map1waypoint = new Waypoint({
  element: document.getElementById('ff1'),
  handler: function() {    
    // send a message to the map1 child IF it hasn't been done yet (only send it first time. Then have play button on map?)
    pymParent1.sendMessage('arrival', "messageGoesHere");
  },
  offset: function(){
  	return offsetAmount;
  }
})

var map2waypoint = new Waypoint({
  element: document.getElementById('ff4'),
  handler: function() {    
    // send a message to the map1 child IF it hasn't been done yet (only send it first time. Then have play button on map?)
    pymParent4.sendMessage('arrival', "messageGoesHere");
    
  },
  offset: function(){
    return offsetAmount;
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
//   	return offsetAmount;
//   }
// })