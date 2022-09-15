function getRandom() {
  const arrayNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let arrayRandom = [];
  let randomN;
  for (i = 0; i < 4; ++i) {
    randomN = parseInt(Math.random() * arrayNumber.length);
    arrayRandom.push(arrayNumber[randomN]);
    arrayNumber.splice(randomN, 1);
    if (i == 0) arrayNumber.unshift(0);
  }
  return arrayRandom;
}

let answerRand = getRandom();
// console.log(getRandom());

function checkMasterMind(orginalArray, guessArray) {
  let checkExist = 0;
  let checkCurrect = 0;
  for (i in guessArray) {
    if (orginalArray.indexOf(guessArray[i]) !== -1) ++checkExist;
    if (orginalArray.indexOf(guessArray[i]) == i) ++checkCurrect;
  }
  return [checkExist, checkCurrect];
}

// console.log(checkMasterMind([2, 1, 5, 6], [2, 1, 5, 6]));
//
//
//
//

const buttonsNumber = document.getElementsByClassName("numberClass");
const inputBoxElement = document.getElementsByClassName("inputbox");
const container = document.querySelector(".fromClass");
const resultBox = document.querySelector(".resultform");
const keyboardBox = document.querySelector(".numberKeyboards");
const submitButton = document.querySelector('button[name = "submit"]');
let enableOnclick = true;
keyboardBox.onclick = function (event) {
  if (enableOnclick) {
    // console.log(event.target.name);
    // console.log(event.target.textContent);
    if (event.target.name == "numberButton") {
      if (document.getElementById("selected")) {
        document.getElementById("selected").value = event.target.textContent;
        selectNext();
      }
    } else if (event.target.name == "left") selectPrevous();
    else if (event.target.name == "right") selectNext();
    else if (event.target.name == "submit") submitFunc();
  }
};

function selectNext() {
  let nextSelect;
  if (document.getElementById("selected").nextElementSibling) {
    nextSelect = document.getElementById("selected").nextElementSibling;
  } else {
    nextSelect =
      document.getElementById("selected").previousElementSibling
        .previousElementSibling.previousElementSibling;
  }
  document.getElementById("selected").id = "";
  nextSelect.id = "selected";
  checkFocusBackground();
}

function selectPrevous() {
  let nextSelect;
  if (document.getElementById("selected").previousElementSibling) {
    nextSelect = document.getElementById("selected").previousElementSibling;
  } else {
    nextSelect =
      document.getElementById("selected").nextElementSibling.nextElementSibling
        .nextElementSibling;
  }
  document.getElementById("selected").id = "";
  nextSelect.id = "selected";
  checkFocusBackground();
}

function atuoSelect() {
  if (document.getElementById("selected")) {
    document.getElementById("selected").id = "";
  }
  document.getElementsByName(`row${countName}`)[0].id = "selected";
  checkFocusBackground();
}

function checkFocusBackground() {
  for (const element of inputBoxElement) {
    // console.log(element);
    element.style.backgroundColor = element.id == "selected" ? "#eee" : "#222";
    element.style.color = element.id == "selected" ? "#222" : "#eee";
  }
}

container.onclick = function (event) {
  if (enableOnclick) {
    // console.log(event.target.name == `row${countName}`);
    if (event.target.name == `row${countName}`) {
      if (document.getElementById("selected")) {
        document.getElementById("selected").id = "";
      }
      event.target.id = "selected";
    }
    checkFocusBackground();
  }
};

let countName = 0;

function AddNewRow() {
  ++countName;
  const newDivForm = document.createElement("div");
  for (i = 0; i < 4; i++) {
    const input = document.createElement("input");
    input.className = "inputbox";
    input.type = "text";
    input.maxLength = "1";
    input.name = `row${countName}`;
    newDivForm.appendChild(input);
    container.appendChild(newDivForm);
    input.setAttribute(
      "oninput",
      "this.value=this.value.replace(/[^0-9]/g,'');"
    );
  }
  const newDivresult = document.createElement("div");
  for (i = 0; i < 2; i++) {
    const inputResult = document.createElement("input");
    inputResult.disabled = true;
    inputResult.className = "result";
    inputResult.name = `rowResult${countName}`;
    inputResult.type = "text";
    inputResult.maxLength = "1";
    newDivresult.appendChild(inputResult);
    resultBox.appendChild(newDivresult);
    inputResult.setAttribute(
      "oninput",
      "this.value=this.value.replace(/[^0-9]/g,'');"
    );
  }
  atuoSelect();
}

function submitFunc() {
  const rowsElement = document.getElementsByName(`row${countName}`);
  const rowArrayValue = [...document.getElementsByName(`row${countName}`)].map(
    (ele) => +ele.value
  );
  const duplicateValue = rowArrayValue.findIndex(
    (value, index, arr) => arr.slice(0, index).indexOf(value) !== -1
  );
  let emptyBox;
  for (ele of rowsElement) {
    if (ele.value == "") {
      emptyBox = ele;
      break;
    }
  }

  if (duplicateValue !== -1) {
    if (document.getElementById("selected")) {
      document.getElementById("selected").id = "";
    }
    rowsElement[duplicateValue].id = "selected";
    checkFocusBackground();
  } else if (emptyBox) {
    if (document.getElementById("selected")) {
      document.getElementById("selected").id = "";
    }
    emptyBox.id = "selected";
    checkFocusBackground();
  } else {
    const checkAnswer = checkMasterMind(answerRand, rowArrayValue);
    const rowArrayResult = document.getElementsByName(`rowResult${countName}`);
    // console.log(rowArrayResult[0]);
    [rowArrayResult[0].value, rowArrayResult[1].value] = [...checkAnswer];
    if ((checkAnswer[0] === 4 && checkAnswer[1] === 4) || countName > 10) {
      // console.log("you win!");
      enableOnclick = false;
      const newDiv = document.createElement("div");
      const textWin = document.createElement("h3");
      textWin.textContent = `You WIN!!`;
      newDiv.appendChild(textWin);
      container.appendChild(newDiv);
      if (document.getElementById("selected")) {
        document.getElementById("selected").id = "";
      }
      checkFocusBackground();
    } else {
      AddNewRow();
    }
  }
}

function restartFunc() {
  if (confirm("Are yoy want restart the game?")) {
    enableOnclick = true;
    answerRand = getRandom();
    container.innerHTML = "";
    resultBox.innerHTML = "";
    AddNewRow();
  }
}

AddNewRow();
