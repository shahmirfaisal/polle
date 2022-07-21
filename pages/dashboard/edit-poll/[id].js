import { getUser } from "../../../lib/getUser";
import { prisma } from "../../../lib/prisma";
import { PollManager } from "../../../components/PollManager/";
import Head from "next/head";

const EditPollPage = ({ user, poll }) => {
  return (
    <>
      <Head>
        <title>Edit Your Poll</title>
      </Head>

      <PollManager user={user} poll={poll} />
    </>
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
    where: { id: +params.id },
    include: { answers: true },
  });

  if (poll.userId !== user.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
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

export default EditPollPage;
