interface Person {
  firstName: string;
  lastName: string;
  age: number;
  address?: Address; 
}


interface Address {
    postalCode: string;
    city: string;
  };

}
const ironman: Person = {
  firstName: "Tony",
  lastName: "Stark",
  age: 45,
  address: {
    postalCode: "abc123",
    city: "new York",
  },
};

const spiderman: Person = {
  firstName: "",
  lastName: "",
  age: 0,
};

//point to the same memory position
// const spiderman = ironman;

//point to the same memory position.
// const spiderman = { ...ironman };

//point to the same memory position.
console.log(ironman, spiderman);
