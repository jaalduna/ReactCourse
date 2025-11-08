import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { users, type User } from "../data/user-mock.data";

// interface UserContextProps {
//   children: React.ReactNode;
// }
type AuthStatus = "checking" | "authenticated" | "non authenticated";
interface UserContextProps {
  //state
  authStatus: AuthStatus;
  user: User | null;
  isAuthenticated: boolean;

  //
  //
  //methods
  login: (userId: number) => boolean;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps,
);

//allow to provide a state
//HIGHER ORER COMPONENT (HOC)
export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      console.log(`User not found ${userId}`);
      setUser(null);
      setAuthStatus("non authenticated");
      return false;
    }
    console.log({ userId });
    setUser(user);
    setAuthStatus("authenticated");
    localStorage.setItem("userId", userId.toString());
    return true;
  };

  const handleLogout = () => {
    console.log("logout");
    setUser(null);
    setAuthStatus("non authenticated");
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      handleLogin(+storedUserId);
      return;
    } else {
      handleLogout();
    }

    return () => {
      return;
    };
  }, []);

  return (
    <UserContext
      value={{
        authStatus: authStatus,
        user: user,
        isAuthenticated: authStatus === "authenticated",
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext>
  );
};
