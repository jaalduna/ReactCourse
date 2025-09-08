const firstName = "Joaquin";
const lastName = "Herrera";

let diceNumber = 5;

// do not use var only let and const. Var is legacy
console.log(firstName, lastName);

const containsLetterI = firstName.includes("i");

console.log({ containsLetterI, diceNumber });
