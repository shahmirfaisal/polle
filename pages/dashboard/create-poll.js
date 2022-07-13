import { getUser } from "../../lib/getUser";
import { DashboardLayout } from "../../components/DashboardLayout/";
import { useContext, useEffect, useRef, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { PollMaker } from "../../components/PollMaker";
import { PollSettings } from "../../components/PollSettings";
import { PollCustomize } from "../../components/PollCustomize";
import { PollManager } from "../../components/PollManager/";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { NotificationManager } from "react-notifications";
import { PollContext } from "../../context/PollContext/";
import Link from "next/link";
import { SharePoll } from "../../components/SharePoll/";

const CreatePollPage = ({ user }) => {
  const { openDialog, openDialogHandler, closeDialogHandler, poll } =
    useContext(PollContext);
  const ref = useRef(null);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  return (
    <>
      <PollManager user={user} />

      <Dialog open={openDialog} onClose={closeDialogHandler}>
        <Box sx={{ px: 3, pb: 3 }}>
          <lottie-player
            src="https://assets1.lottiefiles.com/packages/lf20_kf95m1dj.json"
            background="transparent"
            speed="1"
            style={{ width: "200px", height: "200px", margin: "0 auto" }}
            loop
            autoplay
            ref={ref}
          ></lottie-player>

          <Typography align="center" variant="h6" sx={{ fontWeight: 600 }}>
            Poll Created Successfully!
          </Typography>

          <Typography sx={{ mt: 3 }}>Share with others</Typography>
          <SharePoll poll={poll} />

          <Link href="/dashboard">
            <Button
              variant="contained"
              size="small"
              sx={{ display: "block", mx: "auto", mt: 4, textAlign: "center" }}
              component="a"
              title="Dashboard"
            >
              Go Back to the dashboard
            </Button>
          </Link>
        </Box>
      </Dialog>
    </>
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
