function greet(name: string) {
  return `hola ${name}`;
}

const greet2 = (name: string) => `hola ${name}`;

const message = greet("Goku");
const message2 = greet2("Vegeta");

console.log(message);
console.log(message2);

interface User {
  uid: string;
  username: string;
}

function getUser(): User {
  return {
    uid: "ABC-123",
    username: "El_Papi23",
  };
}

const getUser2 = () => ({
  uid: "ABC-123",
  username: "El_Papi23",
});

const user = getUser();
console.log(user);

const myNumbers = [1, 2, 3, 4, 5];

// myNumbers.forEach((item) => console.log(item));
myNumbers.forEach(console.log);
