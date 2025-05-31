const principalElement = document.querySelector("#principal");
const yearsElement = document.querySelector("#years");
const interestElement = document.querySelector("#interest");
const calcBtn = document.querySelector("#calculate");
const displayPayment = document.querySelector("#output");

class Loan {
    constructor(principal, years, interest) {
        this.principal = principal;
        this.years = years;
        this.interest = interest;
    }
    requestConfirm() {
    }
    monthlyPayment() {
        const r = this.interest / 100 / 12;
        const b = this.years * 12;
        const numerator = this.principal * r * (1+r) ** b;
        const denominator = (1+r) ** b - 1;
        let paymentPerMonth = numerator / denominator;
        if (r === 0) {
            paymentPerMonth = this.principal / b;
        }
        console.log(`You have quoted a loan of $${this.principal} over ${this.years} years at a ${this.interest}% APY.`);
        return Number(paymentPerMonth).toFixed(2);
    }
}

function calculate() {
    let principal = parseFloat(principalElement.value);
    let years = parseFloat(yearsElement.value);
    let interest = parseFloat(interestElement.value);

    principalElement.value = '';
    yearsElement.value = '';
    interestElement.value = '';

    const loan = new Loan(principal, years, interest);
    displayPayment.textContent = `Your payment is $${loan.monthlyPayment()}/month. \n ($${principal} over ${years} years at an ${interest}% APY.)`;
}

calcBtn.addEventListener('click', calculate);

//Contact saved animation --- needs array integration
// confirmation = 'Your contact was saved.'

// const fullName = document.querySelector('#name');
// const phoneNumber = document.querySelector('#phone');
// const company = document.querySelector('#company');

// const contactSaved = function() {
//     const names = fullName.value.trim();
//     const numbers = phoneNumber.value.trim();
//     const companies = company.value.trim();

//     alert(`You added:\n ${names} \n ${numbers} \n ${companies}. \n Plan a meeting.`);
// };

// document.querySelector('.addbtn').addEventListener('click', contactSaved);

//Save email into array

//Closures and Scopes


//// Independent variables using same function
// function createBetterCouter() {
//     let count = 9;

//     return function () {
//         count--;
//         console.log(`Current Count: ${count}`);
//     };
// }

// const count9 = createBetterCouter();
// const count8 = createBetterCouter();

// count9();
// count9();

// count8();
// count8();

//// Private variables to protect data manipulation
    // function createBankAccount() {
    //     let balance = 0;

    //     return {
    //         //Set up function for deposits
    //         deposit(amount) {
    //         if (amount > 0) {
    //             balance += amount; 
    //             console.log(`You deposited: $${amount}`);
    //         } else {
    //             console.log(`Deposit amount must be positive.`);
    //         }
    //     },

    //         //Set up function for withdraws
    //         withdraw(amount) {
    //             if (amount > balance) {
    //                 console.log(`Insufficient funds. You need $${amount - balance} more`);
    //             } else if (amount <= 0) {
    //                 console.log("Withdrawal amount must be positive");
    //             } else {
    //                 balance -= amount;
    //                 console.log(`You withdrew: $${amount}`);
    //             }
    //         },

    //         //Create private scope for balance variable
    //         getBalance() {
    //             return balance;
    //         }
    //     };
    // }

    // const myAccount = createBankAccount();

    // myAccount.deposit(100);
    // myAccount.withdraw(40);
    // console.log(`Your new balance: $${myAccount.getBalance()}`);
