
var myChoice = prompt("Do you choose rock, paper or scissors?");
var sysChoice = Math.random();


if (sysChoice < 0.34) {
    sysChoice = "rock"
} else if (sysChoice < 0.67) {
    sysChoice = "paper"
}
else {
    sysChoice = "scissors"
}
var result = function (comp, my) {
    if (comp == my) {
        return "its a tie!"

    } else if (comp == "rock" && my == "paper" || comp == "paper" && my == "scissor" || comp == "scissor" && my == "rock") {
        return "You win"
    }
    else {
        return "Computer Wins"
    }
}
alert(result(sysChoice, myChoice).toString());
