/*----------------------- Gameboard --------------------------------*/

const state = {
  message: "",
  scoreGame: "",
  counter: "",
  level: {}
}


/*-----------------------cached elements  --------------------------------*/

const mouse = document.querySelector('.mouse')
const frameEl=document.querySelector('#frame');
const buttnEl=document.querySelector('.buttonAll')
const buttnLevel=document.querySelector('.buttonLevel')
const gridEl=document.querySelector('.grid');

let circles=document.querySelectorAll('.location');
const mole= document.getElementById('mole');
const resetEl= document.getElementById('reset');
const startEl=document.getElementById('start')
const timeLeft= document.getElementById('timeLeft');
const scoreCount=document.getElementById('score');
let pointer=document.querySelector('location');
let titleEl=document.getElementById('title');
const audioClip = document.getElementById("audioClip");
const arcadeMusic = document.getElementById("backgroundMusic");
const mouseSqueek = document.getElementById("mouseSqueek");
const youLose = document.getElementById("youLose");
const youWin = document.getElementById("youWin");


const malletSound = function() {
  audioClip.volume = 0.9;
  audioClip.play();
};

const mouseSqueekSound = function() {
  mouseSqueek.volume = 0.5;
  mouseSqueek.play();
};

const backgroundMusic = function() {
  arcadeMusic.volume = 0.40;
  arcadeMusic.loop = true;
  arcadeMusic.play();

};

const youLoseMusic= function () {
  youLose.volume= 0.5;
  youLose.play();
}

const youWinMusic= function () {
  youWin.volume= 0.5;
  youWin.play();
}


/*------------------------state variables----------------------------- */

let currentTime;
let currentCircle;
let pointLocked= true;
let alreadyStart=false;
let score=0;
let points;
let roundTime;
let moleTime;
let levelChosen=false;


const levelChoice = {
  easy: {
    moleTimer: 2000,
    roundLength: 16,
    roundTimer: 1000,
    pointsNeeded: 5

  },
  medium: {
    moleTimer: 750,
    roundLength: 16,
    roundTimer: 1000,
    pointsNeeded: 12

  },
  hard: {
    moleTimer: 550,
    roundLength: 16,
    roundTimer: 1000,
    pointsNeeded: 16

  }
}
/*------------------------event listeners----------------------------- */
window.addEventListener('mousemove', moveMouse);
window.addEventListener('mousedown', activateMouse);
window.addEventListener('mouseup', deactivateMouse);

gridEl.addEventListener('mouseover', appearMallet);

frameEl.addEventListener('mouseover', disappearMallet)

buttnEl.addEventListener('mouseover', disappearMallet)

resetEl.addEventListener('click', reset)

buttnLevel.addEventListener('click', chooseLevel)
buttnLevel.addEventListener('mouseover', disappearMallet)

/*------------------------functions and logic----------------------------- */

function moveMouse(e) {
  mouse.style.top = e.pageY + 'px';
  mouse.style.left = e.pageX + 'px';
}

function activateMouse() {
  mouse.classList.add('active');
}

function deactivateMouse() {
  mouse.classList.remove('active');
}


function appearMallet() {
    mouse.classList.add('design');  
}

function disappearMallet() {
    mouse.classList.remove('design');
}


//Intialize gameboard values.
function init() {
  state.message= "Welcome to Whack-A-Mole"
  state.scoreGame= "Moles whacked:"
  state.counter= "Countdown: " 
};


// Render function to update values on gameboard (countdown, score, and title).
function render() {
  titleEl.innerText=state.message
  scoreCount.innerText=state.scoreGame
  timeLeft.innerText=state.counter;

  };

// Update state.counter value (aka countdown value) based on level of difficulty chosen by user. Update levelChosen=true.
function chooseLevel (evt) {
  buttnLevel.style.textColor='gainsboro'
  state.level=levelChoice[evt.target.textContent.toLowerCase()];
 
 levelChosen=true;
}

  
// Begin showMole function and countdown function only if alreadyStart and levelChosen are true. Change them to false at the end.

startEl.addEventListener('click', begin)

function begin() {
  alreadyStart=true;    
  
  if (alreadyStart && levelChosen) {
      
      startEl.removeEventListener ('click', begin);
      points=state.level.pointsNeeded;
      currentTime=state.level.roundLength;
      moleTime=setInterval(showMole, state.level.moleTimer);
      roundTime=setInterval(countDown,state.level.roundTimer);
      alreadyStart=false;
      levelChosen=false;
  }    
}

// Remove image of mole from last location.
function showMole () {
  
    circles.forEach(function(circle) {
    circle.classList.remove('mole');
  });
  
  
  // Add image of mole to a random circle from the grid.
  
  let randomCircle= circles[Math.floor(Math.random()*9)];

  randomCircle.classList.add('mole');
  mouseSqueekSound ();
  pointLocked=false;  
  currentCircle=randomCircle.id;

}

// Add eventlistener to each circle. Each click triggers circleClick function.
circles.forEach(function (circle) {
  circle.addEventListener('click', circleClick)
});


// Circle click function updates scoreboard and removes mole image.
function circleClick(e) {
  if(e.target.id==currentCircle) {
      if(!pointLocked) {            
        state.scoreGame= `Moles whacked: ${++score}`;        
        render();
        malletSound();  
        e.target.classList.remove('mole');
        pointLocked= true;
        
      }
  }
}

// Starts countdown during an active round. Renders appropriate message based on final score.
function countDown () { 
  currentTime--;
  backgroundMusic();
  state.counter= `Countdown: ${currentTime}`;
  render();

  if(score>= points) {
    pointLocked=true;
    
    arcadeMusic.pause();  
    clearInterval(roundTime);
    clearInterval(moleTime);
    state.message= 'Game over, you won!'
    render();       
    youWinMusic();

    
    
  }

  if (currentTime=== 0) {
    pointLocked=true;    
    arcadeMusic.pause();
    clearInterval(roundTime);
    clearInterval(moleTime);
    state.message ='Game over, you lose!';
    render();
    youLoseMusic (); 

  }
};


// Refreshes page so user can start new game.
function reset() {
  location.reload();
}


// Initialize game board and render.
init();
render();


