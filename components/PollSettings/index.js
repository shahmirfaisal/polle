import { Box, Button, Paper, Switch, Typography } from "@mui/material";
import classes from "./style.module.scss";

export const PollSettings = () => {
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
          <Switch defaultChecked />
        </Box>

        <Box>
          <Typography>Thank You Message</Typography>
          <Button>Configure</Button>
        </Box>
      </Paper>
    </Box>
  );
};
