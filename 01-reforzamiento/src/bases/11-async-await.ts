const API_KEY = "hzE40ypNyFI40mdAZZ8OfUhd7BvZNSyb";
import type { GiphyResponse } from "../data/giphy.response";

const myRequest = fetch(
  `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`,
);

const createImageInsideDOM = (url: string) => {
  const imgElement = document.createElement("img");
  imgElement.src = url;

  document.body.append(imgElement);
};

const getRandomGifUrl = async (): Promise<string> => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`,
  );
  const { data } = (await response.json()) as GiphyResponse;
  return data.images.original.url;
};

getRandomGifUrl().then(createImageInsideDOM);
