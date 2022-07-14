import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import classes from "./style.module.scss";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { removeCookies } from "cookies-next";

export const DashboardLayout = ({ children, user }) => {
  const router = useRouter();

  const logoutHandler = () => {
    removeCookies("token");
    router.push("/login");
  };

  return (
    <Grid container>
      <Grid item sx={{ width: "250px" }}>
        <Paper sx={{ minHeight: "100vh", px: 2, position: "sticky", top: 0 }}>
          <Typography
            component="h3"
            variant="h6"
            sx={{ fontWeight: 500, pt: 3 }}
          >
            Welcome {user.name}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <nav className={classes.nav}>
            <Link href="/dashboard">
              <a
                title="dashboard"
                className={
                  router.pathname === "/dashboard" ? classes.activeLink : null
                }
              >
                <DashboardIcon />
                Dashboard
              </a>
            </Link>

            <Link href="/dashboard/create-poll">
              <a
                title="Create a Poll"
                className={
                  router.pathname === "/dashboard/create-poll"
                    ? classes.activeLink
                    : null
                }
              >
                <AddBoxIcon />
                New Poll
              </a>
            </Link>

            <Button onClick={logoutHandler}>
              <LogoutIcon /> Logout
            </Button>
          </nav>
        </Paper>
      </Grid>

      <Grid item xs>
        <Container>{children}</Container>
      </Grid>
    </Grid>
  );
};
