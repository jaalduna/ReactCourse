const characterNames = ["Goku", "Vegeta", "Trunks"];

const [, , p2] = characterNames;

console.log(p2);

//as const resect the types on the position of each component
const returnArrayFn = () => ["ABC", 123] as const;

const [letters, number] = returnArrayFn();

console.log({ letters, number });

const useState = () => ["abc", (s: string) => console.log(s)] as const;

const [name, setName] = useState();

console.log(name);
setName("hola mundo");
