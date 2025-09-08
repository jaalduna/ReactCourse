const myArray: number[] = [1, 4, 5, 6];

myArray.push(10);

console.log(myArray);

for (const myNumber of myArray) {
  console.log(myNumber + 10);
}

const myArray2 = [...myArray];
myArray2.unshift(7);
console.log({ myArray, myArray2 });
