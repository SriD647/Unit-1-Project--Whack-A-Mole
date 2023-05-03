const state = {
  message: "Welcome to Whack-A-Mole",
  scoreGame: "Moles whacked: 0",
  counter: "Countdown: 10"
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
let currentTime;
let currentCircle=0;
let pointLocked= false;
let alreadyStart=false;

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


function render() {
  titleEl.innerText=state.message
  scoreCount.innerText=state.scoreGame
  timeLeft.innerText=state.counter

}

// render();


startEl.addEventListener('click', begin)

/* Place mole in random location */
function showMole () {
  circles.forEach(function(circle) {
    circle.classList.remove('mole');
  });
  
  pointLocked=false;

  let randomCircle= circles[Math.floor(Math.random()*9)];
  randomCircle.classList.add('mole');

  currentCircle=randomCircle.id;

}

/* Begin showMole function and countdown function */
function begin() {
  alreadyStart=true;
  while (alreadyStart) {
      startEl.removeEventListener ('click', begin);
      score=0;
      currentTime=10;
      Timer=setInterval(showMole, 630);
      timeTimer=setInterval(countDown, 1000);
      alreadyStart=false;
  }    
}


/* Capture clicks and update scoreboard */
circles.forEach(function (circle) {
  circle.addEventListener('click', ()=>{
  if(circle.id==currentCircle) {
      if(pointLocked) return;
      score++;
      state.scoreGame= `Moles whacked: ${score}`;
      // scoreCount.innerText= `Moles whacked: ${score}`;
      render();
      circle.classList.remove('mole');
      pointLocked= true;
  }
  });
});

function countDown () {
  currentTime--;
  state.counter= `Countdown: ${currentTime}`
  render();
  // timeLeft.innerText= `Countdown: ${currentTime}`

  if (currentTime== 0) {
      startEl.addEventListener('click', begin)
      currentTime=0;
      clearInterval(timeTimer)
      clearInterval(Timer)
      if (score<13) {
        state.message ='Game over, you lost!';
        render();
          // titleEl.innerText ='Game over, you lost!';
          startEl.removeEventListener ('click', begin);
      }
      if(score>=13) {
          state.message ='Game over, you won!';
          render();
          startEl.removeEventListener ('click', begin);   
      }
  }

}


function reset() {
    location.reload();
}