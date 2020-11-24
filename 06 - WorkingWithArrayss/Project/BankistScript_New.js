'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate    = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn   = document.querySelector('.summary__value--in');
const labelSumOut  = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer   = document.querySelector('.timer');

const containerApp       = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin    = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan     = document.querySelector('.form__btn--loan');
const btnClose    = document.querySelector('.form__btn--close');
const btnSort     = document.querySelector('.btn--sort');

const inputLoginUsername  = document.querySelector('.login__input--user');
const inputLoginPin       = document.querySelector('.login__input--pin');
const inputTransferTo     = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount     = document.querySelector('.form__input--loan-amount');
const inputCloseUsername  = document.querySelector('.form__input--user');
const inputClosePin       = document.querySelector('.form__input--pin');


//////////////////////////////////////////////////
//------------------- Project ------------------//
//                                              //

// ----- FUNCTIONS ----- //
const displayMovements = function(movements, sort = false) {
  // - clearing the pre-text content from the HTML file.
  containerMovements.innerHTML = '';

  // - .slice() will make a copy of the array
  // - .sort() will display the movemnts in ascedning order
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // - in this function we will place either deposit or withdrawal.
  //   using the html template literal will allow us to access the code from the HTML file
  //   and replace whatever we would like.
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    // template literal
    const html = `
     <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;

    // this allows me to insert the 'html' variable into the .html file
    containerMovements.insertAdjacentHTML('afterbegin', html);
    // afterbegin: will list last elemnent to the first element going down
    // beforeend: will be the revers of afterbegin

  });
};

// ---- Create Usernames Initials ----
// Notes: Adds username property in the accounts
// includes: forEach: sideEffect to mutate the original array
//           map(): to create an array of username insitals

const createUsernames = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  });
};

createUsernames(accounts);

// --- Display Balance ----
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc,curr) => acc + curr, 0);
  labelBalance.textContent = `${acc.balance}  €`;
};

// ---- Display Summary ----
const calcDisplaySummary = function(acc) {
  const income = acc.movements.filter(mov => mov < 0).reduce((a,b) => a + b, 0);
  labelSumIn.textContent = `${income} €`;

  const out = acc.movements.filter(mov => mov < 0).reduce((a,b) => a + b, 0);
  labelSumOut.textContent = `${out} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate)/100)
    .filter((int, i, arr) => { 
      console.log(arr);
      return int >= 1;
    }) // - excluding interest below 1.
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} €`;

};


// ----- EVENT HANDLERS ----- //
//                             //
let currentAccount;

const updateUI = function(currentAccount){
  // Display movements
  displayMovements(currentAccount.movements);
  // Display balance
  calcDisplayBalance(currentAccount);
  // Display summary
  calcDisplaySummary(currentAccount);
};

// - Button Login
btnLogin.addEventListener('click', function (event){
  event.preventDefault(); // prevents form from submitting
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // - Display UI and Welcome message
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    // - Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // - will hide the blinking Pin
    // - Display UI
    updateUI(currentAccount);
    console.log('LOGIN');
  }
});

// - Button Transfer
btnTransfer.addEventListener('click', function(event){
  event.preventDefault(); // prevents form from submitting
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts
    .find(acc => acc.username === inputTransferTo.value || acc.owner === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username){
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

// - Button Close
btnClose.addEventListener('click', function(event){
  event.preventDefault(); // prevents form from submitting
  if (currentAccount.username === inputCloseUsername.value &&
      currentAccount.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);

    // - Delete Account
    accounts.splice(index,1);
    // - Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// - Button Loan request
btnLoan.addEventListener('click', function(event){
  event.preventDefault();

  const loan = Number(inputLoanAmount.value);
  if (loan > 0 && currentAccount.movements.some(mov => mov >= loan * 0.1)){
    // - add the movement
    currentAccount.movements.push(loan);
    // - updateUI
    updateUI(currentAccount);
    //- clear input field
    inputLoanAmount.value = '';
  }
});

// Button Sort
let sorted = false; // - variable must be outside the function to preserve its state
btnSort.addEventListener('click', function(event){
  event.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});