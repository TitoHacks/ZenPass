console.log(typeof alert); // "function"
console.log("injected file");
delete window.alert;
console.log(typeof alert); // "undefined"