let sequence = [];
let humanSequence = [];
//keep track of the tile clicks
let level = 0;

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

function resetGame(text) {
    alert(text);
    sequence = [];
    humanSequence = [];
    level = 0;
    startButton.classList.remove('hidden');
    heading.textContent = 'SIMON';
    info.classList.add('hidden');
    tileContainer.classList.add('unclickable');
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
