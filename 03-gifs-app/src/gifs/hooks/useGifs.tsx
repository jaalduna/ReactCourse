import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [currentGifs, setCurrentGifs] = useState<Gif[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});
  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setCurrentGifs(gifsCache.current[term]);
      return;
    }
    const gifs = await getGifsByQuery(term);
    setCurrentGifs(gifs);
    gifsCache.current[term] = gifs;
  };

  const handleSearch = async (query: string) => {
    query = query.trim().toLowerCase();
    if (query === "") {
      return;
    }

    if (previousTerms.includes(query)) {
      return;
    }

    // previousTerms.unshift(query);
    // if (previousTerms.length >= 9) {
    //   previousTerms.pop();
    // }
    //
    setPreviousTerms((prev) => {
      const newTerms = [query, ...prev.filter((term) => term !== query)];
      return newTerms.slice(0, 8);
    });

    const gifs = await getGifsByQuery(query);
    setCurrentGifs(gifs);

    gifsCache.current[query] = gifs;
  };

  return {
    currentGifs,
    previousTerms,

    handleSearch,
    handleTermClicked,
  };
};
