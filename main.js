const state = {
  message: "",
  scoreGame: "",
  counter: ""

}


/*----------------------- **** --------------------------------*/

const mouse = document.querySelector('.mouse')
const frameEl=document.querySelector('#frame');
const buttnEl=document.querySelector('.buttonAll')
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

let scoreGame=0;
let time=0;
let currentTime=10;
let currentCircle;
let pointLocked= true;
let alreadyStart=false;
let score=0;
let timeTimer;
let timer;

/*------------------------state variables----------------------------- */
window.addEventListener('mousemove', moveMouse);
window.addEventListener('mousedown', activateMouse);
window.addEventListener('mouseup', deactivateMouse);

gridEl.addEventListener('mouseover', appearMallet)

frameEl.addEventListener('mouseover', disappearMallet)

buttnEl.addEventListener('mouseover', disappearMallet)

resetEl.addEventListener('click', reset)


/*------------------------functions----------------------------- */

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

function init() {
    state.message= "Welcome to Whack-A-Mole"
    state.scoreGame= "Moles whacked: 0"
    state.counter= "Countdown: 10"
  
}

function render() {
  titleEl.innerText=state.message
  scoreCount.innerText=state.scoreGame
  timeLeft.innerText=state.counter
 

}


/* Begin showMole function and countdown function */
function begin() {
  alreadyStart=true;
  while (alreadyStart) {
      // currentCircle=randomCircle.id;
      startEl.removeEventListener ('click', begin);
      currentTime=10;
      timer=setInterval(showMole, 750);
      timeTimer=setInterval(countDown, 1000);
      alreadyStart=false;
  }    
}

startEl.addEventListener('click', begin)


/* Place mole in random location */
function showMole () {
  
  circles.forEach(function(circle) {
    circle.classList.remove('mole');
  });
  
  
  // pointLocked=false;

  let randomCircle= circles[Math.floor(Math.random()*9)];
  randomCircle.classList.add('mole');
  pointLocked=false;
  currentCircle=randomCircle.id;

}

function circleClick(e) {
  if(e.target.id==currentCircle) {
    // pointLocked=true;
      if(!pointLocked) {        
        state.scoreGame= `Moles whacked: ${++score}`;
        console.log(score);
        // scoreCount.innerText= state.scoreGame;
        render();
        e.target.classList.remove('mole');
        pointLocked= true;
      }
      // else if (alreadyStart=false) {
      //   state.scoreGame= `Moles whacked: ${score}`;
      // }
  }
}

/* Capture clicks and update scoreboard */
circles.forEach(function (circle) {
  circle.addEventListener('click', circleClick)
});


function countDown () {
  currentTime--;
  state.counter= `Countdown: ${currentTime}`
  render();
  // timeLeft.innerText= `Countdown: ${currentTime}`

  if (currentTime=== 0) {
    circles.forEach(function (circle) {
      circle.removeEventListener('click', circleClick)

    })
    // startEl.addEventListener('click', begin)
    currentTime=0;
    clearInterval(timeTimer)
    clearInterval(timer)
    if (score<13) {
      state.message ='Game over, you lost!';
      render();
        // titleEl.innerText ='Game over, you lost!';
        // startEl.removeEventListener ('click', begin);
    }
    if(score>=13) {
        state.message ='Game over, you won!';
        render();
        // startEl.removeEventListener ('click', begin);   
    }
  }

}


function reset() {
    location.reload();
    // init();
    // render();
    /// should reset board and remove and reinitialize 
}

init();
render();