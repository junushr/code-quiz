// scores.js

// This file is used for the logic to get and display high scores.

const highscoresList = document.getElementById('highscores');
// Getting the clear button and adding an event listner to it
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clearHighscores);

// function to display the scores
function updateHighscores() {
    highscoresList.innerHTML = '';

    const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

    highscores.forEach((score) => {
        const li = document.createElement('li');
        li.textContent = `${score.initials}: ${score.score}`;
        highscoresList.appendChild(li);
    });
}

// function to clear the scores
function clearHighscores() {
    localStorage.removeItem('highscores');
    updateHighscores();
}

// Call the function when the highscores page loads
updateHighscores();
