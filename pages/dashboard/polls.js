import { prisma } from "../../lib/prisma";
import { getUser } from "../../lib/getUser";
import { DashboardLayout } from "../../components/DashboardLayout/";
import { Typography } from "@mui/material";
import { PollItem } from "../../components/PollItem/";
import Head from "next/head";
import Link from "next/link";
import { Seo } from "../../components/Seo/";

const PollsPage = ({ user, polls }) => {
  return (
    <DashboardLayout user={user}>
      <Seo
        title="Manage Your Polls"
        description="POLLE is the easiest and fastest way to create, distribute and analyze your polls, from start to finish!"
      />

      <Typography
        component="h1"
        variant="h3"
        sx={{
          fontWeight: 700,
          mt: 3,
          mb: 5,
          fontSize: { sm: "3.75rem", xs: "3rem" },
        }}
        align="center"
      >
        Manage Your Polls
      </Typography>

      {!polls.length && (
        <Typography align="center">
          You don't have any polls.{" "}
          <Link href="/dashboard/create-poll">
            <a>Let's create a new one!</a>
          </Link>{" "}
        </Typography>
      )}

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
