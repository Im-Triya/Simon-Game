
var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;

$("body").keypress(function()
{
    nextSequence();
});


function nextSequence()
{
    userClickedPattern=[];

    level++;

    $("h1").text("Level : "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    // $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    console.log(randomChosenColor);
    
}

$(".btn").click(function()
{
    
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);

    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(color)
{
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function()
    {
        $("#"+currentColor).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log("SUCCESS");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(nextSequence,1000);
        }

    }

    else
    {
        console.log("Wrong");
        $("body").addClass("game-over");
        $("h1").text("Khel Khatam, press any key to restart");

        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },1000);

        startOver();
    }
}

function startOver()
{
    level=0;
    gamePattern=[];
}