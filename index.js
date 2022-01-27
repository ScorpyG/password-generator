// DOM variables
let slider = document.getElementById('pw-size');
let output = document.getElementById('input-length-value');
let generateButton = document.getElementById('generate-btn');
let uniqueCharsCheckbox = document.getElementById('special-char-cbox');
let pwTxtbox = document.getElementById('display-pw');
let copyIcon = document.getElementById('copy');

let reqPwSize = document.getElementById('accept-size');
let reqPwNum = document.getElementById('accept-num');
let reqPwChars = document.getElementById('accept-letters');
let reqPwCapChars = document.getElementById('accept-capital-letters');
let reqPwUnique = document.getElementById('accept-unique-chars');

// Global letiables
let passwordLength = slider.value;
let charactersList = '0123456789qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKLOP';
let specialCharsList = '~!@#$%^&*?';

// Display slider (password-size) value on-load
output.innerHTML = slider.value;

// Display lider (password-size) value change
slider.oninput = function() {
    output.innerHTML = this.value;
    passwordLength = this.value;
}

// Function to generate the password
const passwordGenerate = (passwordSize) => { 
    let charactersListLength = charactersList.length;
    let generatedPassword = '';

    // Checking if user wants special characters in their password
    if (uniqueCharsCheckbox.checked) {
        charactersList += specialCharsList;
        charactersListLength = charactersList.length;
    }

    // Create an string that match (conditions and size) of user's interests
    for(let index = 0; index < passwordSize; index++) {
        generatedPassword += charactersList.charAt(Math.floor(Math.random() * charactersListLength));
    }

    return generatedPassword;
};

// Function to assign generated password to DOM input textbox
const displayGeneratedPassword = () => {
    pwTxtbox.value = passwordGenerate(passwordLength);
}

const copyToClipboard = () => { 
    if (pwTxtbox.value == '') {
        alert("Dude, there is nothing to copy!");
    }
    else {
        pwTxtbox.select(); /* Select the text field */
        pwTxtbox.setSelectionRange(0, 99999); /* For mobile devices */
        
        navigator.clipboard.writeText(pwTxtbox.value); // Copy value of textfield
    
        pwTxtbox.value = null;
        pwTxtbox.placeholder = 'Copy to clipboard!';
    }
};

// Password integrity checker
const pwChecker = () => {
    let currentPassword = pwTxtbox.value;
    console.log(currentPassword);

    // Check the current password length meet the minimum requirement
    if (currentPassword.length >= 20) {
        reqPwSize.classList.add('good-pw');
        reqPwSize.classList.remove('bad-pw');
    }
    else {
        reqPwSize.classList.add('bad-pw');
        reqPwSize.classList.remove('good-pw');
    }

}

// console.log('hello world'.includes('e'));

// Events listeners 
pwTxtbox.addEventListener('change', pwChecker);
pwTxtbox.addEventListener('keyup', pwChecker)
generateButton.addEventListener('click', displayGeneratedPassword);
copyIcon.addEventListener('click', copyToClipboard);