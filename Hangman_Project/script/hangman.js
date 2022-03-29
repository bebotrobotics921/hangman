
const popup       = document.getElementById('pop-up'); 
const playNow     = document.getElementById('play-now-btn');
const closebutton = document.getElementById('close-pop-up');
const winPop      = document.getElementById('winPop');
const mainImage   = document.getElementById("hangmanPic");
const miss        = document.getElementById('mistakes');
const key         = document.getElementById('keyboard');
const numGuesses  = document.getElementById('chances');
const message     = document.getElementById('wordSpotlight');
const answermsg   = document.getElementById('answermsg');
var vegetables    = ['kale', 'broccoli', 'squash', 'lettuce', 'spinach', 'cauliflower', 'carrot', 'cucumber', 'zucchini', 'tomato', 'bakchoy', 'potato', 'beets', 'yam'];
let popAnimation;
let opacity               = 0;
let hasSeenPopUpAlready   = false;
let answer                = ''; //the secret word
let chances               = 6; 
let mistakes              = 0; //# times you guess wrong
let guessed               = []; //guessed letters
let wordStatus            = null;//letters as underscores until they are guessed correctly
let resetClickAlready     = false;

const audioElement      = document.getElementById("audio-control");
const sourceElement     = audioElement.firstElementChild;



//Array of all the words
function randomWord() {
  answer = vegetables[Math.floor(Math.random() * vegetables.length)];
}
//----------------


//Update image.src
function updateImage() {
  mainImage.src = 'images/' + mistakes + '.jpg';
}
//--------

//Display play button when game loads
setTimeout(function(){
  if(hasSeenPopUpAlready ===true){
      cancelAnimationFrame(fadeIn);
  }else{
      popAnimation = requestAnimationFrame(fadeIn);
  }
});
//----------------------



//Popup fade in function
function fadeIn() {
  opacity += .05;
  popup.style.opacity = opacity;
  if (opacity < 1) { 
      requestAnimationFrame( fadeIn );
  } else {
      popup.style.opacity = 1;
  }
         
}
//------------------



//Closing the popup after clicking the play button
closebutton.addEventListener('click', function (){
  popup.style.display = "none";
});

playNow.addEventListener('click', function(){
  
  popup.style.display = "none";
});
//-------------


//Generates 26 keyboard buttons
function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="guess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  key.innerHTML = buttonsHTML;
}
//----------------


//Guess the word
function guess(string) {
  guessed.indexOf(string) === -1 ? guessed.push(string) : null;//equivalent to if else statement
  document.getElementById(string).setAttribute('disabled', true);

  if (answer.indexOf(string) >= 0) {
    guessedWord();
    win();
    playRightSong();
  } else if (answer.indexOf(string) === -1) {
    mistakes++;
    updateMistakes();
    lost();
    playWrongSong();
    updateImage();
  }
}
//--------------

function playWrongSong(){
  console.log("WRONG");
  //update the audio file source
  sourceElement.setAttribute("src","audio/wrong.mp3");
  //inform the HTML to load the new audio file
  audioElement.load();
  //play it!
  audioElement.play();
}

function playRightSong(){
  console.log("CORRECT");
  //update the audio file source
  sourceElement.setAttribute("src","audio/correct.mp3");
  //inform the HTML to load the new audio file
  audioElement.load();
  //play it!
  audioElement.play();
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  message.innerHTML = wordStatus;
}

function updateMistakes() {
  miss.innerHTML = mistakes;
}
//----------------
//Winning Message
winPop.style.display= "none";

function win() {
  if (wordStatus === answer) {
    winPop.style.display="block";
  }
  else{
    winPop.style.display="none";
  }
}
//---------------
//Loosing Message
lostPop.style.display="none";
function lost() {
  if (mistakes === chances) {
    lostPop.style.display="block";
    answermsg.innerHTML = 'The answer was: ' + answer;
  }
  
}
//------------------



//Reset the game or to play again
function reset() {
  mistakes = 0;
  guessed = [];
  mainImage.src = 'images/0.jpg';
  winPop.style.display="none";
  lostPop.style.display="none";
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}
//-----------------



numGuesses.innerHTML = chances;//setting the max number of wrong guesses a play can get per game
//Calling functions
randomWord();
generateButtons();
guessedWord();
//-------------------