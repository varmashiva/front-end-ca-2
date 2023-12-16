//declearing variables and images and strating score //
let gameBodyDiv = document.getElementById('game-body');
let TimerSpan = 60;
let arr = [
  './assets/bug-1.png',
  './assets/bug-2.png',
  './assets/bug-3.png',
  './assets/bug-4.png',
  './assets/bug-5.png',
  './assets/bug-6.png',
];
let score = 0;
// background music //
let bgmSound = new Audio('./assets/sound.mp3');
bgmSound.play();
bgmSound.loop = true;
bgmSound.volume = 1;

let LivesRemaingCount = 0;
let bugId = 0;

// creating random bugs(images) //
function Createbug() {
  let randDomImagePicker = arr[Math.floor(Math.random() * 6)];
  console.log(randDomImagePicker);

  gameBodyDiv.innerHTML += `<img src=${randDomImagePicker} alt='${randDomImagePicker}' class='bug'  id='bug-${bugId}'/>`;

  let getbug = document.getElementById('bug-' + bugId);

  let TranlateXRandomNumber = Math.floor(Math.random() * (80 - 20)) + 20;

  getbug.style.transform = `translateX(${TranlateXRandomNumber}vw)`;

  let randomSecondsNumber = Math.floor(Math.random() * (7 - 2)) + 2;
  getbug.style.animationDuration = `${randomSecondsNumber}s`;

  //shott
  getbug.addEventListener('click', function () {
    score++;
    localStorage.setItem('score', score);
    Rmovebug(getbug);
  });
}

//removeing bug after shotting //
function Rmovebug(bugDiv) {
  bugDiv.style.display = 'none';
  bugId++;
  Createbug();
}


// keeping timer for 60 seconds
setInterval(function () {
  TimerSpan = TimerSpan - 1;
  document.getElementById('timer').innerHTML = TimerSpan;
  if (TimerSpan <= 0) {
    window.location.href = './game-over.html';
  }
  let missedbug = document.getElementById('bug-' + bugId);

  let topDimensionbug = missedbug.getBoundingClientRect().bottom;
  console.log(topDimensionbug);
  if (topDimensionbug >= 600) {
    LivesRemaingCount++;
    if (LivesRemaingCount == 4) {
      window.location.href = './game-over.html';
      console.log('Game - Over');
    }
    Rmovebug(missedbug);
  }
  if (TimerSpan == 0) {
    window.location.href = './win.html';
    console.log('Winner');
  }
}, 1000);
Createbug();
