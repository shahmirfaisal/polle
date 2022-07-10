import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AddBox, Close } from "@mui/icons-material";
import { useContext, useState } from "react";
import { PollContext } from "../../context/PollContext/";

export const PollMaker = () => {
  const {
    question,
    changeQuestionHandler,
    answers,
    changeAnswerHandler,
    addAnswer,
    removeAnswer,
    createPollHandler,
    loading,
  } = useContext(PollContext);

  return (
    <Box>
      <Typography
        component="h2"
        variant="h5"
        sx={{ fontWeight: 600, mt: 3, mb: 2 }}
        align="center"
      >
        Make your poll
      </Typography>

      <Paper
        component="form"
        sx={{
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          mx: "auto",
          p: 3,
        }}
      >
        <FormLabel sx={{ mb: 1, fontWeight: 500 }}>Your Question</FormLabel>
        <TextField
          type="text"
          label="Type your question"
          value={question}
          onChange={changeQuestionHandler}
        />

        <FormLabel sx={{ mb: 1, mt: 2, fontWeight: 500 }}>
          Your Answers
        </FormLabel>
        {answers.map((answer) => (
          <TextField
            sx={{ mb: 2 }}
            key={answer.id}
            type="text"
            label="Type your answer"
            value={answer.value}
            onChange={(e) => changeAnswerHandler(answer.id, e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Close
                    sx={{ cursor: "pointer" }}
                    onClick={() => removeAnswer(answer.id)}
                  />
                </InputAdornment>
              ),
            }}
          />
        ))}

        <AddBox
          color="primary"
          sx={{ fontSize: 50, cursor: "pointer", mx: "auto", mt: 1, mb: 2 }}
          onClick={addAnswer}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          onClick={createPollHandler}
        >
          Create {loading && <CircularProgress size={25} />}
        </Button>
      </Paper>
    </Box>
  );
};
