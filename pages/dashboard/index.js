import { getUser } from "../../lib/getUser";
import { DashboardLayout } from "../../components/DashboardLayout/";

const DashboardPage = ({ user }) => {
  return <DashboardLayout user={user}></DashboardLayout>;
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
  return {
    props: {
      user,
    },
  };
};

export default DashboardPage;
