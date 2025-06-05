//// Dropdown menu interaction
const housesDisplay = document.querySelector(".display-houses")
    // this element fomats saved houses 
const addCancelBtn = document.querySelector("#add-house")
    // this changes state to cancel button
    // this reveals criteria dropdowns
    // this creates save button 
const dropdowns = document.querySelectorAll(".dropdown")
    // This includes Type of Home
    // etc...
const selectBtns = document.querySelectorAll(".select")
const activeCriteria = document.querySelectorAll(".active")
    // this allows clicked elements to be stored in variable
const criteriaLists = document.querySelectorAll(".menu")
const liElements = document.querySelectorAll("li")
const saveBtn = document.querySelector("#save-btn")
    // this targets the save button at the bottom of the div
const typeOfHomeBtn = document.querySelector("#type-of-home")
const bedsBtn = document.querySelector("#beds")
const bathsBtn = document.querySelector("#baths")
const floorsBtn = document.querySelector("#floors")
const windowDirectionBtn = document.querySelector("#window-direction")
let activeHouse = false;
let activeDropdown = false;

function toggleActiveHouse() {
    activeHouse = !activeHouse
    if (!activeHouse) {
        addCancelBtn.textContent = "Add Property"
        saveBtn.classList.remove("visable");
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove("visable");
        });
    }
    if (activeHouse) {
        addCancelBtn.textContent = "Cancel"
        saveBtn.classList.add("visable");
        dropdowns.forEach(dropdown => {
            dropdown.classList.add("visable");
        });
        saveBtn.onclick = saveHouse;    
    }
}

function toggleDropdownMenu() {
    activeDropdown = !activeDropdown
    if (!activeDropdown) {
        this.nextElementSibling.classList.remove("visable");
    }
    if (activeDropdown) {
        this.nextElementSibling.classList.add("visable");
    }
}

function updateCriteria() {
    this.parentElement.previousElementSibling.textContent = this.textContent;
    toggleDropdownMenu.call(this.parentElement.previousElementSibling);
}

function saveHouse() {
    const typeOfHome = typeOfHomeBtn.textContent
    const beds = bedsBtn.textContent
    const baths = bathsBtn.textContent
    const floors = floorsBtn.textContent
    const windowDirection = windowDirectionBtn.textContent

    if (typeOfHome === '--select one' || beds === '--select one' || baths === '--select one' || floors === '--select one' || windowDirection === '--select one') {
        alert("You must complete all criteria.")
        return;
    }
    
    toggleActiveHouse();

    housesDisplay.textContent = `${typeOfHome} with ${beds} bed, ${baths} bath, and ${floors} floor. Master windows on the ${windowDirection} wall.`
}

addCancelBtn.onclick = toggleActiveHouse;
    // addCancelBtn.addEventListener('click', toggleActiveHouse);
selectBtns.forEach(btn => {
    btn.onclick = toggleDropdownMenu;
});
liElements.forEach(criteria => {
    criteria.onclick = updateCriteria;
})

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

////Contact saved animation --- needs array integration
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
