var MakeFlower = function(top, left) {
  MakePlant.apply(this, arguments);
  console.log('making flower...');
  this.selectSpecies();
};

MakeFlower.prototype = Object.create(MakePlant.prototype);
MakeFlower.prototype.constructor = MakeFlower;

MakePlant.prototype.selectSpecies = function() {
  var basePath = './assets/';
  var species = ['flower-red.png', 'flower-blue.png'];
  var selectedSpecies = species[Math.floor(Math.random() * species.length)].toString();
  var flowerImg = '<img class="flower-img" src="' + basePath + selectedSpecies + '">';
  var stemmImg = '<img class="stemm-img" src="' + basePath + 'flower-stemm.png"></div>';
  $(flowerImg).hide().appendTo(this.$node).fadeIn(500).animate({
    'top': "-=50"
  }, 5000);


  $(stemmImg).hide().appendTo(this.$node).fadeIn(300).animate({
    'height': '+=50',
    'top': "-=50"
  }, 5000);

  // $(stemm).hide().appendTo(this.$node).fadeIn(500);

};

MakeFlower.prototype.grow = function() {
  MakePlant.prototype.grow.call(this);
  // this.$node.fadeToggle();
}