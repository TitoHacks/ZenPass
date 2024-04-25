//Injectar los links del head
let fontawesomeLink = document.createElement("link");
fontawesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
fontawesomeLink.rel = "stylesheet"
document.head.appendChild(fontawesomeLink);
//////////////////////////////

if(document.getElementById('username') != null && document.getElementById('password') != null){

    let boton = document.createElement("button")
    boton.textContent = "<i class='fa-solid fa-rotate'></i>"
    boton.onclick = autofillEventHandler;
    document.getElementById('password').parentNode.append(boton)
}

function autofillEventHandler(){

    let passwordInput = document.getElementById('password');
    passwordInput.value = generatePassword(15,true,true,true)
}

function generatePassword(length, includeUppercase, includeNumbers, includeSymbols) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:\'",.<>?';

    let possibleChars = lowercaseChars;

    if (includeUppercase) {
        possibleChars += uppercaseChars;
    }
    if (includeNumbers) {
        possibleChars += numberChars;
    }
    if (includeSymbols) {
        possibleChars += symbolChars;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * possibleChars.length);
        password += possibleChars[randomIndex];
    }

    return password;
}