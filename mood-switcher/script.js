"use strict"
console.log("Mood Switcher script loaded.");

const moods = [
    { "moodText": "Sad", "emoji": "😢", "bgColor": "red" },
    { "moodText": "Calm", "emoji": "😌", "bgColor": "lightblue" },
    { "moodText": "Angry", "emoji": "😡", "bgColor": "orange" },
    { "moodText": "Happy", "emoji": "😄", "bgColor": "blue" },
    { "moodText": "Focuse", "emoji": "🧠", "bgColor": "green" },
]

//load all elements from DOM
const moodTextDiv = document.getElementById("mood-text");
const atuoBtn = document.getElementById("auto-btn");
const changeBtn = document.getElementById("change-btn");
let IntervalId = null;

function getRandomMood(moods) {
    let randomIndex = Math.floor(Math.random() * (moods.length ));
    return moods[randomIndex];
}

function updateMoo(moodObj) {
    let emoji = moodObj.emoji;
    let moodText = moodObj.moodText;
    let bgColor = moodObj.bgColor;
    let textDiv = 'Your current mood is: <strong>' + moodText + '</strong> ' + emoji;
    moodTextDiv.innerHTML = textDiv;
    document.body.style.backgroundColor = bgColor;
    console.log(textDiv);
}

changeBtn.addEventListener("click", function () {
    const randMood = getRandomMood(moods);
    updateMoo(randMood);
})

function autoMoodSet() {

    const randMood = getRandomMood(moods);
    updateMoo(randMood);

}

atuoBtn.addEventListener("click", function (event) {
    
    if (IntervalId == null) {
        autoMoodSet();
        atuoBtn.textContent = "Stop Auto Mode";
        IntervalId = setInterval(function () {
            autoMoodSet();
        }, 2000);

    }
    else {
        atuoBtn.textContent = " Auto Mode";
        clearInterval(IntervalId);
        IntervalId = null;
    }

});

