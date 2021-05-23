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
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

////////////////////displayMovements///////////////////////

const displayMovements= function (movements){
  containerMovements.innerHTML='';

  // const movs=sorts? movements.slice().sort((a,b)
  //   => a - b) : movements;

   movements.forEach(function (mov, i){
    const type= mov > 0 ? 'deposit':'withdrawal';
    const html=` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
    <div class="movements__value">${mov}</div>
      </div>  `;

    containerMovements.insertAdjacentHTML('afterbegin',html);
  });

};
  

  ////////////display summary/////////////////

  const calcDisplaySummary = function(acc){

    const incomes=acc.movements.filter(mov=>mov>0).reduce((arr,cur)=>arr+cur,0);
    labelSumIn.textContent=`${incomes}₹`;
    const outcome=acc.movements.filter(mov=>mov<0).reduce((arr,cur)=>(arr+cur),0);
    labelSumOut.textContent=`${Math.abs(outcome)}₹`;

    const interest= acc.movements.filter(mov=>mov>0).map(deposit =>deposit* 1.2/100)
    .filter((int,i,arr)=>{
      //console.log(arr);
      return int>=10;
    })
    .reduce((acc,int)=>acc+int,0)
    labelSumInterest.textContent=`${interest}₹`
  };


//////////////////////////////////////User names

const createUserNames = function(accs){

  accs.forEach(function(acc){
  acc.userName= acc.owner.toLowerCase().split(' ').map(name =>
      name[0]
     ).join('');
  
  })
  

}

createUserNames(accounts);
// console.log(accounts);

///////////print balance//////////

const calcPrintBalance= function(account){

  
    account.balance= account.movements.reduce((acc,cur,i,arr) =>
    acc+=cur
 ,0);
 labelBalance.textContent= `${account.balance}₹`
   
};

//console.log(accounts);

////event handlers//////////////////
let currentAccount;

btnLogin.addEventListener('click',function(e){
  ///prevent form from submitting 
  e.preventDefault();
  currentAccount= accounts.find(acc=>acc.userName===inputLoginUsername.value);
  if(currentAccount?.pin===Number(inputLoginPin.value)){
   ///display UI welcome message
   labelWelcome.textContent= `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
   containerApp.style.opacity=100;

   ///clear inputfields on login
    inputLoginPin.value=inputLoginUsername.value='';
    inputLoginPin.blur();

   //displaymovemets
    updateUI(currentAccount);
  }
});

/////////UI Update//////////////

const updateUI= function(acc){
  displayMovements(acc.movements);

//display summary
calcDisplaySummary(acc);
///display balance 
calcPrintBalance(acc);
};

//////////Transfers///////

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();

  const amount= Number(inputTransferAmount.value);
  const receiverAccount=accounts.find(
    acc=>acc.userName===inputTransferTo.value
    );

    inputTransferTo.value=inputTransferAmount.value='';
    if(amount>0 && receiverAccount &&
       currentAccount.balance>=amount&&
        receiverAccount?.userName!==currentAccount.userName){
          //doing transfer
         currentAccount.movements.push(-amount);
          receiverAccount.movements.push(amount);

          //update UI
          updateUI(currentAccount);
        }

});

////////Loan/////////

 btnLoan.addEventListener('click',function(e){
   e.preventDefault();

   const amount= Number(inputLoanAmount.value);

   if(amount>0&& 
    currentAccount.movements.some(mov=>mov>amount*0.1)){
      ///Add movement
      currentAccount.movements.push(amount);
      updateUI(currentAccount);
    
    }
    inputLoanAmount.value='';

 })

//////////////////////////////
//////////////////close account//////////////////////////////////

btnClose.addEventListener('click', function(e){
  e.preventDefault();


  if(inputCloseUsername.value===currentAccount.userName&&
    Number(inputClosePin.value)===currentAccount.pin){

      const index= accounts.findIndex(
        acc=> acc.userName===currentAccount.userName);
        ///delete account
      accounts.splice(index,1);
      ////hide Ui
    containerApp.style.opacity=0;
  }
  inputCloseUsername.value=inputClosePin.value='';

});

/////////sort movements/////
let sorted=false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();

  displayMovements(currentAccount.movements,!sorted);
  sorted=!sorted;
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// // LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

 const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const InrtoUsd= 0.014;
// const movementsUSD = movements.map(mov =>  mov*InrtoUsd
//  );
//  console.log(movements);
//  console.log(movementsUSD);
/////////////////////////////////////////////////


//////////////////FILTER

const deposits= movements.filter(function (mov){
  return mov > 0 ;
})

//console.log(deposits);

const depositsFor =[];
for( const mov of movements) if(mov>0) depositsFor.push(mov);
// console.log(depositsFor);

const withdrawals= movements.filter(mov=> mov<0);
// console.log(withdrawals);

/////////////////Reduce//////////////////

// const balance= movements.reduce(function(acc,cur,i,arr){
//   return acc+=cur;
// },0);///here 0 is initial value of accumulator

const balance= movements.reduce((acc,cur,i,arr) =>
   acc+=cur
,0);///here 0 is initial value of accumulator

// console.log(balance);

//Maximum value

const maxBalance= movements.reduce( (acc,cur,i)=>
acc > cur ? acc:cur
,0)

//console.log(maxBalance);

//////////////Chaining all////////////////////////
const InrtoUsd= 0.014;

const totalDepositsUSD= movements
.filter(mov => mov > 0)
.map((mov,i,arr)=>{
  //console.log(arr);
 return  mov*InrtoUsd})
.reduce((acc,cur)=> acc+cur,0);

//console.log(totalDepositsUSD);


/////////////////Find Method///////

// const firstWithdrawal=movements.find(mov=>mov<0)

// console.log(firstWithdrawal);


// const account =accounts.find(mov=>mov.owner==='Jessica Davis');
// console.log(account);

////////////some every includes/////////

// console.log(movements);

// // console.log(movements.includes(-130));

// const anyDeposits= movements.some(mov=>mov>340000);
// // console.log(anyDeposits);

// console.log(account4.movements.every(mov=> mov>0));


// ///////flat and flatmap

// const arr=[[1,2,3],5,[8,6]]
// console.log(arr.flat());
// console.log(arr.flat(2));

// const overallBalance=accounts.map(acc =>acc.movements).flat().reduce((acc,cur)=>acc+cur);;

// console.log(overallBalance);
// //flatmap
// const overallBalance2=accounts
// .flatmap(acc =>acc.movements)
// .reduce((acc,cur)=>acc+cur,0);;
// console.log(overallBalance2);

//////////////////////////////////////