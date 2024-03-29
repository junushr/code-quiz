// Object Array of quiz questions
const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<javascript>", "<script>", "<js>", "<scripting>"],
        correctAnswer: "<script>"
    },
    {
        question: "What is the correct JavaScript syntax to change the content of the HTML element below?\n\n<p id='demo'>This is a demonstration.</p>",
        options: [
            "#demo.innerHTML = 'Hello World!';",
            "document.getElementById('demo').innerHTML = 'Hello World!';",
            "document.getElement('p').innerHTML = 'Hello World!';",
            "document.getElementByName('p').innerHTML = 'Hello World!';"
        ],
        correctAnswer: "document.getElementById('demo').innerHTML = 'Hello World!';"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: ["msg('Hello World');", "alert('Hello World');", "msgBox('Hello World');", "alertBox('Hello World');"],
        correctAnswer: "alert('Hello World');"
    },
    {
        question: "How to write an IF statement in JavaScript?",
        options: ["if i = 5", "if i == 5 then", "if i = 5 then", "if (i==5)"],
        correctAnswer: "if (i==5)"
    },
    {
        question: "How does a FOR loop start?",
        options: ["for i = 1 to 5", "for (i=0; i <=5; i++)", "for (i=0; i<=5)", "for (i<=5; i++)"],
        correctAnswer: "for (i=0; i <=5; i++)"
    }
];

const startButton = document.getElementById('start'); // Variable for the start button
const timerElement = document.getElementById('time');
let timer; // For time
let timeRemaining = 60; // Initial time of 60 seconds
let currentQuestionIndex = 0; // To keep track of question
const submitButton = document.getElementById('submit'); // For Button to submit score

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startButton.classList.add('hide');
    document.getElementById('start-screen').classList.add('hide');
    document.getElementById('questions').classList.remove('hide');

    // Initialize the timer
    timer = setInterval(function () {
        timeRemaining--;
        timerElement.textContent = timeRemaining;

        // Check if the timer has reached 0
        if (timeRemaining <= 0) {
            endQuiz();
        }
    }, 1000);

    showQuestion();
}

// Function to show the questions
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionTitle = document.getElementById('question-title');
    const choicesContainer = document.getElementById('choices');

    questionTitle.textContent = currentQuestion.question;
    choicesContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.addEventListener('click', () => checkAnswer(option));
        choicesContainer.appendChild(optionButton);
    });
}

// Function to check the answer and give feedback
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
        // Correct answer
        showFeedback('Correct!', true);
    } else {
        // Incorrect answer
        showFeedback('Incorrect!', false);
        // Subtract 10 seconds for incorrect answer
        timeRemaining = Math.max(0, timeRemaining - 10);
    }
    // set a timer to show feedback before moving to next question
    setTimeout(() => {
    // Move to the next question
    currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            // Quiz completed
            endQuiz();
        }
    }, 1000); // Delay the next question by 1 second
}

// Function to show the feedback
function showFeedback(message, isCorrect) {
    const feedbackContainer = document.getElementById('feedback');
    feedbackContainer.textContent = message;

    if (isCorrect) {
        feedbackContainer.style.color = 'green';
    } else {
        feedbackContainer.style.color = 'red';
    }

    feedbackContainer.classList.remove('hide');
    // Timer to hide before next question is shown
    setTimeout(() => {
        feedbackContainer.classList.add('hide');
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);

    // Display the end screen
    document.getElementById('questions').classList.add('hide');
    document.getElementById('end-screen').classList.remove('hide');

    // Display final score
    document.getElementById('final-score').textContent = timeRemaining;
}

submitButton.addEventListener('click', submitScore);

// function to store the scores in local storage
function submitScore() {
    const initialsInput = document.getElementById('initials');
    const userInitials = initialsInput.value.trim().toUpperCase();

    if (userInitials !== "") {
        const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        const userScore = { initials: userInitials, score: timeRemaining };

        highscores.push(userScore);
        highscores.sort((a, b) => b.score - a.score); // Sort scores in descending order

        localStorage.setItem('highscores', JSON.stringify(highscores));

        // Redirect to highscores page
        window.location.href = 'highscores.html';
    }
}


// Acceptance Criteria
    // A start button that when clicked a timer starts and the first question appears.
        // Questions contain buttons for each answer.
        // 
        // When answer is clicked, the next question appears
        //  
        // If the answer clicked was incorrect then subtract time from the clock
        //
        // The quiz should end when all questions are answered or the timer reaches 0.
        //
        // When the game ends, it should display their score and give the user the ability to save their initials and their score

// Pseudo Code
    // Set of questions --> Array of objects
    // Each Question needs the following:
        // Question Text
        // set of answers
        // which answer is correct

    // Landing page:
        // Explanation of the quiz
        // start button

    // Clicking the start button:
        // landing pages goes away
        // The timer starts
        // The first question appears (With its answers)

    // For each question:
        // user clicks an answer
        // their choice is compared to the correct answer as stored in the question object
        // If correct, give feedback
        // If incorrect, give feedback and subtract 10 sec from the timer
        // Optional - Play a sound for correct or incorrect
        // Either way, the question disappears after a few seconds and the next questions appear

    // After the last question: 
        // Timer stops
        // Question Disappears
        // Form appears for user to enter their initials
        // Display their score

    // User submits form
        // Initials and score gets stored in local storage
        // User is take to the high score page
        // High scores are listed, sorted highest to lowest
        // User has option to take the quiz again



