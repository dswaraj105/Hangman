//Imoports from the page
const wordsContainer = document.querySelector('.words-container');
const wrongContainer = document.querySelector('.wrong-letters');
const body = document.querySelectorAll('.body-part');
const playAgainBtn = document.getElementById('play-again');

//Global variables
const LETTERS_ARRAY = ["APPLE","PROGRAMMER","MOUSE","SPEAKER","PYTHON","BURGER","JAVASCRIPT"];
let LETTERS_USED = [];
let WRONG_LETTERS = [];
let SCORE = 0;

//selecting a randon letter from letter array
const index = Math.floor((Math.random() * LETTERS_ARRAY.length));
const LETTERS = Array.from(LETTERS_ARRAY[index]);
console.log(LETTERS);

//displaying letters containers in the page
LETTERS.forEach( letter => {
  const div = document.createElement('div');
  div.className = "letters";
  div.innerText = letter;
  wordsContainer.appendChild(div);
});

// helper functions
function showNotification(){
  const notification = document.getElementById('notification-container');
  notification.classList.add('show-notification');
  setTimeout(() => {
    notification.classList.remove('show-notification');
  }, 800);
}

function showPopup(message){
  console.log('you win');
  const popup = document.querySelector('.popup-container');
  document.querySelector('.final-message').textContent = message;
  popup.classList.add('show-popup');
}

function refreshPage(){
  window.location.reload();
} 

function displayWrongLetters(letter) {
  const h4 = document.querySelector('.wrong-section h4');
  if(h4.classList.contains('hide')){
    h4.classList.remove('hide');
  }
  const div = document.createElement('div');
  div.className = 'wrong-letters';
  div.innerText = letter;
  wrongContainer.appendChild(div);
}

function colorRed(){
  body.forEach(bodyPart => {
    bodyPart.classList.add('red');
  });
}

// main functions 
function checkingLetters(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    //getting the letter pressed
    const charCode = event.keyCode || event.which;
    const charStr = String.fromCharCode(charCode);

    //checking if the letter is used
    const usedIndex = LETTERS_USED.findIndex( l => l === charStr);
    if(usedIndex !== -1){
      showNotification();
      return;
    }

    //push to used letters list if letter is not used
    LETTERS_USED.push(charStr);

    //find the index of letter pressed if present in current word
    const letterBox = wordsContainer.children;
    let flag = 0;
    LETTERS.forEach( (letter,index) => {
      if(letter === charStr){
        letterBox[index].classList.add('show-letter');
        SCORE++;
        flag = 1;
      }
    });

    //for wrong letters
    if(!flag){
      WRONG_LETTERS.push(charStr);
      body[WRONG_LETTERS.length - 1].classList.add('loose');
      displayWrongLetters(charStr);

      //case if user lost
      if(WRONG_LETTERS.length === 6){
        colorRed();
        setTimeout(showPopup('You Loose'), 3000);
        // showPopup('You loose');
      }
    }

    //case if user won
    if(SCORE === LETTERS.length){
      showPopup('You WIN!!!!!!!!');
    }
  } 
}

//Event listerers
document.addEventListener('keyup', checkingLetters);
playAgainBtn.addEventListener('click', refreshPage);