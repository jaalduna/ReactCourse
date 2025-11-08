import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadscrums } from "@/components/custom/CustomBreadscrums";
import { useQuery } from "@tanstack/react-query";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { searchHerosAction } from "@/heroes/actions/search-heros.action";
import { useSearchParams } from "react-router";

export const SearchPage = () => {
  //TODO: useQuery to get the search params and fetch the heroes

  const [searchParam] = useSearchParams();

  const name = searchParam.get("name") ?? undefined;
  const strength = searchParam.get("strength") ?? undefined;
  const { data: heros = [] } = useQuery({
    queryKey: ["search", { name, strength }],
    queryFn: () => searchHerosAction({ name, strength }),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <>
      <CustomJumbotron title="Search" description="Search your superhereo" />
      <CustomBreadscrums />
      <HeroStats />

      {/* Controls */}
      <SearchControls />

      {/* Search Results */}
      <HeroGrid heroes={heros} />
    </>
  );
};

export default SearchPage;
