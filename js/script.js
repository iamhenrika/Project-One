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