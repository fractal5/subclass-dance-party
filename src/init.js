$(document).ready(function() {
  window.dancers = [];

  window.plants = {};
  window.plants.flowers = [];

  window.bees = {};
  window.beeId = 0;
  window.beeCount = 0;
  window.beeKillingPoints = 0;


  var flowerFactory = function(numberOfFlowers) {
    for (var i = 0; i < numberOfFlowers; i++) {
      var flower = new MakeFlower(
        ($("body").height() / 3) * 2 + ($("body").height() / 3) * Math.random(),
        $("body").width() * Math.random()
      );
      window.plants.flowers.push(flower);
      $('body').append(flower.$node);      
    }
  };

  var beeFactory = function(numberOfBees) {
    for (var i = 0; i < numberOfBees; i++) {
      var bee = new MakeBee(
        ($("body").height() / 2) + ($("body").height() / 2) * Math.random(),
        $("body").width() * Math.random(),
        Math.random() * 1000, 
        window.beeId
      );
      // window.bees.push(bee);
      window.bees[window.beeId] = bee;
      window.beeId++;
      console.dir(bee);
      window.beeCount++;
      $('body').append(bee.$node);
    } 
    console.log(window.beeCount, window.bees);
  };

  $(".addFlower").on("click", function(event) {
    flowerFactory(1); 
  });

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
     */

    /* dancerMakerFunctionName is a string which must match
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

  $(".BeeLineUp").on("click", function(event) {
    var width = $(window).width();
    for (var k in window.bees) {
      // Stop the bee from moving before lining up.
      window.bees[k].standStill();
      $('.bee').stop();
      var newLeft = (width / window.beesCount) * (i + 1);
      var newTop = 100;
      window.bees[k].setPosition(newTop, newLeft);
    }
    $('.bee').stop();

  });

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

  var endGame = function() {
    var gameOverDiv = '<div class="gameOver"></div>';
    $('body').append(gameOverDiv);
    var gameOverDivContent = '<center><div>Game Over</div><div class="score">'+window.beeKillingPoints+'</div></center>';
    $(gameOverDivContent).appendTo($('.gameOver')); 
    // overlay screen with semitransparent 

    // kill all remaining bees
    for (var k in window.bees) {
      window.bees[k].die(window.bees[k].$node, window.bees[k]);
    }

    for (var i = 0; i < window.plants.flowers.length; i++) {
      window.plants.flowers[i].$node.remove();
    }

    window.bees = {};
    window.beeCount = 0;


  };

  $('.startGame').on('click', function(event){
    // setInterval to execute function that will update countdown label
    // and ends game when time is up.

    // setup game
    setupGame();

    var i;
    var incr = 0;



    var timer = setInterval(function() {
      console.log("1 sec passed");
      incr++; 
      $('.timer').html(60 - incr);
      // add bees
      beeFactory(2);
      if (5 - incr ===-1) {

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
    // console.log("beeOnePos: ", beeOnePos, " beeTwoPos: ", beeTwoPos);

    if (Math.abs(beeOnePos.left - beeTwoPos.left) < 50 &&
        Math.abs(beeOnePos.top - beeTwoPos.top) < 50) {
      // console.log('close');
      return true;
    } else {
      return false;
    }
  };

  var checkBeeProximity = function() {

    for (var k in window.bees) {
      for (var m in window.bees) {
        if (beesAreClose(window.bees[k], window.bees[m])) {
          console.log("found bees in close proximity ", window.bees[k], window.bees[m]);

          console.log(window.bees[k].$node);

          $(window.bees[k].$node).css({'transform' : 'rotate(360deg)'});

          // window.bees[k].$node.css({'transform' : 'rotate(360deg)'});
          // window.bees[m].$node.css.transform = "rotate(360deg)";
          // do something to both bees.
        }
      }
    }
  };


  // set up a continuous check for bees that are in close proximity
  // to each other
  setInterval(checkBeeProximity, 1000);

});