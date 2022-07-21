import { Header } from "../Header/";
import { Footer } from "../Footer/";
import { Navbar } from "../Navbar/";
import { Hidden } from "@mui/material";

export const HomeLayout = ({ children, user }) => {
  return (
    <>
      <Hidden smDown>
        <Header user={user} />
      </Hidden>

      <Hidden smUp>
        <Navbar user={user} />
      </Hidden>

      {children}

      <Footer />
    </>
  );
};
