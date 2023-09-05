"use strict"

// ************************** GLOBAL VARIABLES **********************
let formCreateAccount = document.querySelector("#register-form");
let inputPasswd = document.querySelector("#password");
let inputConfPasswd = document.querySelector("#confirm-password");
let startVerification = false; //Start verfication or not yet?


// ***************************** UI CONTROLS ***********************
// Ready to verify passwords just until the user focuses on this box
inputConfPasswd.addEventListener("focus", function() {
    startVerification = true;    
});

// Starts verification and styling when user types
inputConfPasswd.addEventListener("input", function() {
    if (startVerification) {        
        stylizePsswds(verifyMatchingPasswords());
    }    
});

// Starts verification and styling when user types
inputPasswd.addEventListener("input", function() {
    if (startVerification) {        
        stylizePsswds(verifyMatchingPasswords());
    }    
});

// If passwords don't match, prevents form submission and shake passwords controls
formCreateAccount.addEventListener("submit", function(event) {
    if (!verifyMatchingPasswords()) {        
        event.preventDefault();        

        inputPasswd.classList.remove("shake-controls");
        inputConfPasswd.classList.remove("shake-controls");

        // Used to restart animations
        inputPasswd.offsetWidth;
        inputConfPasswd.offsetWidth;

        inputPasswd.classList.add("shake-controls");
        inputConfPasswd.classList.add("shake-controls");
    }
});


// ************************ FUNCTION DECLARATIONS *******************
function verifyMatchingPasswords() {
    let password = inputPasswd.value;
    let confPassword = inputConfPasswd.value;
    let doPasswordsMatch = false;    

    // Verifies if passwords match
    if (password.trim() !== confPassword.trim()) {
        doPasswordsMatch = false;        

    } else {
        doPasswordsMatch = true;        
    }

    // Tells if passwords match or not
    return doPasswordsMatch;    
}


// Applies styles to the password alert legend and password inputs accordingly.
function stylizePsswds(passwordsMatch) {
    let passwdLegend = document.querySelector(".psswds-legend");
    
    if(passwordsMatch) {
        
        // If both passwords match but are empty, resets the input and input legend styles.
        if (inputPasswd.value.trim() === "" && inputConfPasswd.value.trim() === "") {
            inputPasswd.classList.remove("psswds-mismatch-input");
            inputConfPasswd.classList.remove("psswds-mismatch-input");
            passwdLegend.classList.remove("psswds-mismatch-legend");
            passwdLegend.textContent = "";
            startVerification = false;
            return;
        }
        
        // If both passwords match and aren't empty, resets the input and input legend styles.
        // Also applies the passwords match legend and styles.
        inputPasswd.classList.remove("psswds-mismatch-input");
        inputConfPasswd.classList.remove("psswds-mismatch-input");
        inputPasswd.classList.add("psswds-match-input");
        inputConfPasswd.classList.add("psswds-match-input");        

        passwdLegend.classList.remove("psswds-mismatch-legend");
        passwdLegend.classList.add("psswds-match-legend");        
        passwdLegend.textContent = "Passwords match!";

    } else {
        // If both passwords don't match, resets the input and input legend styles.
        // Also applies the passwords don't match legend and styles.
        inputPasswd.classList.remove("psswds-match-input");
        inputConfPasswd.classList.remove("psswds-match-input");
        inputPasswd.classList.add("psswds-mismatch-input");
        inputConfPasswd.classList.add("psswds-mismatch-input");

        passwdLegend.classList.remove("psswds-match-legend");
        passwdLegend.classList.add("psswds-mismatch-legend");
        passwdLegend.textContent = "Passwords do NOT match!";
    }
}