var MakeFlower = function(top, left) {
  MakePlant.apply(this, arguments);
  this.selectSpecies();
};

MakeFlower.prototype = Object.create(MakePlant.prototype);
MakeFlower.prototype.constructor = MakeFlower;

MakePlant.prototype.selectSpecies = function() {
  var basePath = './assets/';
  var species = ['flower-red.png', 'flower-blue.png', 'flower-yellow.png', 'flower-pink.png'];
  var selectedSpecies = species[Math.floor(Math.random() * species.length)].toString();
  
  var flowerImg = '<img class="flower-img" src="' + basePath + selectedSpecies + '">';
  var stemmImg = '<img class="stemm-img" src="' + basePath + 'flower-stemm.png"></div>';
  
  // Slowly let the flower grow
  $(flowerImg).hide().appendTo(this.$node).fadeIn(500).animate({
    'top': "-=20"
  }, 5000);

  $(stemmImg).hide().appendTo(this.$node).fadeIn(500).animate({
    'height': '+=20',
    'top': "-=20"
  }, 5000);
};

