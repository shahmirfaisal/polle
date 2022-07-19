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
import { AddBox, Close, DriveEtaOutlined } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { PollContext } from "../../context/PollContext/";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragHandleIcon from "@mui/icons-material/DragHandle";

export const PollMaker = ({ poll }) => {
  const {
    question,
    changeQuestionHandler,
    answers,
    changeAnswerHandler,
    addAnswer,
    removeAnswer,
    createPollHandler,
    loading,
    updatePollHandler,
    handleAnswerDragEnd,
  } = useContext(PollContext);

  useEffect(() => {
    if (poll) {
      changeQuestionHandler({ target: { value: poll.question } });
      removeAnswer(1);
      poll.answers.forEach((answer) => addAnswer(answer.name));
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
        {poll ? "Update your poll" : "Make your poll"}
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

        <DragDropContext onDragEnd={handleAnswerDragEnd}>
          <Droppable droppableId="answerDroppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {answers.map((answer, index) => (
                  <Draggable
                    key={answer.id}
                    draggableId={answer.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Box display="flex" alignItems="center">
                          <TextField
                            sx={{ mb: 2, display: "flex", flexGrow: 2 }}
                            key={answer.id}
                            type="text"
                            label="Type your answer"
                            value={answer.value}
                            onChange={(e) =>
                              changeAnswerHandler(answer.id, e.target.value)
                            }
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
                          <IconButton>
                            <DragHandleIcon />
                          </IconButton>
                        </Box>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <AddBox
          color="primary"
          sx={{ fontSize: 50, cursor: "pointer", mx: "auto", mt: 1, mb: 2 }}
          onClick={() => addAnswer("")}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          onClick={(e) =>
            poll ? updatePollHandler(e, poll.id) : createPollHandler(e)
          }
        >
          {poll ? "Update" : "Create"}{" "}
          {loading && <CircularProgress size={25} />}
        </Button>
      </Paper>
    </Box>
  );
};
