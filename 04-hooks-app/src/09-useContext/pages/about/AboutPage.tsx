import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { Link } from "react-router";

export const AboutPage = () => {
  const { isAuthenticated, logout } = use(UserContext);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-thin">Page about me</h1>
      <hr />
      <div className="flex flex-col gap-2 items-center justify-center my-4">
        {isAuthenticated && (
          <Link to="/profile" className="hover:text-blue-500">
            Perfil
          </Link>
        )}
        {isAuthenticated ? (
          <Button variant="destructive" className="mt-4" onClick={logout}>
            Salir
          </Button>
        ) : (
          <Link to="/login">iniciar login</Link>
        )}
      </div>
    </div>
  );
};
