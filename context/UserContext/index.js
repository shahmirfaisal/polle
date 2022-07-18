import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const router = useRouter();

  const logoutHandler = () => {
    deleteCookie("token");
    router.push("/login");
  };
  return (
    <UserContext.Provider value={{ logoutHandler }}>
      {children}
    </UserContext.Provider>
  );
};
