import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { use, useContext } from "react";
import { useNavigate } from "react-router";

export const ProfilePage = () => {
  const { user: userInfo, logout } = useContext(UserContext);

  const navigation = useNavigate();
  const handleLogout = () => {
    logout();
    // navigation("/about");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Perfil del usuario</h1>
      <hr />
      <pre className="my-4  overflow-x-auto">
        {JSON.stringify(userInfo, null, 2)}
      </pre>
      <Button variant="destructive" onClick={handleLogout}>
        Salir
      </Button>
    </div>
  );
};
