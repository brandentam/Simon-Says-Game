var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gameAlreadyStarted = 0;
var highScore = 0;
$(document).on("keydown", function(){
  if (gameAlreadyStarted == 0){
    $("h1").text("Level " + level);
    $("h3").text("High Score: " + highScore);
    nextSequence();
    gameAlreadyStarted = 1;
  }

})



$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

  console.log(userClickedPattern);
})

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    if (currentLevel +1 == gamePattern.length){
      if (level > highScore){
        $("h3").text("High Score: " + level);
        highScore = level;
      }

      $("body").addClass("correct");

      setTimeout(function(){
        $("body").removeClass("correct");
      }, 200);

      setTimeout(function(){
        userClickedPattern = [];
        nextSequence();
      }, 800)
    }
    console.log("correct");
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    startOver();

    $("h1").text("Game Over, Press Any Key to Restart");
    console.log("wrong");
  }

}

function startOver(){
  gameAlreadyStarted = 0;
  gamePattern = [];
  level = 0;
  userClickedPattern = [];
}
function playSound(colour){
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
function nextSequence(){
  level++;
  $("h1").text("Level " + level);
  var num = Math.floor((Math.random() *4 ));

  var randomChosenColour = buttonColours[num];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}
