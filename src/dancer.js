// Creates and returns a new dancer object that can step

var MakeDancer = function(top, left, timeBetweenSteps){
  this.$node = $('<div class="dancer"></div>');
  this.timeBetweenSteps = timeBetweenSteps || 1000;
  this.step();
  this.setPosition(top, left);
};


MakeDancer.prototype.step = function() {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  var that = this;

  // The timeout callback function is bound to the dancer object
  // on which step is called.
  setTimeout(function(){this.step()}.bind(that), this.timeBetweenSteps);
};


MakeDancer.prototype.setPosition = function(top, left){
  // Use css top and left properties to position our <div> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  this.top = top || 0;
  this.left = left || 0;
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

