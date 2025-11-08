import { useParams } from "react-router";
import SuperheroProfile from "./HeroProfile";

export const HeroPages = () => {
  const { idSlug } = useParams();

  console.log("idSlug: ", idSlug);
  return <div>{idSlug && <SuperheroProfile heroSlugId={idSlug} />}</div>;
};
