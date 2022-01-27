// DOM variables
let slider = document.getElementById("pw-size");
let output = document.getElementById("input-length-value");
let generateButton = document.getElementById("generate-btn");
let uniqueCharsCheckbox = document.getElementById("special-char-cbox");
let pwTxtbox = document.getElementById("display-pw");
let copyIcon = document.getElementById("copy");

let reqPwSize = document.getElementById("accept-size");
let reqPwNum = document.getElementById("accept-num");
let reqPwChars = document.getElementById("accept-letters");
let reqPwCapChars = document.getElementById("accept-capital-letters");
let reqPwUnique = document.getElementById("accept-unique-chars");

// Global variables
let passwordLength = slider.value;
let charactersList = "0123456789qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKLOP";
let specialCharsList = "~!@#$%^&*?";

// Display slider (password-size) value on-load
output.innerHTML = slider.value;

// Display lider (password-size) value change
slider.oninput = function () {
  output.innerHTML = this.value;
  passwordLength = this.value;
};

// Function to generate the password
const passwordGenerate = (passwordSize) => {
  let generatedPassword = "";

  // Checking if user wants special characters in their password
  if (uniqueCharsCheckbox.checked) {
    charactersList += specialCharsList;
  } else {
    charactersList = "0123456789qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKLOP";
  }

  // Create an string that match (conditions and size) of user's interests
  for (let index = 0; index < passwordSize; index++) {
    generatedPassword += charactersList.charAt(
      Math.floor(Math.random() * charactersList.length)
    );
  }

  return generatedPassword;
};

// Function to assign generated password to DOM input textbox
const displayGeneratedPassword = () => {
  pwTxtbox.value = passwordGenerate(passwordLength);
};

const copyToClipboard = () => {
  if (pwTxtbox.value == "") {
    alert("Dude, there is nothing to copy!");
  } else {
    pwTxtbox.select(); /* Select the text field */
    pwTxtbox.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(pwTxtbox.value); // Copy value of textfield

    pwTxtbox.value = null;
    pwTxtbox.placeholder = "Copy to clipboard!";
  }
};

// Password integrity checker
const pwChecker = () => {
  // Regex for user' inputs validation
  let charsList = /([a-z])/;
  let capCharsList = /([A-Z])/;
  let numsList = /([0-9])/;
  let uniqueCharsList = /([~!@#$%^&*?])/;

  let currentPassword = pwTxtbox.value;

  // Validation for min password length
  if (currentPassword.length >= 20) {
    reqPwSize.classList.add("good-pw");
    reqPwSize.classList.remove("bad-pw");
  } else {
    reqPwSize.classList.add("bad-pw");
    reqPwSize.classList.remove("good-pw");
  }

  // Validation for normal case
  if (currentPassword.match(charsList)) {
    reqPwChars.classList.add("good-pw");
    reqPwChars.classList.remove("bad-pw");
  } else {
    reqPwChars.classList.add("bad-pw");
    reqPwChars.classList.remove("good-pw");
  }

  // Validation for capital case
  if (currentPassword.match(capCharsList)) {
    reqPwCapChars.classList.add("good-pw");
    reqPwCapChars.classList.remove("bad-pw");
  } else {
    reqPwCapChars.classList.add("bad-pw");
    reqPwCapChars.classList.remove("good-pw");
  }

  // Validation for number
  if (currentPassword.match(numsList)) {
    reqPwNum.classList.add("good-pw");
    reqPwNum.classList.remove("bad-pw");
  } else {
    reqPwNum.classList.add("bad-pw");
    reqPwNum.classList.remove("good-pw");
  }

  // Validation for special chars
  if (currentPassword.match(uniqueCharsList)) {
    reqPwUnique.classList.add("good-pw");
    reqPwUnique.classList.remove("bad-pw");
  } else {
    reqPwUnique.classList.add("bad-pw");
    reqPwUnique.classList.remove("good-pw");
  }
};

// Events listeners
pwTxtbox.addEventListener("input", pwChecker);
generateButton.addEventListener("click", () => {
  displayGeneratedPassword();
  pwChecker();
});
copyIcon.addEventListener("click", copyToClipboard);
