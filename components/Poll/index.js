import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export const Poll = ({ themeColor }) => {
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: themeColor,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          px: 3,
          py: 3,
          minWidth: { xs: "auto", sm: "300px", md: "400px" },
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          sx={{ fontWeight: 700, color: themeColor }}
        >
          Your Question
        </Typography>

        <FormControl sx={{ mt: 2, display: "block" }}>
          <RadioGroup defaultValue="answer1">
            <FormControlLabel
              value="answer1"
              control={
                <Radio
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={
                    <RadioButtonCheckedIcon sx={{ color: themeColor }} />
                  }
                />
              }
              label="Answer 1"
            />
            <FormControlLabel
              value="answer2"
              control={
                <Radio
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={
                    <RadioButtonCheckedIcon sx={{ color: themeColor }} />
                  }
                />
              }
              label="Answer 2"
            />
            <FormControlLabel
              value="answer3"
              control={
                <Radio
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={
                    <RadioButtonCheckedIcon sx={{ color: themeColor }} />
                  }
                />
              }
              label="Answer 3"
            />
          </RadioGroup>
        </FormControl>

        <button className="button">VOTE</button>
      </Paper>

      <style jsx>{`
        .button {
          border: none;
          color: white;
          background-color: ${themeColor};
          padding: 10px 20px;
          font-family: "Montserrat";
          font-size: 15px;
          cursor: pointer;
          display: block;
          margin-left: auto;
          box-shadow: 1px 2px 8px rgb(0 0 0 / 20%);
          margin-top: 15px;
          font-weight: 500;
          line-spacing: 1px;
        }
      `}</style>
    </Box>
  );
};
