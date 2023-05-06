const state = {
  message: "",
  scoreGame: "",
  counter: "",
  level: "easy"
}


/*----------------------- **** --------------------------------*/

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

/*------------------------state variables----------------------------- */
window.addEventListener('mousemove', moveMouse);
window.addEventListener('mousedown', activateMouse);
window.addEventListener('mouseup', deactivateMouse);

gridEl.addEventListener('mouseover', appearMallet)

frameEl.addEventListener('mouseover', disappearMallet)

buttnEl.addEventListener('mouseover', disappearMallet)

resetEl.addEventListener('click', reset)

buttnLevel.addEventListener('click', chooseLevel)


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
    state.counter= "Countdown: "
  
}

function render() {
  titleEl.innerText=state.message
  scoreCount.innerText=state.scoreGame
  timeLeft.innerText=state.counter
}

function chooseLevel (evt) {
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
 console.log(state.counter)
 console.log(state.level)
}



/* Begin showMole function and countdown function */
function begin() {
  alreadyStart=true;
  
  while (alreadyStart) {
      // currentCircle=randomCircle.id;
      startEl.removeEventListener ('click', begin);
      currentTime=state.counter
      
      if (state.level==="easy") {
        moleTimer=setInterval(showMole, 950);

      } else if (state.level==="medium") {
        moleTimer=setInterval(showMole, 650);

      } else if (state.level==="hard") {
        moleTimer=setInterval(showMole, 500);
      }
      roundTimer=setInterval(countDown, 1000);
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
      if(!pointLocked) {        
        state.scoreGame= `Moles whacked: ${++score}`;
        render();
        e.target.classList.remove('mole');
        pointLocked= true;
      }
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
  if (currentTime=== 0) {
    circles.forEach(function (circle) {
      circle.removeEventListener('click', circleClick)

    })
    // startEl.addEventListener('click', begin)
    currentTime=0;
    clearInterval(roundTimer)
    clearInterval(moleTimer)
    if (score<10) {
      state.message ='Game over, you lost!';
      render();
        // titleEl.innerText ='Game over, you lost!';
        // startEl.removeEventListener ('click', begin);
    }
    if(score>=10) {
        state.message ='Game over, you won!';
        render();
        // startEl.removeEventListener ('click', begin);   
    }
  }

}


function reset() {
    location.reload();
    // resetEl.removeEventListener('click', reset)
    // circles.forEach(function(circle) {
    //   circle.classList.remove('mole');
    // });
    // resetEl.addEventListener('click', reset)
    
    // init();
    // render();
    
    
    /// should reset board and remove and reinitialize 
}



init();
render();