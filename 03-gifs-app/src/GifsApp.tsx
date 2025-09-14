import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { CustomSearch } from "./shared/components/CustomSearch";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const { handleSearch, previousTerms, handleTermClicked, currentGifs } =
    useGifs();
  return (
    <>
      {/*Header*/}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y descarga el gif perfecto"
      />
      {/*search*/}
      <CustomSearch
        placeholder="Buscar lo que quieras"
        onQuery={handleSearch}
      />

      {/*Busquedas previas*/}
      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      <GifList Gifs={currentGifs} />
    </>
  );
};
