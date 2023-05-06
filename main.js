/*----------------------- Gameboard --------------------------------*/

const state = {
  message: "",
  scoreGame: "",
  counter: "",
  level: "easy"
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


/*------------------------state variables----------------------------- */

let currentTime=10;
let currentCircle;
let pointLocked= true;
let alreadyStart=false;
let score=0;
let roundTimer;
let moleTimer;
let levelChosen=false;

/*------------------------event listeners----------------------------- */
window.addEventListener('mousemove', moveMouse);
window.addEventListener('mousedown', activateMouse);
window.addEventListener('mouseup', deactivateMouse);

gridEl.addEventListener('mouseover', appearMallet)

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
  
}


// Render function to update values on gameboard (countdown, score, and title).
function render() {
  titleEl.innerText=state.message
  scoreCount.innerText=state.scoreGame
  timeLeft.innerText=state.counter
}

// Update state.counter value (aka countdown value) based on level of difficulty chosen by user. Update levelChosen=true.
function chooseLevel (evt) {
  buttnLevel.style.textColor='gainsboro'
  state.level=evt.target.textContent.toLowerCase();
  if(state.level==="easy") {
   state.counter=21;
   

  }
  if(state.level==="medium") {
   state.counter=16;
   

  }
  if(state.level==="hard") {
   state.counter=11;

  }
 levelChosen=true;
}



// Begin showMole function and countdown function only if alreadyStart and levelChosen are true. Change them to false at the end.
function begin() {
  alreadyStart=true;
  
  while (alreadyStart && levelChosen) {
      startEl.removeEventListener ('click', begin);
      currentTime=state.counter
      
      if (state.level==="easy") {
        moleTimer=setInterval(showMole, 950);

      } else if (state.level==="medium") {
        moleTimer=setInterval(showMole, 750);

      } else if (state.level==="hard") {
        moleTimer=setInterval(showMole, 600);
      }
      roundTimer=setInterval(countDown, 1000);
      alreadyStart=false;
      levelChosen=false;
  }    
}

startEl.addEventListener('click', begin)


// Remove image of mole from last location.
function showMole () {
  
  circles.forEach(function(circle) {
    circle.classList.remove('mole');
  });
  
  
  // Add image of mole to a random circle from the grid.

  let randomCircle= circles[Math.floor(Math.random()*9)];
  randomCircle.classList.add('mole');
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
        e.target.classList.remove('mole');
        pointLocked= true;
      }
  }
}



// Starts countdown during an active round. Renders appropriate message based on final score.
function countDown () {
  currentTime--;
  state.counter= `Countdown: ${currentTime}`
  render();
  if (currentTime=== 0) {
    circles.forEach(function (circle) {
      circle.removeEventListener('click', circleClick)
    })

    currentTime=0;
    clearInterval(roundTimer)
    clearInterval(moleTimer)
    if (score<10) {
      state.message ='Game over, you lost!';
      render();
    }
    if(score>=10) {
        state.message ='Game over, you won!';
        render();
    }
  }

}


// Refreshes page so user can start new game.
function reset() {
    location.reload();
    // // resetEl.removeEventListener('click', reset)
    // init();
    // alreadyStart=false;
    // levelChosen=false;
    
    // circles.forEach(function(circle) {
    //   circle.classList.remove('mole');
    // });

    // // resetEl.addEventListener('click', reset)
  
    // // render();
    
    
    // /// should reset board and remove and reinitialize 
}


// Initialize game board and render.
init();
render();