var abEl = document.querySelector('.ab');
var startTitleEl = document.querySelector('.start-title');
var bioEl = document.querySelector('.bio');
var clockEl = document.querySelector('.clock');
var ab1El = document.querySelector('.ab1');
var ab2El = document.querySelector('.ab2');
var ab3El = document.querySelector('.ab3');
var ab4El = document.querySelector('.ab4');
var startButtonEl = document.querySelector('.start-button');
var viewHighscoresEl = document.querySelector('.view-highscores');
var backButtonEl = document.querySelector('.back-button');
var highscoresListEl = document.querySelector('.highscore-list');
var timer = 75;
var saveScoreEl = document.querySelector('.save-score');
var questionNumber = 0;
var userAnswer;
var timerInterval;

const questions = ['What is the proper html document declaration?' , 'What is the file type for javascript?'
 , 'What do you call this?  for (let i = 0; i < cars.length; i++)' , 'How do you start a comment in CSS?'
 , 'What language is this an example of?  <h1>Hello World!</h1>']
const a1 = ['<!DECLARE html>' , '.js' , 'Let Loop' , '/*' , 'java'];
const a2 = ['<!DOCTYPE html>' , '.jscript' , 'If Statement' , '//' , 'javascript'];
const a3 = ['!DOCTYPE html' , '.javascript' , 'For Loop' , '.comment' , 'css'];
const a4 = ['doctype.set.html' , '.jss' , 'Else Statement' , '/comment' , 'html'];
const answers = [2,1,3,1,4];

/* resets everything back to how it started
could not find a way to implement it unfortunately
would cause an issue with the answer buttons either
not displaying when i reset or at the start*/
function reset(){
    timer = 75;
    questionNumber = 0;
    document.querySelector('.start-title').textContent = 'Coding Quiz';
    bioEl.style.display='block';
    startButtonEl.style.display='inline-block';
    ab1El.style.display='none';
    ab2El.style.display='none';
    ab3El.style.display='none';
    ab4El.style.display='none';
    backButtonEl.style.display='none';
    viewHighscoresEl.style.display='block';
    saveScoreEl.style.display='none';
}

/*inputs the correct question and answers into the corresponding text area and buttons*/
function setQuestion() {
    if (questionNumber != 5){
        document.querySelector('.start-title').textContent = questions[questionNumber];
    document.querySelector('.ab1').textContent = a1[questionNumber];
    document.querySelector('.ab2').textContent = a2[questionNumber];
    document.querySelector('.ab3').textContent = a3[questionNumber];
    document.querySelector('.ab4').textContent = a4[questionNumber];
    }
}

/*starts the timer and sets the condition to end the game if the time runs out */
function startTimer() {
    timerInterval = setInterval(function() {
      timer--;
      clockEl.textContent = 'Time: ' + timer;
      if(timer === 0) {
        clearInterval(timerInterval);
        endGame();
      }
  
    }, 1000);
  }

/*ends the game, displays your score, and asks the user if they want to save thier score*/
function endGame() {
    abEl.style.display='none';
    clearInterval(timerInterval);
    document.querySelector('.start-title').textContent = "Your score is: " + timer; 
    saveScoreEl.style.display='block';
}

/*when the user inputs a wrong answer 10 seconds are removed off the timer*/
function wrong() {
    timer = timer - 10;
}

/*compares the user answer to the answerkey, ends the game after the last question, and pushes the quiz to the next question*/
function checkAnswer() {
    if(userAnswer != answers[questionNumber]){
        wrong();
    }
    if (questionNumber == 4) {
        endGame();
    }
    questionNumber++;
}

/*records the user's answer*/
ab1El.addEventListener('click' , function(){
    userAnswer = 1;
    checkAnswer();
    setQuestion();
});

/*records the user's answer*/
ab2El.addEventListener('click' , function(){
    userAnswer = 2;
    checkAnswer();
    setQuestion();
});

/*records the user's answer*/
ab3El.addEventListener('click' , function(){
    userAnswer = 3;
    checkAnswer();
    setQuestion();
});

/*records the user's answer*/
ab4El.addEventListener('click' , function(){
    userAnswer = 4;
    checkAnswer();
    setQuestion();
});

/*shows you a list of highscores*/
viewHighscoresEl.addEventListener('click', function(){
   viewHighscoresEl.style.display='none';
   backButtonEl.style.display='block';
    clearInterval(timerInterval);
    abEl.style.display='none';
    highscoresListEl.style.display='block';
    bioEl.style.display='none';
    document.querySelector('.highscore-list').textContent = localStorage.getItem('score');
    document.querySelector('.start-title').textContent = "Highscores"
})

/*resets the game and takes you back to the title page*/
backButtonEl.addEventListener('click', function(){
    backButtonEl.style.display='none';
    viewHighscoresEl.style.display='block';
    highscoresListEl.style.display='none';
    bioEl.style.display='none';
    startButtonEl.style.display='none';
    document.querySelector('.start-title').textContent = 'Could not get a reset to work please refresh the page.'
})

/*saves the score to local*/
function saveScore(){
    let initals = document.getElementById('initals').value;
    let savedScore = initals + " : " + timer;
    localStorage.setItem('score' , savedScore);
    saveScoreEl.style.display='none';
}

/*starts the game after the user hits the start button*/
startButtonEl.addEventListener('click' , function(){
    startButtonEl.style.display='none';
    abEl.style.display='block';
    bioEl.style.display='none';
    startTimer();
    setQuestion();
    }
);