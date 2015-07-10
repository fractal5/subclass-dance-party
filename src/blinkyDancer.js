var MakeBlinkyDancer = function(top, left, timeBetweenSteps){
  MakeDancer.apply(this, arguments);
};

MakeBlinkyDancer.prototype = Object.create(MakeDancer.prototype);
MakeBlinkyDancer.prototype.constructor = MakeBlinkyDancer;

MakeBlinkyDancer.prototype.step = function() {
  MakeDancer.prototype.step.call(this);
  this.$node.fadeToggle();
}
