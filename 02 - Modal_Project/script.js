'use strict';

const modal 		= document.querySelector('.modal');
const overlay 		= document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal'); // Allows us to select all the show-modal from the html file

const closeModal = function(){
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

const openModal = function(){
	console.log('Button clicked');
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++){
  btnsOpenModal[i].addEventListener('click', openModal);
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);


// we use 'event to tell javascript when an event occurs, to pass down the event arguement down'
document.addEventListener('keydown', function (event) {
	console.log(event.key);

	if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});
 