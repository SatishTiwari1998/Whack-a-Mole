const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const highScore = document.querySelector(".high-score");
const moles = document.querySelectorAll(".mole");
const inputValue=document.getElementById("user-name")
const welcome=document.querySelector(".welcome");
const welcomeCaptain=document.getElementById("welcome-captain");
const preWelcome=document.getElementById("pre-welcome-front-card");
const nameShow=document.getElementById("user-name-show");
const playBtn=document.getElementById("start");
let lastHole;
let timeUp = false;           
let countdownTimeUp=false;
let playtimeUp=false;
let score = 0;
let highScoreCount=0;
let played=0;


//Lets see the choosed parameters

let timeSelector=document.getElementById("selected-time");
let levelSelector=document.getElementById("selected-level");

//HELPER FUNCTIONS

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {                               //RANDOM HOLE FUNCTION
  const id = Math.floor(Math.random() * holes.length);
  const hole = holes[id];
  if (hole === lastHole) {                                 // ensuring same hole cannot come twice
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {                                          //PEEP Function
  let time;
  if(levelSelector.value==="easy")
  {
     time = randomTime(700, 1500);
  }
  else if(levelSelector.value==="medium")
  {
    time = randomTime(300,800)
  }
  else if(levelSelector.value==="hard")
  {
    time=randomTime(50,500)
  }
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function bonk(e) {
  if (!e.isTrusted) return; // cheater!
  if(playtimeUp===false)
  {
  score++;
  this.parentNode.classList.remove("up");       //
  scoreBoard.textContent = score;
  let audio = new Audio('punch.mp3');
  audio.play()
  }
  
}

moles.forEach((mole) => mole.addEventListener("click", bonk));

//Count down Timer function
function countdown(duration) {
  display= document.querySelector('#show-time');
  var start = Date.now(),
      diff,
      minutes,
      seconds;
  function timer() {
      // get the number of seconds that have elapsed since 
      // startTimer() was called
      diff = duration - (((Date.now() - start) / 1000) | 0);

      // does the same job as parseInt truncates the float
      minutes = (diff / 60) | 0;
      seconds = (diff % 60) | 0;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;
      if (diff <= 0) {
          // add one second so that the count down starts at the full duration
          // example 05:00 not 04:59
          start = Date.now() + 1000;
      }
  };
  // we don't want to wait a full second before the timer starts
  timer();
  const timeInterval=setInterval(()=>{
    timer();
    if(minutes==="00" && seconds==="00")  // when timer ends
    {
      clearInterval(timeInterval);
      if( score>highScoreCount)
      {
        highScoreCount=score
        console.log("this is new High Score");
        highScore.innerText=highScoreCount;
        let hsanimation=document.getElementById("high-score-animation");
        hsanimation.className+=" animation";
      }
      playtimeUp=true;
      playBtn.disabled=false;
      playBtn.style.background="rgb(25, 179, 25)";
      playBtn.innerText="Play";
    }
  },1000);
}

// LETS CREATE DIFFERENT LEVELS AND DIFFERENT TIME BASED GAMES

function playGame(playTime,level)
{
  resetTriggered=false; 
  playtimeUp=false;
  if(!inputValue.value)
  {
    return alert("Please choose a player name !");
  }
  if(inputValue.value.length>=4 && inputValue.value.length<=8)
  {
    localStorage.setItem("userName",inputValue.value);
    played++;
    playBtn.disabled=true;
    playBtn.style.background="grey";
    playBtn.innerText="wait !"
    let hsanimation=document.getElementById("high-score-animation");
    hsanimation.classList.remove("animation");

    nameShow.innerText=localStorage.getItem("userName");
    if(localStorage.userName)
    {
      inputValue.style.display="none";
    }
    
    preWelcome.style.display="none";
    welcomeCaptain.style.display="block"
    playTime=timeSelector.value;
    level=levelSelector.value;
    countdown(playTime);
    timeUp = false;
    scoreBoard.textContent = 0;
    score = 0;
    peep();
    setTimeout(() => (timeUp = true), playTime*1000);
  }
  else
  {
    return alert("Username length should be 4 to 8 character long !")
  }
}

document.getElementById("start").addEventListener("click",playGame);

function resetGame()
{
  if(played!=0 && localStorage.userName)
  {
    window.location.reload();
  }
}
document.getElementById("reset").addEventListener("click",resetGame);















