let sequence = [];
let humanSequence = [];
//keep track of the tile clicks
let level = 0;

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');
const timerText = document.querySelector('#timer')

function resetGame(text) {
  alert(text);
  sequence = [];
  humanSequence = [];
  level = 0;
  startButton.classList.remove('hidden');
  heading.textContent = 'SIMON';
  info.classList.add('hidden');
  tileContainer.classList.add('unclickable');
  location.reload();
  timerText.classList.toggle('hidden')

}

function humanTurn(level) {
  tileContainer.classList.remove('unclickable');
  info.textContent = `You give it a go: ${level} Tap${level > 1 ? 's' : ''}`;
  // allows the btns to be clicked after the seq is completed by the computer
  // prompts the player to go and lets them know what level this is
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add('activated');
  sound.play();

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
  // tile is activated and sound played
  // activated is removed after 300ms
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
    // the number of milliseconds changes on each iteration 
    // the tile is called with the appropriate color and sound 
    // iterates over the seq array and it calls the activateTile at intervals so they don't all appear at once
  });
}

function nextStep() {
  const tiles = ['red', 'green', 'blue', 'yellow'];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
  // rounded random number to between 0 and 3, the number of tiles in the array
}

function nextRound() {
  level += 1;

  tileContainer.classList.add('unclickable');
  info.textContent = 'The computer is thinking...';
  heading.textContent = `Level ${level} of 30`;
  // adding unclickable and updating the level and info

  // copy all elements in the 'seq' array to 'nextSeq
  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
  // executes the player's turn after the computer goes and the total length of time is the level times 600
}

function handleClick(tile) {
  const index = humanSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();
  // pushes tile value to human sequence and stores it as index and the btn sound is played

  const remainingTaps = sequence.length - humanSequence.length;

  if (humanSequence[index] !== sequence[index]) {
    resetGame('Ohhhhh, GAME OVER love. Do try again soon. Bye Bye Now!');
    return;
    //if the human tile value does not match computer value, game resets
  }

  if (humanSequence.length === sequence.length) {
    if (humanSequence.length === 30) {
      resetGame('I guess you have something to be proud of... CONGRATULATIONS, by the way.');
      return
      // complete 30 rounds and you win the game
    }

    humanSequence = [];
    info.textContent = 'Not bad. Try this...';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }
  // is the player's sequence matches the computer then they are sent to the next round

  info.textContent = `Your turn: ${remainingTaps} Tap${remainingTaps > 1 ? 's' : ''
    }`;
  // player can begin the round and it shows how many items they need to get right
}

function startGame() {
  startButton.classList.add('hidden');
  info.classList.remove('hidden');
  info.textContent = 'Wait for it...';
  timerText.classList.toggle('hidden')

  let sec = 90;
  let time = setInterval(myTimer, 1000);

  function myTimer() {
    document.getElementById('timer').innerHTML = sec + "  seconds left";
    sec--;
    if (sec == -1) {
      clearInterval(time);
      resetGame("You timed out!! So sad.");
    }
  };

  nextRound();
}
// allows the info to display once the start button is clicked, hides the start button and brings forward the wait message

startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
  // data-tile value is accessed and stored in the tile variable (only elements without data-tile attribute), if the value is not an empty string, handleClick function is executed with the tile value as its only argument
});
