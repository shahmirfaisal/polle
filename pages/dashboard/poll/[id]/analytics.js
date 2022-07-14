import { DashboardLayout } from "../../../../components/DashboardLayout/";
import { getUser } from "../../../../lib/getUser";
import { Doughnut, Line } from "react-chartjs-2";
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
import { prisma } from "../../../../lib/prisma";
import moment from "moment";
import { useEffect, useState } from "react";
import { getDoughnutGraph, getLineGraph } from "../../../../utils/analytics";
import { Box, Grid, Paper, Typography } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const PollAnalyticsPage = ({ user, poll }) => {
  return (
    <DashboardLayout user={user}>
      <Typography
        component="h1"
        variant="h2"
        sx={{ fontWeight: 700, mt: 3, mb: 5 }}
        align="center"
      >
        <AutoGraphIcon sx={{ fontSize: 50 }} /> Analytics
      </Typography>

      <Typography
        component="h2"
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <QuizIcon sx={{ mr: 1 }} /> {poll.question}
      </Typography>

      <Grid container spacing={10}>
        <Grid item xs>
          <Paper sx={{ p: 2 }}>
            <Doughnut data={getDoughnutGraph(poll)} />
          </Paper>
        </Grid>

        <Grid item xs>
          <Paper sx={{ p: 2 }}>
            <Line data={getLineGraph(poll)} />
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export const getServerSideProps = async ({ req, res, params }) => {
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

  const poll = await prisma.poll.findUnique({
    where: {
      id: +params.id,
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
      poll: JSON.parse(JSON.stringify(poll)),
    },
  };
};

export default PollAnalyticsPage;
