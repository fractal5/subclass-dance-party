var MakeBee = function(top, left, timeBetweenSteps, beeID) {
  MakeDancer.apply(this, arguments);
  this.beeID = beeID;
  this.stepSizeVertical = Math.floor(Math.random() * 5) + 5;
  this.stepSizeHorizontal = Math.floor(Math.random() * 10) + 5;
  this.beeSpeed = Math.floor(Math.random() * 100) + 100;

  this.move = true;

  this.$node.addClass('bee');

  var beeClasses = ['beeOne', 'beeTwo', 'beeThree'];
  this.beeClass = Math.floor(Math.random() * beeClasses.length);
  this.$node.addClass(beeClasses[this.beeClass]);

  this.setOnClick();

};

MakeBee.prototype = Object.create(MakeDancer.prototype);
MakeBee.prototype.constructor = MakeBee;

MakeBee.prototype.step = function() { 

  MakeDancer.prototype.step.apply(this, arguments);

  if (this.move) {

    var directionHorizontal;
    var directionVertical;

    if (Math.round(Math.random())) { 
      directionHorizontal = '+=' + this.stepSizeHorizontal;
    } else {
      directionHorizontal = '-=' + this.stepSizeHorizontal;
    }
    if (Math.round(Math.random())) {
      directionVertical = '+=' + this.stepSizeVertical;
    } else {
      directionVertical = '-=' + this.stepSizeVertical;
    }

    $(this.$node).animate({
      'top' : directionVertical,
      'left' : directionHorizontal
    }, this.beeSpeed);
  }

};

MakeBee.prototype.standStill = function() {
  this.move = false;
}

MakeBee.prototype.die = function(that, bee) {
  console.log(that, bee);

  (function($){
    $(that).addClass("animated hinge");
    $(that).delay(2000).fadeOut(300, function(){
      $(that).remove();
    });
  })(jQuery);
  delete window.bees[bee.beeID];
  window.beeCount--;
  // console.log("Bee died at end game");
}

MakeBee.prototype.setOnClick = function() {
  var bee = this;
  this.$node.on('click',function(event) {
    MakeBee.prototype.die(this, bee);
    var incrementPoints = 0;
    if ($(this).hasClass('beeOne')) {
      incrementPoints = 10;
    }
    if ($(this).hasClass('beeTwo')) {
      incrementPoints = 5;
    }
    if ($(this).hasClass('beeThree')) {
      incrementPoints = 1;
    }
    window.beeKillingPoints += incrementPoints;
    $('.counter').html(window.beeKillingPoints);
  });
};
