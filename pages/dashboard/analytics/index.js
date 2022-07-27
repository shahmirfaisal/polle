import { prisma } from "../../../lib/prisma";
import { getUser } from "../../../lib/getUser";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { Box, Grid, Paper, Typography, Link as MuiLink } from "@mui/material";
import { getUserLineGraph } from "../../../utils/analytics";
import { PollItem } from "../../../components/PollItem";
import { Line } from "react-chartjs-2";
import Link from "next/link";
import { HowToVote, AutoGraph } from "@mui/icons-material";
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
import Head from "next/head";
import { Seo } from "../../../components/Seo/";

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
  return (
    <DashboardLayout user={user}>
      <Seo
        title="Analytics"
        description="POLLE is the easiest and fastest way to create, distribute and analyze your polls, from start to finish!"
      />

      <Typography
        component="h1"
        variant="h3"
        sx={{
          fontWeight: 700,
          mt: 3,
          mb: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          fontSize: { sm: "3.75rem", xs: "3rem" },
        }}
        align="center"
      >
        <AutoGraph sx={{ fontSize: 50 }} /> Analytics
      </Typography>

      <Typography component="h2" variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Total Votes on each of the Polls
      </Typography>

      <Paper
        component="section"
        sx={{
          p: 2,
          height: "70vh",
          maxWidth: "90%",
          position: "relative",
        }}
      >
        {!polls.length && (
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            No Data. You don't have any polls.{" "}
            <Link href="/dashboard/create-poll">
              <a>Let's create a new one!</a>
            </Link>{" "}
          </Typography>
        )}

        <Line
          data={getUserLineGraph(user, polls)}
          options={{ maintainAspectRatio: false }}
        />
      </Paper>

      <Typography
        component="h2"
        variant="h5"
        sx={{ fontWeight: 600, mb: 2, mt: 6 }}
      >
        Pick a poll to view analytics
      </Typography>

      {!polls.length && (
        <Typography>
          You don't have any polls.{" "}
          <Link href="/dashboard/create-poll">
            <a>Let's create a new one!</a>
          </Link>{" "}
        </Typography>
      )}

      <Box component="section">
        {polls.map((poll) => (
          <Paper
            key={poll.id}
            sx={{
              mb: 3,
              p: 2,
            }}
          >
            <Typography component="h3" variant="h6">
              <Link href={`/dashboard/analytics/polls/${poll.id}`} passHref>
                <MuiLink
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  underline="hover"
                  title="View Analytics"
                >
                  <HowToVote sx={{ mr: 1 }} /> {poll.question}
                </MuiLink>
              </Link>
            </Typography>
          </Paper>
        ))}
      </Box>
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
