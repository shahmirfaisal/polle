import { getUser } from "../../lib/getUser";
import { DashboardLayout } from "../../components/DashboardLayout/";
import { useState } from "react";
import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import { PollMaker } from "../../components/PollMaker";
import { PollSettings } from "../../components/PollSettings";
import { PollCustomize } from "../../components/PollCustomize";

function TabPanel(props) {
  const { children, value, index } = props;

  return <section hidden={value !== index}>{children}</section>;
}

const CreatePollPage = ({ user }) => {
  const [value, setValue] = useState(0);

  const changeTabHandler = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <DashboardLayout user={user}>
      <Typography
        component="h1"
        variant="h3"
        sx={{ fontWeight: 600, mt: 2, mb: 3 }}
        align="center"
      >
        Create a Poll
      </Typography>

      <AppBar position="relative">
        <Tabs
          value={value}
          onChange={changeTabHandler}
          variant="fullWidth"
          textColor="inherit"
        >
          <Tab label="Poll" />
          <Tab label="Customize" />
          <Tab label="Settings" />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <PollMaker />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PollCustomize />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PollSettings />
      </TabPanel>
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
  return {
    props: {
      user,
    },
  };
};

export default CreatePollPage;
