import type { Gif } from "../../mock-data/gifs.mock";

interface Props {
  Gifs: Gif[];
}

export const GifList = ({ Gifs }: Props) => {
  return (
    <div className="gifs-container">
      {Gifs.map((gif) => (
        <div key={gif.id} className="gif-card">
          <img src={gif.url} alt={gif.title} />
          <p>
            {gif.width}x{gif.height} (1.5mb)
          </p>
        </div>
      ))}
    </div>
  );
};
