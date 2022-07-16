import { Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import BarChartIcon from "@mui/icons-material/BarChart";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import classes from "./style.module.scss";

export const BottomNav = () => {
  const router = useRouter();

  return (
    <Paper className={classes.nav} sx={{ p: 1 }}>
      <Link href="/dashboard">
        <a
          title="dashboard"
          className={
            router.pathname === "/dashboard" ? classes.activeLink : null
          }
        >
          <DashboardIcon />
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
        </a>
      </Link>

      <Link href="/dashboard/polls">
        <a
          title="Manage Polls"
          className={
            router.pathname === "/dashboard/polls" ? classes.activeLink : null
          }
        >
          <HowToVoteIcon />
        </a>
      </Link>

      <Link href="/dashboard/analytics">
        <a
          title="View Analytics"
          className={
            router.pathname.includes("/dashboard/analytics")
              ? classes.activeLink
              : null
          }
        >
          <BarChartIcon />
        </a>
      </Link>
    </Paper>
  );
};
