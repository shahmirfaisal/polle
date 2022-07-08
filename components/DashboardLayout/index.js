import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import classes from "./style.module.scss";

export const DashboardLayout = ({ children, user }) => {
  return (
    <Grid container>
      <Grid item sx={{ width: "250px" }}>
        <Paper sx={{ minHeight: "100vh", px: 2 }}>
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
              <a title="dashboard">Dashboard</a>
            </Link>
            <Link href="/dashboard/create-poll">
              <a title="Create a Poll">New Poll</a>
            </Link>
          </nav>
        </Paper>
      </Grid>

      <Grid item xs>
        <Container>{children}</Container>
      </Grid>
    </Grid>
  );
};
