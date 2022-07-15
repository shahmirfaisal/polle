import { prisma } from "../../lib/prisma";
import { getUser } from "../../lib/getUser";
import { DashboardLayout } from "../../components/DashboardLayout/";
import { Grid, Paper, Typography } from "@mui/material";
import { getUserLineGraph } from "../../utils/analytics";
import { PollItem } from "../../components/PollItem/";
import { Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const AnalyticsPage = ({ user, polls }) => {
  // console.log(getUserLineGraph(user, polls));

  return (
    <DashboardLayout user={user}>
      <Typography
        component="h1"
        variant="h3"
        sx={{ fontWeight: 700, mt: 3, mb: 5 }}
        align="center"
      >
        Analytics
      </Typography>

      <Paper
        component="section"
        sx={{
          p: 2,
          maxWidth: "900px",
          mx: "auto",
        }}
      >
        <Line data={getUserLineGraph(user, polls)} />
      </Paper>
    </DashboardLayout>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const user = await getUser(req, res);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  const polls = await prisma.poll.findMany({
    where: {
      userId: +user.id,
    },
    include: {
      answers: {
        include: {
          votes: true,
        },
      },
    },
  });

  return {
    props: {
      user,
      polls: JSON.parse(JSON.stringify(polls)),
    },
  };
};

export default AnalyticsPage;
