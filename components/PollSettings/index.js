import {
  TextField,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Switch,
  Typography,
  DialogActions,
  Tooltip,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import classes from "./style.module.scss";
import { PollContext } from "../../context/PollContext/";
import InfoIcon from "@mui/icons-material/Info";

export const PollSettings = ({ poll }) => {
  const [open, setOpen] = useState(false);
  const {
    thanksMessage,
    changeThanksMessageHandler,
    showResults,
    changeShowResultsHandler,
    enable,
    changeEnableHandler,
  } = useContext(PollContext);
  const [message, setMessage] = useState(thanksMessage);

  useEffect(() => {
    if (poll) {
      changeThanksMessageHandler(poll.thanksMessage);
      changeShowResultsHandler({ target: { checked: poll.showResults } });
    }
  }, [poll]);

  const openDialogHandler = () => {
    setMessage(thanksMessage);
    setOpen(true);
  };

  const closeDialogHandler = () => {
    setOpen(false);
  };

  const changeMessageHandler = (e) => setMessage(e.target.value);

  const submitMessageHandler = () => {
    if (!message.trim().length) return;
    changeThanksMessageHandler(message.trim());
    closeDialogHandler();
  };

  return (
    <Box>
      <Typography
        component="h2"
        variant="h5"
        sx={{ fontWeight: 600, mt: 3, mb: 2 }}
        align="center"
      >
        Settings
      </Typography>

      <Paper
        sx={{ maxWidth: "400px", mx: "auto", px: 2 }}
        className={classes.settings}
      >
        <Box>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            {showResults ? "Show" : "Hide"} Results:{" "}
            <Tooltip title="Do you want to show the results of poll once the user submits the vote?">
              <InfoIcon sx={{ ml: 1 }} fontSize="small" />
            </Tooltip>
          </Typography>
          <Switch checked={showResults} onChange={changeShowResultsHandler} />
        </Box>

        <Typography
          sx={{
            fontWeight: 600,
            mb: -1,
            mt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          Thanks Message:{" "}
          <Tooltip title="The message you want to display once the user submits the vote.">
            <InfoIcon sx={{ ml: 1 }} fontSize="small" />
          </Tooltip>
        </Typography>
        <Box>
          <Typography>{thanksMessage}</Typography>
          <Button onClick={openDialogHandler}>Configure</Button>
        </Box>

        <Box>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            Poll is {enable ? "Enabled" : "Disabled"}:{" "}
            <Tooltip title="When poll is enabled users can see and submit votes to the poll. When it is disabled users will no longer be able to see it or submit votes even if they have the link to the poll.">
              <InfoIcon sx={{ ml: 1 }} fontSize="small" />
            </Tooltip>
          </Typography>
          <Switch checked={enable} onChange={changeEnableHandler} />
        </Box>
      </Paper>

      <Dialog open={open} onClose={closeDialogHandler}>
        <DialogTitle>Change Thank You Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            variant="standard"
            value={message}
            onChange={changeMessageHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogHandler}>Cancel</Button>
          <Button onClick={submitMessageHandler}>Change</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
