///////////////
//////SPA//////
///////////////

const navs = document.querySelectorAll("li");
const contentDisplay = document.querySelector("#app");

function updatePageTitle() {
    const pageTitle = document.getElementById("page-title");
    let path = this.textContent;

    pageTitle.textContent = path
    contentDisplay.innerHTML = "";
    console.log("Content cleared")
    if (this.textContent === 'Tools') {
        addToolsContent();
        const property = new AddPropertyUI(contentDisplay);
        property.init();
        const loan = new LoanCalcUI(contentDisplay);
        loan.init();
    } if (this.textContent === 'Concepts') {
        addConceptsContent();
    } if (this.textContent === "Notes") {
        addNotesContent();
        const note = new NotesUI(contentDisplay);
        note.init();
    }
}
function addToolsContent() {
    contentDisplay.innerHTML = `<h2>Property Crtieria</h2>
        <div class="display-houses"></div>
        <button class="primary-btns" id="add-house">Add Property</button>
        <div class="dropdown">
            <h3 class="category">Type of Home</h3>
            <button id="type-of-home" class="select">--select one</button>
            <ul class="menu">
                <li>Single Family</li>
                <li>Apartment</li>
                <li>Townhouse</li>
                <li>Duplex</li>
            </ul>
            <h3 class="category">Beds</h2>
            <button id="beds" class="select">--select one</button>
            <ul class="menu">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
            <h3 class="category">Baths</h2>
            <button id="baths" class="select">--select one</button>
            <ul class="menu">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
            <h3 class="category">Floors</h2>
            <button id="floors" class="select">--select one</button>
            <ul class="menu">
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <h3 class="category">Master Bed Window Direction</h2>
            <button id="window-direction" class="select">--select one</button>
            <ul class="menu">
                <li>north</li>
                <li>south</li>
                <li>east</li>
                <li>west</li>
            </ul>
            <!-- Insert more dropdowns here -->
            <button class="primary-btns" id="save-btn">Save</button>
        </div>

    <h2>Loan Calculator</h2>
    <input id="principal" type="number" min="0" placeholder="Enter loan amount">
    <input id="years" type="number" min="0" placeholder="Enter length of loan (yrs)">
    <input id="interest" type="number" min="0" placeholder="Enter APY">
    <button id="calculate">Calculate</button>
    <p id="output"></p>`;
}
function addConceptsContent() {
    contentDisplay.innerHTML = `    <h4>Down payment</h4>
    <p>the money you provide upfront to the financer</p>
    <h4>APY</h4>
    <p>the interest that you pay on the amount of debt you hold, typically compounded every month</p>
    <h4>Collateral</h4>
    <p>assets, typically with low liquidity, that you pledge to the lender subject to seizure on default </p>`
}
function addNotesContent() {
    contentDisplay.innerHTML = `    <div id="noteContainer">
    <p>Your Notes</p>
    <ul id="savedNotes"> 
    </ul>
    <input id="noteTitle" type="text" placeholder="Note Title">
    <button class="notesBtn" id="saveButton">Save Note</button>
    <button class="notesBtn" id="clearButton">Clear Note</button>
    <textarea id="note" placeholder="Note Content"></textarea>
    </div>`
}

navs.forEach(li => {
    li.addEventListener('click', updatePageTitle)
});

///////////////
//Preferences//
///////////////

//// Dark and Light Mode
const darklLightToggle = document.querySelector("#d-l-toggle");
const body = document.querySelector("body");
const headers2 = document.querySelectorAll('h2');

function restoreMode() {
    const savedState = localStorage.getItem("switchState");
    if (savedState === "on") {
      darklLightToggle.checked = true;
      body.style.backgroundColor = "#19b0ae"
      headers2.forEach(h2 => {
        h2.style.color = "white"
      });
      console.log("Restored: Dark Mode");
    } else {
      darklLightToggle.checked = false;
      console.log("Restored: Light Mode");
    }
};

function saveMode() {
    if (this.checked) {
        localStorage.setItem("switchState", "on");
        body.style.backgroundColor = "#19b0ae"
        headers2.forEach(h2 => {
            h2.style.color = "white"
          });
      } else {
        localStorage.setItem("switchState", "off");
        body.style.backgroundColor = "#8ae1e0"
        headers2.forEach(h2 => {
            h2.style.color = "black"
          });
      }
};

window.addEventListener("DOMContentLoaded", restoreMode);
darklLightToggle.addEventListener("change", saveMode);

////////////////
/////Notes//////
////////////////

class NotesUI {
    constructor(container) {
        this.container = container;
        this.savedNotesList = container.querySelector("#savedNotes");
        this.titleInput = container.querySelector("#noteTitle");
        this.noteTextarea = container.querySelector("#note");
        this.saveButton = container.querySelector("#saveButton");
        this.clearButton = container.querySelector("#clearButton")
    } init() {
        // restore session data
        this.restoreSession();
        // load saved notes
        this.loadSavedNotes();
        // Save current form inputs to sessionStorage
        this.titleInput.addEventListener("input", () => {
            sessionStorage.setItem("noteTitle", this.titleInput.value);
        });
        
        this.noteTextarea.addEventListener("input", () => {
            sessionStorage.setItem("noteContent", this.noteTextarea.value);
        });
        // save note permanently
        this.saveButton.addEventListener("click", () => this.saveNote());
        this.clearButton.addEventListener("click", () => this.clearNoteContent())
    } restoreSession() {
        const savedTitle = sessionStorage.getItem("noteTitle");
        const savedContent = sessionStorage.getItem("noteContent");

        if (savedTitle) this.titleInput.value = savedTitle;
        if (savedContent) this.noteTextarea.value = savedContent;
    } loadSavedNotes() {
        const notes = JSON.parse(localStorage.getItem("savedNotes")) || [];

        notes.forEach(note => {
            this.createNoteListItem(note.title, note.content);
        });
    } clearNoteContent() {
        if (confirm("Are you sure you want to clear note?")) {
            this.titleInput.value = '';
            this.noteTextarea.value = '';
        } else {
            return;
        }
        
    } saveNote() {
        const title = this.titleInput.value.trim();
        const content = this.noteTextarea.value.trim();

        if (!title || !content) {
            alert("Title and content are required.")
            return;
        }

        const notes = JSON.parse(localStorage.getItem("savedNotes")) || [];

        if (notes.some(note => note.title === title)) {
            alert("Make your note title unique.");
            return;
        }

        notes.push({ title, content }); 
        localStorage.setItem("savedNotes", JSON.stringify(notes));

        this.createNoteListItem(title, content);
        this.titleInput.value = "";
        this.noteTextarea.value = "";
        sessionStorage.clear();
    } createNoteListItem(title, content) {
        const li = document.createElement("li");
        li.textContent = title;
        li.classList.add("note-item");

        li.addEventListener("click", () => {
            this.titleInput.value = title;
            this.noteTextarea.value = content;
            sessionStorage.setItem("noteTitle", title);
            sessionStorage.setItem("noteContent", content);
        });

        this.savedNotesList.appendChild(li);
    }
}

////////////////
//add Property//
////////////////

//// Dropdown menu interaction
let activeHouse = false;
let activeDropdown = false;
class AddPropertyUI {
    constructor(contentDisplay) {
        this.contentDisplay = contentDisplay;
        this.housesDisplay = contentDisplay.querySelector(".display-houses")
            // this element fomats saved houses 
        this.addCancelBtn = contentDisplay.querySelector("#add-house")
            // this changes state to cancel button
            // this reveals criteria dropdowns
            // this creates save button 
        this.dropdowns = contentDisplay.querySelectorAll(".dropdown")
            // This includes Type of Home
            // etc...
        this.selectBtns = contentDisplay.querySelectorAll(".select")
        this.activeCriteria = contentDisplay.querySelectorAll(".active")
            // this allows clicked elements to be stored in variable
        this.criteriaLists = contentDisplay.querySelectorAll(".menu")
        this.liElements = contentDisplay.querySelectorAll("li")
        this.saveBtn = contentDisplay.querySelector("#save-btn")
            // this targets the save button at the bottom of the div
        this.typeOfHomeBtn = contentDisplay.querySelector("#type-of-home")
        this.bedsBtn = contentDisplay.querySelector("#beds")
        this.bathsBtn = contentDisplay.querySelector("#baths")
        this.floorsBtn = contentDisplay.querySelector("#floors")
        this.windowDirectionBtn = contentDisplay.querySelector("#window-direction")
    } init() {
        this.addCancelBtn.onclick = this.toggleActiveHouse.bind(this);
        this.selectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleDropdownMenu(e.target);
                this.hideSelectBtn(e.target);
            });
        });
        this.liElements.forEach(criteria => {
            criteria.onclick = (e) => this.updateCriteria(e.target);
        })
    } toggleActiveHouse() {
        activeHouse = !activeHouse
        if (!activeHouse) {
            this.addCancelBtn.textContent = "Add Property"
            this.saveBtn.classList.remove("visable-criteria");
            this.dropdowns.forEach(dropdown => {
                dropdown.classList.remove("visable-criteria");
            });
            }
        if (activeHouse) {
            this.addCancelBtn.textContent = "Cancel"
            this.saveBtn.classList.add("visable-criteria");
            this.selectBtns.forEach(btn => {
                btn.textContent = '--select one';
            })
            this.dropdowns.forEach(dropdown => {
                dropdown.classList.add("visable-criteria");
            });
            this.saveBtn.onclick = this.saveHouse.bind(this);    
            }
    } toggleDropdownMenu (btn) {
        activeDropdown = !activeDropdown;
        const menu = btn.nextElementSibling;
        menu.classList.toggle("visable-dropdown", activeDropdown);
    } updateCriteria(item) {
        const button = item.parentElement.previousElementSibling;
        button.textContent = item.textContent;
        this.toggleDropdownMenu(button);
    } saveHouse() {
        const typeOfHome = this.typeOfHomeBtn.textContent
        const beds = this.bedsBtn.textContent
        const baths = this.bathsBtn.textContent
        const floors = this.floorsBtn.textContent
        const windowDirection = this.windowDirectionBtn.textContent
    
        if (typeOfHome === '--select one' || beds === '--select one' || baths === '--select one' || floors === '--select one' || windowDirection === '--select one') {
            alert("You must complete all criteria.")
            return;
        }
        
        this.toggleActiveHouse();
    
        const houseInfo = document.createElement("p");
        houseInfo.textContent = `${typeOfHome} with ${beds} bed, ${baths} bath, and ${floors} floor. Master windows on the ${windowDirection} wall.`;
    
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.classList.add("delete");
    
        this.housesDisplay.style.backgroundColor = "white";
        this.housesDisplay.style.padding = "5px 5px";
        this.housesDisplay.style.marginBottom = "30px";
        this.housesDisplay.style.fontWeight = "bold";
    
        deleteBtn.addEventListener("click", () => {
            houseInfo.remove();
        });
     
        houseInfo.appendChild(deleteBtn);
        this.housesDisplay.appendChild(houseInfo);
    } hideSelectBtn(btn) {
        btn.classList.add("hidden");
    }
}

///////////////
///Loan Calc///
///////////////


class LoanCalcUI {
    constructor(contentDisplay) {
        this.contentDisplay = contentDisplay
        this.principalElement = contentDisplay.querySelector("#principal");
        this.yearsElement = contentDisplay.querySelector("#years");
        this.interestElement = contentDisplay.querySelector("#interest");
        this.calcBtn = contentDisplay.querySelector("#calculate");
        this.displayPayment = contentDisplay.querySelector("#output");
    } init() {
        this.calcBtn.addEventListener('click', this.calculateMonthly.bind(this));
    } calculateMonthly() {
        let principal = parseFloat(this.principalElement.value);
        let years = parseFloat(this.yearsElement.value);
        let interest = parseFloat(this.interestElement.value);
        // Clear users input values
        this.principalElement.value = '';
        this.yearsElement.value = '';
        this.interestElement.value = '';
        // Math operations
        const r = interest / 100 / 12;
        const b = years * 12;
        const numerator = principal * r * (1+r) ** b;
        const denominator = (1+r) ** b - 1;
        let paymentPerMonth = numerator / denominator;
        if (r === 0) {
            paymentPerMonth = this.principal / b;
        }
        console.log(`You have quoted a loan of $${principal} over ${years} years at a ${interest}% APY.`);
        this.displayPayment.textContent = `Your payment is $${paymentPerMonth.toFixed(2)}/month. \n ($${principal} over ${years} years at an ${interest}% APY.)`;
    }
}
