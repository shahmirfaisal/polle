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
import { useEffect, useState } from "react";
import {
  getPollDoughnutGraph,
  getPollLineGraph,
  colors,
} from "../../../../utils/analytics";
import { Box, Grid, Paper, Typography } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import {
  getTotalVotes,
  getDeviceVotes,
  getVotesPercentage,
} from "../../../../utils/votes";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Head from "next/head";

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
  const [barColors, setBarColors] = useState(colors);

  useEffect(() => {
    setBarColors(colors);
  }, [colors]);

  return (
    <DashboardLayout user={user}>
      <Head>
        <title>Analytics - {poll.question}</title>
      </Head>

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
          mb: 2,
          mt: 7,
          display: "flex",
          alignItems: "center",
        }}
      >
        <QuizIcon sx={{ mr: 1 }} /> {poll.question}
      </Typography>

      {poll.answers.map((answer, i) => (
        <Box sx={{ mb: 2 }} key={answer.id}>
          <Typography sx={{ fontWeight: 600 }}>{answer.name}</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LinearProgress
              sx={{
                height: "18px",
                borderRadius: "100px",
                flexGrow: "2",
                mr: 2,
                [`& .${linearProgressClasses.bar}`]: {
                  backgroundColor: barColors[i],
                },
                backgroundColor: "#dadada",
              }}
              value={getVotesPercentage(poll, answer)}
              variant="determinate"
            />
            <Typography>{getVotesPercentage(poll, answer)}%</Typography>
          </Box>
        </Box>
      ))}

      {!getTotalVotes(poll) && (
        <Typography align="center" sx={{ mb: 3 }}>
          This poll has not received any votes yet!
        </Typography>
      )}

      <Grid container spacing={10} component="section" sx={{ mt: 2 }}>
        <Grid item xs={12} md={5}>
          <Typography
            component="h3"
            variant="h6"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Votes on each answer
          </Typography>
          <Paper
            sx={{
              p: 2,
              height: "70vh",
            }}
          >
            <Doughnut
              data={getPollDoughnutGraph(poll)}
              options={{ maintainAspectRatio: false }}
            />
            {!getTotalVotes(poll) && (
              <Typography align="center">
                This poll has not received any votes yet!
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Typography
            component="h3"
            variant="h6"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Votes on each day
          </Typography>
          <Paper
            sx={{
              p: 2,
              height: "70vh",
            }}
          >
            <Line
              data={getPollLineGraph(poll)}
              options={{ maintainAspectRatio: false }}
            />
          </Paper>
        </Grid>
      </Grid>

      <Box component="section" sx={{ mt: 6 }}>
        <Typography component="h3" variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Votes from different devices
        </Typography>
        <Paper
          sx={{
            p: 2,
            maxWidth: "300px",
          }}
        >
          <Grid container>
            <Grid item xs sx={{ borderRight: 1, borderColor: "divider" }}>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Desktop</Typography>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Mobile</Typography>
              <Typography sx={{ fontWeight: 500 }}>Tablet</Typography>
            </Grid>

            <Grid item xs>
              <Typography align="center" sx={{ mb: 1 }}>
                {getDeviceVotes(poll).Desktop}
              </Typography>
              <Typography align="center" sx={{ mb: 1 }}>
                {getDeviceVotes(poll).Mobile}
              </Typography>
              <Typography align="center">
                {getDeviceVotes(poll).Tablet}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
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

  if (poll.userId !== user.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard/analytics",
      },
      props: {},
    };
  }

  return {
    props: {
      user,
      poll: JSON.parse(JSON.stringify(poll)),
    },
  };
};

export default PollAnalyticsPage;
