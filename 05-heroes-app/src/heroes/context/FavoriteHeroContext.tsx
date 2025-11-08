import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
  favorites: Hero[];
  favoriteCount: number;

  //Methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorites: (hero: Hero) => void;
}

export const FavoriteHeroContext = createContext<FavoriteHeroContext>(
  {} as FavoriteHeroContext,
);

const getFavoritesFromLocalStorage = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage(),
  );

  const toggleFavorites = (hero: Hero) => {
    const heroExist = favorites.find((h: Hero) => h.id === hero.id);

    if (heroExist) {
      const newFavorites = favorites.filter((h: Hero) => h.id !== hero.id);
      setFavorites(newFavorites);
      return;
    }

    setFavorites([...favorites, hero]);
  };

  const isFavorite = (hero: Hero) => {
    const heroExist = favorites.find((h: Hero) => h.id === hero.id);
    return heroExist ? true : false;
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  return (
    <FavoriteHeroContext
      value={{
        favorites: favorites,
        favoriteCount: favorites.length,
        isFavorite,
        toggleFavorites,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
