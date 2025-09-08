import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { CustomSearch } from "./shared/components/CustomSearch";

export const GifsApp = () => {
  return (
    <>
      {/*Header*/}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y descarga el gif perfecto"
      />
      {/*search*/}
      <CustomSearch placeholder="Buscar lo que quieras" />

      {/*Busquedas previas*/}
      <PreviousSearches searches={["goku", "other", "pm"]} />

      <GifList Gifs={mockGifs} />
    </>
  );
};
