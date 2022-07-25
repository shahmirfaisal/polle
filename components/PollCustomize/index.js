import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Poll } from "../Poll";
import classes from "./style.module.scss";
import { CirclePicker } from "react-color";
import { useContext, useEffect, useState } from "react";
import { PollContext } from "../../context/PollContext/";

export const PollCustomize = ({ poll }) => {
  const { themeColor, changeThemeColorHandler } = useContext(PollContext);
  const themeColors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#1976D2",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#00AB55",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ];

  useEffect(() => {
    if (poll) {
      changeThemeColorHandler({ hex: poll.themeColor });
    }
  }, [poll]);

  return (
    <Box>
      <Typography
        component="h2"
        variant="h5"
        sx={{ fontWeight: 600, mt: 3, mb: 2 }}
        align="center"
      >
        Customize Your Poll
      </Typography>

      <Typography sx={{ mt: 1, mb: 1 }}>
        This is how your poll will look like:
      </Typography>

      <Grid container spacing={2}>
        <Grid item md={7} xs={12}>
          <Poll themeColor={themeColor} />
        </Grid>

        <Grid item md={5} xs={12}>
          <Paper
            className={classes.settings}
            sx={{
              p: 2,
              height: "100%",
            }}
          >
            <FormControl>
              <FormLabel>Pick a theme color</FormLabel>
              <CirclePicker
                colors={themeColors}
                color={themeColor}
                onChange={changeThemeColorHandler}
                width="auto"
              />
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
