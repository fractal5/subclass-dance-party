var MakeColorDancer = function(top, left, timeBetweenSteps){
  MakeDancer.apply(this, arguments);
};

MakeColorDancer.prototype = Object.create(MakeDancer.prototype);
MakeColorDancer.prototype.constructor = MakeColorDancer;

MakeColorDancer.prototype.step = function() {
  MakeDancer.prototype.step.call(this);
  var colors = ['#129793', '#505050', '#FFF5C3', '#9BD7D5', '#FF7260'];
  var colorSettings = {
    'background': colors[Math.floor(Math.random() * colors.length)]
  };
  this.$node.css(colorSettings);
}
