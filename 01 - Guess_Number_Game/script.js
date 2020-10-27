'use strict';

let secretNumber = Math.trunc(Math.random()*20)+1;
let score = 20;
let highscore = 0 ;

// A Function that allows us to display a message
const displayMessage = function(message){
	document.querySelector('.message').textContent = message;
};

// AGAIN Button
document.querySelector('.again').addEventListener('click', function(){
	score = 20;
	secretNumber = Math.trunc(Math.random()*20)+1;

	displayMessage('Start guessing...');
	document.querySelector('.score').textContent = score;
	document.querySelector('.number').textContent = '?';
	document.querySelector('.guess').value = '';
	
	document.querySelector('body').style.backgroundColor = '#222';
	document.querySelector('.number').style.width = '15rem';
});

// CHECK Button
document.querySelector('.check').addEventListener('click', function(){
	const guess = Number(document.querySelector('.guess').value);
	console.log(guess, typeof guess);

	if (score !== 0 ){
		// When input isn't a number
		if (!guess) {
			document.querySelector('.message').textContent = 'X No Number!';
		// When player wins
		} else if (guess === secretNumber) {
			document.querySelector('.message').textContent = " * Correct Number !";
			document.querySelector('body').style.backgroundColor = '#60b347';
			document.querySelector('.number').style.width = '30rem';
			document.querySelector('.number').textContent = secretNumber;
			
			if (highscore < score) {
				highscore = score;
				document.querySelector('.highscore').textContent = highscore;
			} 
		
		}else if (guess !== secretNumber) {
			displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
			score--;
			document.querySelector('.score').textContent = score;
		}

	} else{
		document.querySelector('.message').textContent = ' =[ You lose!';
	}
});