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
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import classes from "./style.module.scss";
import { PollContext } from "../../context/PollContext/";

export const PollSettings = ({ poll }) => {
  const [open, setOpen] = useState(false);
  const {
    thanksMessage,
    changeThanksMessageHandler,
    showResults,
    changeShowResultsHandler,
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
          <Typography>Show Results</Typography>
          <Switch checked={showResults} onChange={changeShowResultsHandler} />
        </Box>

        <Typography sx={{ fontWeight: 600, mb: -2, mt: 2 }}>
          Thanks Message:
        </Typography>
        <Box>
          <Typography>{thanksMessage}</Typography>
          <Button onClick={openDialogHandler}>Configure</Button>
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
