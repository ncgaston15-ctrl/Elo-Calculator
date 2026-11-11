/*
Elo Calculator - script.js 
Copyright (c) 2026 Nathanial Gaston
Licensed under the MIT License. See the LICENSE.txt file for details.
*/

function calcElo(){
    // declare varables
    const textBox1 = document.getElementById("elo1");
    const textBox2 = document.getElementById("elo2");
    const messageDisplay = document.getElementById("message");
    const selectedRadio = document.querySelector('input[name="winLose"]:checked');

    // input validation
    if (!selectedRadio) {
        messageDisplay.textContent = "Please enter values and select an outcome.";
        messageDisplay.style.color = "red";
        return;
    }

    // win, loss, draw values
    let s1 = 0;
    let s2 = 0;

    if (selectedRadio.value === "win") {
        s1 = 1
        s2 = 0;
    } else if (selectedRadio.value === "lose") {
        s1 = 0;
        s2 = 1;
    } else if (selectedRadio.value === "draw") {
        s1 = 0.5;
        s2 = 0.5;
    }

    // read input
    let prevEloText1 = textBox1.value;
    let prevEloText2 = textBox2.value;

    // input validation
    if (prevEloText1 === ""){
        messageDisplay.textContent = "Please enter values and select an outcome.";
        messageDisplay.style.color = "red";
        return;
    }

    if (prevEloText2 === ""){
        messageDisplay.textContent = "Please enter values and select an outcome.";
        messageDisplay.style.color = "red";
        return;
    }

    // convert inputed text to float
    let prevElo1 = parseFloat(prevEloText1, 10.0);
    let prevElo2 = parseFloat(prevEloText2, 10.0);

    // input validation
    if (prevElo1 < 1000){
        messageDisplay.textContent = "Please enter a number of at least 1000.";
        messageDisplay.style.color = "red";
        return;
    }

    if (prevElo2 < 1000){
        messageDisplay.textContent = "Please enter a number of at least 1000.";
        messageDisplay.style.color = "red";
        return;
    }

    // elo calculation for player 1
    let expectedScore1 = 1 / (1 + (10 ** ((prevElo2 - prevElo1)/400)));
    let constant1 = 0;

    if (prevElo1 <= 2100){
        constant1 = 32;
    } else if (prevElo1 > 2100 && prevElo1 <= 2400){
        constant1 = 24;
    } else {
        constant1 = 16;
    }

    let eloAdjust1 = constant1 * (s1 - expectedScore1)
    let newElo1 = prevElo1 + eloAdjust1;

    if (newElo1 < 1000){
        newElo1 = 1000;
    }

    // elo calculation for player 2
    let expectedScore2 = 1 / (1 + (10 ** ((prevElo1 - prevElo2)/400)));
    let constant2 = 0;

    if (prevElo2 <= 2100){
        constant2 = 32;
    } else if (prevElo2 > 2100 && prevElo2 <= 2400){
        constant2 = 24;
    } else {
        constant2 = 16;
    }

    let eloAdjust2 = constant2 * (s2 - expectedScore2)
    let newElo2 = prevElo2 + eloAdjust2;

    if (newElo2 < 1000){
        newElo2 = 1000;
    }

    // output data
    messageDisplay.textContent = "";
    messageDisplay.style.color = "black";

    let change1 = (newElo1 - prevElo1);
    let change2 = (newElo2 - prevElo2);
    let formattedChange1 = change1 > 0 ? `+${change1.toFixed(1)}` : change1.toFixed(1);
    let formattedChange2 = change2 > 0 ? `+${change2.toFixed(1)}` : change2.toFixed(1);

    console.log(newElo1, newElo2);

    document.getElementById("output").classList.remove("hidden");
    document.getElementById("output1").textContent = newElo1.toFixed(1);
    document.getElementById("output2").textContent = newElo2.toFixed(1);
    document.getElementById("change1").textContent = formattedChange1;
    document.getElementById("change2").textContent = formattedChange2;

    // clear input fields
    document.getElementById("elo1").value = "";
    document.getElementById("elo2").value = "";
}

const form = document.getElementById("input");

form.addEventListener("submit", function(event){
    event.preventDefault(); 
    calcElo();
});
