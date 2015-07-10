var MakePlant = function(top, left) {
  // 'top' represents the flower; 'bottom' represents the stem, which will grow in height
  this.$node = $('<div class="plant"><div class="top"></div><div class="bottom"></div></div>');
  this.setPosition(top, left);
};

MakePlant.prototype.setPosition = function(top, left) {
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