function IS_DESKTOP(){
	return d3.select("#isDesktop").style("display") == "block";
}
function IS_TABLET(){
	return d3.select("#isTablet").style("display") == "block";
}
function IS_PHONE(){
	return d3.select("#isPhone").style("display") == "block";
}

var offsetAmount = 230;
width = parseInt($(window).width());
var dotInfo = {}
if (width > 768) {
  dotInfo.dotBig = 30;
  dotInfo.dotSmall = 18;
  dotInfo.letterDisp = "block";
  dotInfo.leftDot = -20;
} else {
  dotInfo.dotBig = 10;
  dotInfo.dotSmall = 10; 
  dotInfo.letterDisp = "none";
  dotInfo.leftDot = -11;
}

// When the user scrolls the page, execute myFunction 

$(document).ready(function(){

  // console.log(sff)
  // console.log(wpf2)

  // Get the india_dot
  var india_dot = document.getElementById("india-dot");
  // var skyler_dot = document.getElementById("skyler-dot");

  // Get the offset position of the india_dot
  var sticky = india_dot.offsetTop-offsetAmount;
  // var stickySky = skyler_dot.offsetTop-offsetAmount;

  window.onscroll = function() {stickyIndia()};

  // Add the sticky class to the india_dot when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function stickyIndia() {
    var outside = "true"

    // console.log(sff)

    if (window.pageYOffset >= sticky) {    
      india_dot.classList.add("sticky")
      $("#india-dot").css('width', dotInfo.dotSmall);
      $("#india-dot").css('height', dotInfo.dotSmall);  
      $("#india-dot span").css('display',"none")
    } else {
      india_dot.classList.remove("sticky");
      $("#india-dot").css('width', dotInfo.dotBig);
      $("#india-dot").css('height', dotInfo.dotBig); 
      $("#india-dot span").css('display',dotInfo.letterDisp) 
    }

    for (var i = 0; i < sff.length; i++) {
      if (sff[i] != "off") {
        // console.log("go")
        if (window.pageYOffset >= sff[i].start && window.pageYOffset <= (sff[i].end+100)) {
          outside = "false"

          var op = Math.max(.15, sff[i].direction[0] + (sff[i].direction[1]*((sff[i].end-window.pageYOffset)/sff[i].distance)));    
          console.log(op)
          if (sff[i].type === "india") {
            $("#india-dot").css('opacity', op);  
          } else if(sff[i].type === "sky") {
            $("#skyler-dot").css('opacity', op);  
          } else {
            $("#india-dot").css('opacity', op);
            $("#skyler-dot").css('opacity', op);  
          }
          
        }
      }    
    }

    // cut???
    if (outside === "true") {
      if ($("#india-dot").css('opacity') <= 0.3 && $("#india-dot").css('opacity') > 0) {
        $("#india-dot").css('opacity', 0);
      } else if ($("#india-dot").css('opacity') >= 0.7 && $("#india-dot").css('opacity') < 1) {
        $("#india-dot").css('opacity', 1);
      }
      if ($("#skyler-dot").css('opacity') <= 0.3 && $("#skyler-dot").css('opacity') > 0) {
        $("#skyler-dot").css('opacity', 0);
      } else if ($("#skyler-dot").css('opacity') >= 0.7 && $("#skyler-dot").css('opacity') < 1) {
        $("#skyler-dot").css('opacity', 1);
      }
    }

  } 




})

var sff = ["off","off","off","off","off","off","off","off","off","off","off","off"]

var wpf0 = new Waypoint({
  element: document.getElementById('fade0start'),
  handler: function() { 
    sff[0] = {};
    sff[0].start = document.getElementById('fade0start').offsetTop-offsetAmount;
    sff[0].end = document.getElementById('fade0end').offsetTop-offsetAmount;
    sff[0].distance = sff[0].end - sff[0].start;
    sff[0].direction = [0,1];
    sff[0].type = "india"
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf1 = new Waypoint({
  element: document.getElementById('fade1start'),
  handler: function() { 
    sff[1] = {};
    sff[1].start = document.getElementById('fade1start').offsetTop-offsetAmount;
    sff[1].end = document.getElementById('fade1end').offsetTop-offsetAmount;
    sff[1].distance = sff[1].end - sff[1].start;
    sff[1].direction = [1,-1];
    sff[1].type = "india"
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf2 = new Waypoint({
  element: document.getElementById('fade2start'),
  handler: function() { 
    sff[2] = {};
    sff[2].start = document.getElementById('fade2start').offsetTop-offsetAmount;
    sff[2].end = document.getElementById('fade2end').offsetTop-offsetAmount;
    sff[2].distance = sff[2].end - sff[2].start;
    sff[2].direction = [0,1];
    sff[2].type = "india"
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf3 = new Waypoint({
  element: document.getElementById('fade3start'),
  handler: function() { 
    sff[3] = {};
    sff[3].start = document.getElementById('fade3start').offsetTop-offsetAmount;
    sff[3].end = document.getElementById('fade3end').offsetTop-offsetAmount;
    sff[3].distance = sff[3].end - sff[3].start;
    sff[3].direction = [0,1];
    sff[3].type = "sky"
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf4 = new Waypoint({
  element: document.getElementById('fade4start'),
  handler: function() { 
    sff[4] = {};
    sff[4].start = document.getElementById('fade4start').offsetTop-offsetAmount;
    sff[4].end = document.getElementById('fade4end').offsetTop-offsetAmount;
    sff[4].distance = sff[4].end - sff[4].start;
    sff[4].direction = [1,-1];
    sff[4].type = "sky"
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf5 = new Waypoint({
  element: document.getElementById('fade5start'),
  handler: function() { 
    sff[5] = {};
    sff[5].start = document.getElementById('fade5start').offsetTop-offsetAmount;
    sff[5].end = document.getElementById('fade5end').offsetTop-offsetAmount;
    sff[5].distance = sff[5].end - sff[5].start;
    sff[5].direction = [1,-1];
    sff[5].type = "india"
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf6 = new Waypoint({
  element: document.getElementById('fade6start'),
  handler: function() { 
    sff[6] = {};
    sff[6].start = document.getElementById('fade6start').offsetTop-offsetAmount-100;
    sff[6].end = document.getElementById('fade6end').offsetTop-offsetAmount;
    sff[6].distance = sff[6].end - sff[6].start;
    sff[6].direction = [0,1];
    sff[6].type = "both"
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf7 = new Waypoint({
  element: document.getElementById('fade7start'),
  handler: function() { 
    sff[7] = {};
    sff[7].start = document.getElementById('fade7start').offsetTop-offsetAmount+50;
    sff[7].end = document.getElementById('fade7end').offsetTop-offsetAmount;
    sff[7].distance = sff[7].end - sff[7].start;
    sff[7].direction = [1,-1];
    sff[7].type = "both";
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf8 = new Waypoint({
  element: document.getElementById('fade8start'),
  handler: function() { 
    sff[8] = {};
    sff[8].start = document.getElementById('fade8start').offsetTop-offsetAmount;
    sff[8].end = document.getElementById('fade8end').offsetTop-offsetAmount;
    sff[8].distance = sff[8].end - sff[8].start;
    sff[8].direction = [0,1];
    sff[8].type = "both";
  },
  offset: function(){
    return offsetAmount;
  }
})

var wpf9 = new Waypoint({
  element: document.getElementById('fade9start'),
  handler: function() { 
    sff[9] = {};
    sff[9].start = document.getElementById('fade9start').offsetTop-offsetAmount;
    sff[9].end = document.getElementById('fade9end').offsetTop-offsetAmount;
    sff[9].distance = sff[9].end - sff[9].start;
    sff[9].direction = [1,-1];
    sff[9].type = "india";
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
      $("#skyler-dot").css('width', dotInfo.dotSmall);
      $("#skyler-dot").css('height', dotInfo.dotSmall);  
      $("#india-dot").css('margin-left', dotInfo.leftDot);
      $("#skyler-dot span").css('display',"none")
    } else {
      skyler_dot.classList.remove("sticky");
      $("#skyler-dot").css('width', dotInfo.dotBig);
      $("#skyler-dot").css('height', dotInfo.dotBig);  
      $("#india-dot").css('margin-left', 0);
      $("#skyler-dot span").css('display',dotInfo.letterDisp)
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