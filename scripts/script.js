"use strict"

// ************************** GLOBAL VARIABLES **********************
let inputPasswd = document.querySelector("#password");
let inputConfPasswd = document.querySelector("#confirm-password");
let formCreateAccount = document.querySelector("#register-form");
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
        //verifyMatchingPasswords();
        stylizePsswds(verifyMatchingPasswords());
    }    
});

// Prevents form submission if passwords don't match 
formCreateAccount.addEventListener("submit", function(event) {
    if (!verifyMatchingPasswords()) {        
        event.preventDefault();        
    }
});


// ************************ FUNCTION DECLARATIONS *******************
function verifyMatchingPasswords() {
    let password = inputPasswd.value;
    let confPassword = inputConfPasswd.value;
    let doPasswordsMatch = false;    

    // Verifies if passwords match
    if (password !== confPassword) {
        doPasswordsMatch = false;        

    } else {
        doPasswordsMatch = true;        
    }

    // Tells if passwords match or not
    return doPasswordsMatch;
}


// Stylizes the password alert legend and password inputs accordingly
function stylizePsswds(passwordsMatch) {
    let passwdLegend = document.querySelector(".psswds-legend");
    
    if(passwordsMatch) {
        inputPasswd.classList.remove("psswds-mismatch-input");
        inputConfPasswd.classList.remove("psswds-mismatch-input");
        inputPasswd.classList.add("psswds-match-input");
        inputConfPasswd.classList.add("psswds-match-input");        

        passwdLegend.classList.remove("psswds-mismatch-legend");
        passwdLegend.classList.add("psswds-match-legend");        
        passwdLegend.textContent = "Passwords match!";        

    } else {
        inputPasswd.classList.remove("psswds-match-input");
        inputConfPasswd.classList.remove("psswds-match-input");
        inputPasswd.classList.add("psswds-mismatch-input");
        inputConfPasswd.classList.add("psswds-mismatch-input");

        passwdLegend.classList.remove("psswds-match-legend");
        passwdLegend.classList.add("psswds-mismatch-legend");
        passwdLegend.textContent = "Passwords do NOT match!";
    }
}