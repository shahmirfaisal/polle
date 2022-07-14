import { DashboardLayout } from "../DashboardLayout/";
import { useContext, useEffect, useState } from "react";
import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import { PollMaker } from "../PollMaker";
import { PollSettings } from "../PollSettings";
import { PollCustomize } from "../PollCustomize";
import { PollContext } from "../../context/PollContext/";

function TabPanel(props) {
  const { children, value, index } = props;

  return <section hidden={value !== index}>{children}</section>;
}

export const PollManager = ({ user, poll }) => {
  const [value, setValue] = useState(0);
  const { clearAll } = useContext(PollContext);

  useEffect(() => {
    return () => clearAll();
  }, []);

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
        {poll ? "Update Poll" : "Create a Poll"}
      </Typography>

      <AppBar
        position="relative"
        sx={{
          // backgroundColor: "white",
          color: "white",
          boxShadow:
            "0px 2px 4px -1px rgb(0 0 0 / 3%), 0px 4px 5px 0px rgb(0 0 0 / 11%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        }}
      >
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
        <PollMaker poll={poll} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PollCustomize poll={poll} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PollSettings poll={poll} />
      </TabPanel>
    </DashboardLayout>
  );
};
