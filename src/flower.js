var MakeFlower = function(top, left){
  MakePlant.apply(this, arguments);
  console.log('making flower...');
};

MakeFlower.prototype = Object.create(MakePlant.prototype);
MakeFlower.prototype.constructor = MakeFlower;

MakeFlower.prototype.grow = function() {
  MakePlant.prototype.grow.call(this);
  // this.$node.fadeToggle();
}
