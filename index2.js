console.log("My Project");
showme();
// var audio = new Audio();
// audio.src = 'Kalimba.mp3';
// audio.play();
//TaKe notes tab

const time = document.getElementById("time");
let currentTime;
let noteTime;
let j = 0;
// let l = 0;
// let m = 0;

setInterval(`
currentTime = new Date();
        time.innerHTML = currentTime.getDate() + "/" + (currentTime.getMonth() + 1) + "/" + currentTime.getFullYear() + "  " + currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        `, 1000);

let submit = document.getElementById("submit");

submit.addEventListener("click", () => {
    // console.log("submit button");
    let noteTitle = document.getElementById("noteTitle");
    let noteBody = document.getElementById("noteBody");
    let mynote = localStorage.getItem("mynote");
    let rem = document.getElementById("rem");
    if (mynote == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(mynote);
    }
    takeTime();
    let myNoteObj = {
        head: noteTitle.value,
        body: noteBody.value,
        time: noteTime

    }
    let dateTime = document.getElementById("dateTime");
    myNoteObj["reminder"] = dateTime.value;
    notesObj.push(myNoteObj);
    localStorage.setItem("mynote", JSON.stringify(notesObj));
    // console.log(notesObj, mynote);
    noteTitle.value = "";
    noteBody.value = "";
    showme();

})

function takeTime() {
    currentTime = new Date();
    noteTime = currentTime.getDate() + "/" + (currentTime.getMonth() + 1) + "/" + currentTime.getFullYear() + "  " + currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
}

function showme() {
    let mynote = localStorage.getItem("mynote");
    let dismiss = document.getElementById("dismiss");
    if (mynote == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(mynote);
    }
    let html = "";
    notesObj.forEach((element, index) => {
        html += `
        <div class="col-sm-4 my-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${element.head} <span class="notedTime" style="font-size: 13px; float: right;">${element.time}</span></h5>
                    <p class="card-text">${element.body}</p>
                    <a href="#" id="${index}" onclick="deleteNote(this.id)" class="btn btn-secondary">Delete</a>
                </div>
            </div>
        </div>`;
    });
    notesObj.forEach((element) => {
        if (element.reminder != "") {
            let o = 0;
            function reminderAlarm() {
                setInterval(() => {
                    now = new Date();
                    remDate = new Date(element.reminder);
                    if (element.reminder > Date()) {
                        console.log(remDate - now);

                    }
                    else if (remDate - now <= 0 && remDate - now >= -2000) {
                        alert(`${element.body} Reminder`);
                    }
                    else if (o == 0) {
                        alert(`${element.body} passed`);
                        o++
                    }
                    else {
                    }
                }, 1000);
            }
            reminderAlarm();
        }
    });
    let noteElement = document.getElementById("note");
    noteElement.innerHTML = html;

    if (notesObj.length != 0) {
        dismiss.innerHTML = ` <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Your Notes are below!! </strong> You should check in on some of those fields below.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div> `;
    }
    else {
        noteElement.innerHTML = `No notes added! Add notes by clicking <strong> "Add Note" </strong> Button`
        dismiss.innerHTML = ` <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>No motes to show!! </strong> Add notes below
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div> `;
    }
}



function deleteNote(index) {
    let mynote = localStorage.getItem("mynote");
    let dismiss = document.getElementById("dismiss");
    if (mynote == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(mynote);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("mynote", JSON.stringify(notesObj));
    dismiss.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>You Deleted a Note!! </strong> You should check in on some of those fields below.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`
    showme();
}

let search = document.getElementById("search");

search.addEventListener("input", () => {
    let inputVal = search.value.toLowerCase();
    let notecard = document.getElementsByClassName("card-body");
    let dismiss = document.getElementById("dismiss");
    let k = 0;
    Array.from(notecard).forEach((element) => {
        let nBody = element.getElementsByTagName("p")[0].innerHTML;
        let nTitle = element.getElementsByTagName("h5")[0].innerHTML;
        if ((nBody.includes(inputVal)) || (nTitle.includes(inputVal))) {
            element.parentNode.style.display = "block";
            k++;
        }
        else {
            element.parentNode.style.display = "none";
        }
        if (k != 0) {
            dismiss.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Your matches are below!! </strong> Check your notes below
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div> `;
        }
        else {
            dismiss.innerHTML = ` <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>No notes matched your request</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div> `;
        }
    });
});

// Sort
function sortTime() {
    let clonedElements = new Array;
    let elements = new Array;
    let numberOfNotes = document.getElementsByClassName("col-sm-4").length;
    let dismiss = document.getElementById("dismiss");
    // console.log(numberOfNotes);
    for (let i = 0; i < numberOfNotes; i++) {
        clonedElements[i] = document.getElementsByClassName("col-sm-4")[i].outerHTML;
        elements[i] = document.getElementsByClassName("col-sm-4")[i].outerHTML;
    }
    if (j % 2 != 0) {
        for (let i = 0; i < numberOfNotes; i++) {
            document.getElementsByClassName("col-sm-4")[i].outerHTML = clonedElements[numberOfNotes - i - 1];
        }
        dismiss.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Notes Sorted</strong> You should check in on some of those fields below.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    }
    else {
        console.log("Already In That Format");
        dismiss.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Notes already in that order</strong> Check your selected options. <strong>Please Reload!!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    }
    j++;

}


function revSortTime() {
    let clonedElements = new Array;
    let elements = new Array;
    let numberOfNotes = document.getElementsByClassName("col-sm-4").length;
    let dismiss = document.getElementById("dismiss");
    // console.log(numberOfNotes);
    for (let i = 0; i < numberOfNotes; i++) {
        clonedElements[i] = document.getElementsByClassName("col-sm-4")[i].outerHTML;
        elements[i] = document.getElementsByClassName("col-sm-4")[i].outerHTML;
    }
    if (j % 2 == 0) {
        for (let i = 0; i < numberOfNotes; i++) {
            document.getElementsByClassName("col-sm-4")[i].outerHTML = clonedElements[numberOfNotes - i - 1];
        }
        dismiss.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Notes Sorted</strong> You should check in on some of those fields below.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    }
    else {
        console.log("Already In That Format");
        dismiss.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Notes already in that order</strong> Check your selected options <strong>Please Reload!!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    }
    j++;
}

let calc = document.getElementById("calc");
let calculator = document.getElementById("calculator");
calculator.style.display = "none";

calc.addEventListener("click", () => {
    if (calculator.style.display == "none") {
        calculator.style.display = "block";
    }
    else {
        calculator.style.display = "none";
    }
})

// calculate

let calculatorInput = document.getElementById("calculatorInput");

td = document.getElementsByTagName("td");

calculatorvalue = "";


for (item of td) {
    item.addEventListener("click", (e) => {
        inputText = e.target.innerHTML;
        console.log("input Text", inputText);
        if (inputText == '=') {
            calculatorInput.value = eval(calculatorvalue);
        }
        else if (inputText == 'X') {
            calculatorvalue += '*';
            calculatorInput.value = calculatorvalue;
        }
        else if (inputText == 'AC') {
            calculatorvalue = " ";
            calculatorInput.value = calculatorvalue;
        }
        else if (inputText == 'Del') {
            calculatorvalue = calculatorvalue.substring(0, calculatorvalue.length - 1);
            calculatorInput.value = calculatorvalue;
        }
        else {
            calculatorvalue += inputText;
            calculatorInput.value = calculatorvalue;
        }
    })
}

let home = document.getElementById("home");
home.addEventListener("click", () => {
    if (calculator.style.display = "block") {
        calculator.style.display = "none";
    }
    if (rem.style.display == "block") {
        rem.style.display = "none";
    }

})

let myNotesApp = document.getElementById("myNotesApp");
myNotesApp.addEventListener("click", () => {
    if (calculator.style.display = "block") {
        calculator.style.display = "none";
    }
    if (rem.style.display == "block") {
        rem.style.display = "none";
    }

})

let reminder = document.getElementById("reminder");
let rem = document.getElementById("rem");
rem.style.display = "none";

reminder.addEventListener("click", () => {
    if (rem.style.display == "none") {
        rem.style.display = "block";
    }
    else {
        rem.style.display = "none";
    }
})

let dateTime = document.getElementById("dateTime");
dateTime.addEventListener("input", () => {
    let regex = /^([A-Za-z]{3})\s([A-Za-z]{3})\s([0-9]{1,2})\s([0-9]{4})\s([0-9]{1,2}):([0-9]{1,2})$/;
    let str = dateTime.value;

    if (regex.test(str)) {
        dateTime.classList.add('is-valid');
        dateTime.classList.remove('is-invalid');
        validPhone = true;
    }
    else {
        dateTime.classList.remove('is-valid');
        dateTime.classList.add('is-invalid');
        validPhone = false;
    }

})

let noteTitle = document.getElementById("noteTitle");
noteTitle.addEventListener("input", () => {
    let regex = /^\S/;
    let str = noteTitle.value;

    if (regex.test(str)) {
        noteTitle.classList.add('is-valid');
        noteTitle.classList.remove('is-invalid');
        validPhone = true;
    }
    else {
        noteTitle.classList.remove('is-valid');
        noteTitle.classList.add('is-invalid');
        validPhone = false;
    }

})

let noteBody = document.getElementById("noteBody");
noteBody.addEventListener("input", () => {
    let regex = /^\S/;
    let str = noteBody.value;

    if (regex.test(str)) {
        noteBody.classList.add('is-valid');
        noteBody.classList.remove('is-invalid');
        validPhone = true;
    }
    else {
        noteBody.classList.remove('is-valid');
        noteBody.classList.add('is-invalid');
        validPhone = false;
    }

})

let colorpicker = document.getElementById("colorpicker");
colorpicker.addEventListener("input",()=> {
    console.log(colorpicker.value);
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = `${colorpicker.value}`;
})