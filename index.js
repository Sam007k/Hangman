const wrongLettersEl = document.getElementById('wrong-letters');
const blanksEL = document.getElementById('blanks');
const popup = document.getElementById('popup-container');
const playAgainBtn = document.getElementById('play-btn');
const finalMessage = document.getElementById('final-message');
const notification = document.getElementById('notification');
const questionsEl = document.getElementById('questions');

const figure = document.querySelectorAll('.figure-part');

const questions = ['What is the month of birth of Talha ?',
 'What is the month of birth of Sameer ?',
 'What is the month of birth of Rimsha ?', 
 'What is the month of birth of Alfia ?',
 'What is the month of birth of Haniya ?',
 'What is the month of birth of Saadan ?',
 'What is the month of birth of Rida ?' ,
 'What is the month of birth of Anabia ?' 
];
const words = ['september','july','may','november','september','March','august','August'];


let a = Math.floor(Math.random() * 4);

console.log(a);

let  selectedQuestions = questions[a];
let selectedWord = words[a];


const correctLetters = [];
const wrongLetters = [];





//Show Hidden word
function displayWord() {

       questionsEl.innerHTML = `
       <h3>${selectedQuestions}</h3>
       `;    

       blanksEL.innerHTML = `
       ${selectedWord
                      .split('')
                      .map(  letter =>  `<span class="letters">${correctLetters.includes(letter) ? letter : ''} </span>`)
                      .join('')
        }
         `;
    
     
       //very imp step
     const innerWord = blanksEL.innerText.replace(/\n/g, '');
     
      if(innerWord === selectedWord) {
          finalMessage.innerText = 'Congratulations! You won! 🤗';
          popup.style.display='flex'; 
      }

    } 



// Keydown letter press
window.addEventListener('pointerdown', e => {
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key;
  
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
  
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
  
          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  });

 //Update the wrong letters
  function updateWrongLettersEl() {
      //Display Wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : '' } 
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;
    
    //Display parts
    figure.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors){
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }

    });

    //check if lost
    if(wrongLetters.length === figure.length){
        
            finalMessage.innerText = 'Unfortunately You Lost! 😟';
            popup.style.display='flex'; 
              
    }

}

   // show Notification
   function showNotification() {
       notification.classList.add('show');
       setTimeout( () => notification.classList.remove('show'),2000);
   }


   //handle popup
   playAgainBtn.addEventListener('click', () => {

      //empty arrays
      correctLetters.splice(0);
      wrongLetters.splice(0);

      a = Math.floor(Math.random() * 4);
      selectedWord = words[a];
      selectedQuestions = questions[a];
      displayWord();

      updateWrongLettersEl();

      popup.style.display = 'none';

   });

displayWord();

