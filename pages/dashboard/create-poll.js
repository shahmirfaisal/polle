import { getUser } from "../../lib/getUser";
import { DashboardLayout } from "../../components/DashboardLayout/";
import { useState } from "react";
import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import { PollMaker } from "../../components/PollMaker";
import { PollSettings } from "../../components/PollSettings";
import { PollCustomize } from "../../components/PollCustomize";
import { PollManager } from "../../components/PollManager/";

function TabPanel(props) {
  const { children, value, index } = props;

  return <section hidden={value !== index}>{children}</section>;
}

const CreatePollPage = ({ user }) => {
  return <PollManager user={user} />;
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

export default CreatePollPage;
