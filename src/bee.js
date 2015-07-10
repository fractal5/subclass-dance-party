var MakeBee = function(top, left, timeBetweenSteps, beeID) {
  MakeDancer.apply(this, arguments);
  this.beeID = beeID; // unique ID for each bee

  // randomize the bee movement in magnitude and speed
  this.stepSizeVertical = Math.floor(Math.random() * 5) + 5;
  this.stepSizeHorizontal = Math.floor(Math.random() * 10) + 5;
  this.beeSpeed = Math.floor(Math.random() * 100) + 100;

  this.move = true; // Should the bee move when 'step'ing?

  this.$node.addClass('bee');

  // randomly select a bee style
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

    // randomly select directions of movement for this step
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

// Called to make the bees stop moving for 'easy' mode
MakeBee.prototype.standStill = function() {
  this.move = false;
}

MakeBee.prototype.die = function(bee) {
  // Animate the bee death, and remove it from the
  // DOM and global bees list object
  (function($){
    bee.$node.addClass("animated hinge");
    bee.$node.delay(2000).fadeOut(300, function(){
      bee.$node.remove();
    });
  })(jQuery);

  delete window.bees[bee.beeID];
  window.beeCount--;
}

// A mouse click snipes the bee. Award points
// according to bee size -- more points for smaller bees.
MakeBee.prototype.setOnClick = function() {
  var bee = this;

  this.$node.on('click',function(event) {
    MakeBee.prototype.die(bee);

    var incrementPoints = 0;
    if ($(this).hasClass('beeOne')) {
      incrementPoints = 10;
    } else if ($(this).hasClass('beeTwo')) {
      incrementPoints = 5;
    } else if ($(this).hasClass('beeThree')) {
      incrementPoints = 1;
    }
    
    window.beeKillingPoints += incrementPoints;
    $('.counter').html(window.beeKillingPoints);
  });
};
