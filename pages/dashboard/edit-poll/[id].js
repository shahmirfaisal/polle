import { getUser } from "../../../lib/getUser";
import { prisma } from "../../../lib/prisma";
import { PollManager } from "../../../components/PollManager/";

const EditPollPage = ({ user, poll }) => {
  console.log(poll);
  return <PollManager user={user} poll={poll} />;
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

  return {
    props: {
      user,
      poll: JSON.parse(JSON.stringify(poll)),
    },
  };
};

export default EditPollPage;
