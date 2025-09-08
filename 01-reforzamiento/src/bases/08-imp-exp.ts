import { heroes, type Hero, Owner } from "../data/heroes.data";

const getHeroById = (id: number): Hero | undefined =>
  heroes.find((item) => {
    return item.id === id;
  });

console.log(getHeroById(1));

export const getHerosByOwner = (id: Owner): Hero[] =>
  heroes.filter((item) => item.owner === id);
