import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export const LoginPage = () => {
  const { login } = useContext(UserContext);
  const [userId, setUserId] = useState("");

  const navigation = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userId);
    const result = login(+userId);

    if (!result) {
      toast.error(`User not found ${userId}`);
      return;
    }

    navigation("/profile");
  };
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold">Iniciar Sesion</h1>
      <hr />

      <form className="flex flex-col gap-2 my-10" onSubmit={handleSubmit}>
        <Input
          type="number"
          placeholder="ID del usuario"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>

      <Link to="/about">
        <Button variant="ghost">Go to About</Button>
      </Link>
    </div>
  );
};
