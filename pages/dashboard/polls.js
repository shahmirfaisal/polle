import { prisma } from "../../lib/prisma";
import { getUser } from "../../lib/getUser";
import { DashboardLayout } from "../../components/DashboardLayout/";
import { Typography } from "@mui/material";
import { PollItem } from "../../components/PollItem/";
import Head from "next/head";

const PollsPage = ({ user, polls }) => {
  console.log(polls);

  return (
    <DashboardLayout user={user}>
      <Head>
        <title>Manage Your Polls</title>
      </Head>

      <Typography
        component="h1"
        variant="h3"
        sx={{ fontWeight: 700, mt: 3, mb: 5 }}
        align="center"
      >
        Manage Your Polls
      </Typography>

      {polls.map((poll) => (
        <PollItem key={poll.id} poll={poll} sx={{ mb: 6 }} />
      ))}
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

export default PollsPage;
