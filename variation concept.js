/*Computer and Multiplayer variation

concept:
computer creates a pattern and then player one attempts to recreate it
if player one gets it correct they move on to the next round
if they get it wrong the game prompts player two
player two starts with the same pattern and attempts to pass the level player one lost at
if they do they win
if they don't player one wins
*/

// html bits
<div class="turns">
    <div id="p1" class="player active">Player 1: <span id="result1">0</span></div>
    <div id="p2" class="player">Player2: <span id="result2">0</span></div>
</div>

// beginning js
const playerOne = document.querySelector('#p1')
const playerTwo = document.querySelector('#p2')
console.log([p1, p2])

let player1 = true
let player2 = false

