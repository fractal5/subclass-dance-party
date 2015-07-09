// Creates and returns a new dancer object that can step

var MakeDancer = function(top, left, timeBetweenSteps){
  // this.$node = $('<span class="dancer"></span>');
  this.$node = $('<div class="dancer"></div>');
  this.timeBetweenSteps = timeBetweenSteps || 1000;
  this.step();
  this.setPosition(top, left);
  this.setMouseover();
};


MakeDancer.prototype.step = function() {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step

  // we need to bind this here
  // var that = this;
  var that = this;

  setTimeout(function(){this.step()}.bind(that), this.timeBetweenSteps);
};


MakeDancer.prototype.setPosition = function(top, left){
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  this.top = top || 0;
  this.left = left || 0;
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

MakeDancer.prototype.setMouseover = function() {
  this.$node.on('mouseover',function(event) {
    $(this).animate({
      'width' : '50',
      'height' : '50'
    }, 100);
  });
  this.$node.on('mouseout',function(event) {
    $(this).animate({
      'width' : '20',
      'height' : '20'
    }, 100);
  });
};
