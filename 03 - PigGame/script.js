'use strict';

//////////////////////////////////
// Player 1 Elements
//
const score0   = document.getElementById('score--0');
const current0 = document.getElementById('current--0');
const player0  = document.querySelector('.player--0');

//////////////////////////////////
// Player 2 Elements
//
const score1   = document.getElementById('score--1');
const current1 = document.getElementById('current--1');
const player1  = document.querySelector('.player--1');

//////////////////////////////////
// Other Elements
//
const dice 	  = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew  = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore, playing;

//////////////////////////////////
// Functions
//
const nextPlayer = function(){
	currentScore = 0;
	document.getElementById(`current--${activePlayer}`).textContent = currentScore;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0.classList.toggle('player--active');
	player1.classList.toggle('player--active');
};

const initial = function(){
	score0.textContent	 = 0;
	score1.textContent	 = 0;
	current0.textContent = 0;
	current1.textContent = 0;
	dice.classList.add('hidden');

	scores = [0, 0];
	activePlayer = 0;
	currentScore = 0;
	playing = true;

	document.querySelector(`.player--0`).classList.remove('player--winner');
	document.querySelector(`.player--1`).classList.remove('player--winner');
	document.querySelector(`.player--0`).classList.remove('player--active');
	document.querySelector(`.player--1`).classList.remove('player--active');
	document.querySelector(`.player--0`).classList.add('player--active');
}

////////////////////////////////////
// Button: roll the dice
//
btnRoll.addEventListener('click', function() {
	if (playing){
		// 1. Get dice roll
		let roll = Math.trunc(Math.random()*6) + 1;
		console.log(roll);
		// 2. Display dice
		dice.src = `dice-${roll}.png`;
		dice.classList.remove('hidden');
		// 3. Add rolls and switch players
		if (roll !== 1){
			currentScore += roll;
			document.getElementById(`current--${activePlayer}`).textContent = currentScore;

		} else {
			nextPlayer();
		}
	}
});

////////////////////////////////////
// Button: hold value
//
btnHold.addEventListener('click', function() {
	if (playing){
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
		if (scores[activePlayer] >= 100){
			playing = false;
			document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
			document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
			dice.classList.add('hidden');

		} else {
			nextPlayer();
		}
	}
});

////////////////////////////////////
// Button: New game
//
btnNew.addEventListener('click', initial);

initial();