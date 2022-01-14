// DOM variables
var slider = document.getElementById('pw-size');
var output = document.getElementById('input-length-value');
var generateButton = document.getElementById('generate-btn');
var uniqueCharsCheckbox = document.getElementById('special-char-cbox');
var pwTxtbox = document.getElementById('display-pw');
var copyIcon = document.getElementById('copy');

// Global variables
let passwordLength = slider.value;

// Display slider (password-size) value on-load
output.innerHTML = slider.value;

// Display lider (password-size) value change
slider.oninput = function() {
    output.innerHTML = this.value;
    passwordLength = this.value;
}

// Function to generate the password
const passwordGenerate = (passwordSize) => { 
    var charactersList = '0123456789qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKLOP';
    var specialCharsList = '~!@#$%^&*?';
    var charactersListLength = charactersList.length;
    var generatedPassword = '';

    // Checking if user wants special characters in their password
    if (uniqueCharsCheckbox.checked) {
        charactersList += specialCharsList;
        charactersListLength = charactersList.length;
    }

    // Create an string that match (conditions and size) of user's interests
    for(var index = 0; index < passwordSize; index++) {
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

}

// Events listeners 
generateButton.addEventListener('click', displayGeneratedPassword);
copyIcon.addEventListener('click', copyToClipboard);