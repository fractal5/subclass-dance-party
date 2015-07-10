$(document).ready(function() {

  window.dancers = [];

  window.plants = {};
  window.plants.flowers = [];

  window.bees = {};
  window.beeId = 0; // generate unique IDs per bee created
  window.beeCount = 0;
  window.beeKillingPoints = 0; // score for successfully sniping bees


  // Create a specified number of flowers, placed toward the bottom
  // of the window.
  var flowerFactory = function(numberOfFlowers) {
    for (var i = 0; i < numberOfFlowers; i++) {
      var flower = new MakeFlower(
        ($("body").height() / 4) * 3 + ($("body").height() / 4) * Math.random(),
        $("body").width() * Math.random()
      );
      window.plants.flowers.push(flower);
      $('body').append(flower.$node);      
    }
  };

  // Create a specified number of bees, currently placed in ~ the
  // bottom half of the window.
  var beeFactory = function(numberOfBees) {
    for (var i = 0; i < numberOfBees; i++) {
      var bee = new MakeBee(
        ($("body").height() / 2) + ($("body").height() / 2) * Math.random(),
        $("body").width() * Math.random(),
        Math.random() * 1000, 
        window.beeId
      );
      window.bees[window.beeId] = bee;
      window.beeId++;
      window.beeCount++;
      $('body').append(bee.$node);
    } 
  };

  // Set up the "Add Flower" button
  $(".addFlower").on("click", function(event) {
    flowerFactory(1); 
  });

  // Set up the "Add Bee" button
  $(".addBee").on("click", function(event) {
    beeFactory(1);
  });

  $(".addDancerButton").on("click", function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     * dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
     
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );

    window.dancers.push(dancer);
    $('body').append(dancer.$node);
  });

  $(".classLineUp").on("click", function(event) {
    var width = $(window).width();
    for (var i = 0; i < window.dancers.length; i++) {
      var newLeft = (width / window.dancers.length) * (i + 1);
      var newTop = 100;
      window.dancers[i].setPosition(newTop, newLeft);
    }

  });

  // The Bee Lineup function correlates with Easy Mode play,
  // where the bees are brought into a line, and stop moving around.
  // TODO: stop making new bees when entering Easy Mode.
  $(".beeLineUp").on("click", function(event) {
    var width = $(window).width();
    var i = 0;

    // Stop the bee from moving before lining up.
    // For some unknown reason (probably related to timing of 
    // operations?), selecting all the bees once outside the
    // loop and stopping doesn't result in all the bee 
    // movement animations stopping. Thus, we stop bees within
    // the loop.
    for (var k in window.bees) {
      window.bees[k].standStill();
      $('.bee').stop();
      var newLeft = (width / window.beesCount) * (i + 1);
      var newTop = 100;
      window.bees[k].setPosition(newTop, newLeft);
      i++;
    }
    $('.bee').stop();

  });

  // Set up all the necessary game state at the start of a game.
  var setupGame = function() {
    window.beeKillingPoints = 0;
    $('.counter').html('0');
    if ($('.gameOver')) {
      $('.gameOver').remove();
    }
    // add some flowers
    flowerFactory(8);
    // add starting bees
    beeFactory(20);    
  };

  // Perform all the required changes and cleanup for the end of a game,
  // including displaying a 'Game Over' overlay.
  var endGame = function() {
    var gameOverDiv = '<div class="gameOver"></div>';
    $('body').append(gameOverDiv);

    var gameOverDivContent = '<center><div>Game Over</div><div class="score">'+window.beeKillingPoints+'</div></center>';
    $(gameOverDivContent).appendTo($('.gameOver')); 

    // kill all remaining bees
    for (var k in window.bees) {
      window.bees[k].die(window.bees[k]);
    }
    window.bees = {};
    window.beeCount = 0;

    // remove flowers
    for (var i = 0; i < window.plants.flowers.length; i++) {
      window.plants.flowers[i].$node.remove();
    }

  };

  // Click handler to kick off a new game!
  $('.startGame').on('click', function(event){
    var i;
    var timeIncr = 0;
    var timeAlotted = 60; // 60 sec per game

    setupGame();

    // Update a countdown timer each second, and
    // create some extra bees. Once time runs out,
    // end the game.
    var timer = setInterval(function() {
      timeIncr++; 
      $('.timer').html(timeAlotted - timeIncr); 

      // add bees
      beeFactory(2);

      // time is up!
      // TODO: change 5 to timeAlotted
      if (5 - timeIncr === -1) {
        clearInterval(timer); 
        endGame();
      }
    }, 1000);

  });


  // Check if two bees are close to each other
  var beesAreClose = function (beeOne, beeTwo) {
    if (beeOne === beeTwo) {
      return false;
    }

    var beeOnePos = beeOne.$node.position();
    var beeTwoPos = beeTwo.$node.position();

    if (Math.abs(beeOnePos.left - beeTwoPos.left) < 50 &&
        Math.abs(beeOnePos.top - beeTwoPos.top) < 50) {
      return true;
    } else {
      return false;
    }
  };

  // If two bees get close to each other, perform
  // a little animation to show that they bumped into each other
  var checkBeeProximity = function() {

    for (var k in window.bees) {
      for (var m in window.bees) {
        if (beesAreClose(window.bees[k], window.bees[m])) {

          $(window.bees[k].$node).addClass('animated jello');
          $(window.bees[k].$node).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated jello');
          });

        }
      }
    }
  };

  // set up a continuous check for bees that are in close proximity
  // to each other
  setInterval(checkBeeProximity, 1000);

});