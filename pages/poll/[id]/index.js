import { prisma } from "../../../lib/prisma";
import {
  Box,
  Button,
  CircularProgress,
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
import { useEffect, useState } from "react";
import axios from "axios";
import { errorHandler } from "../../../utils/errorHandler";
import { NotificationManager } from "react-notifications";
import { getDeviceType } from "../../../utils/getDeviceType";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

const Poll = ({ poll }) => {
  const [vote, setVote] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [voted, setVoted] = useState(false);

  const changeVoteHandler = (e) => setVote(e.target.value);

  const submitVoteHandler = async (e) => {
    e.preventDefault();

    const isVoted = getCookie(`poll-${poll.id}`);

    if (isVoted) {
      setVoted(true);
      return NotificationManager.error("You have already voted!");
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/api/votes", {
        pollId: poll.id,
        answerId: +vote,
        device: getDeviceType(),
      });

      NotificationManager.success("Vote Added!");
      setVoted(true);
    } catch (error) {
      errorHandler(error);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: poll.themeColor,
        width: "100%",
        height: "100vh",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        gridTemplateColumns: { xs: "1fr", sm: "500px" },
      }}
    >
      <Paper sx={{ px: 3, py: 3 }}>
        {voted && (
          <>
            <Typography
              component="h2"
              variant="h5"
              sx={{ fontWeight: 700, color: poll.themeColor }}
              align="center"
            >
              {poll.thanksMessage}
            </Typography>

            {poll.showResults && (
              <button
                onClick={() => router.push(`/poll/${poll.id}/results`)}
                className="button"
                style={{ margin: "20px auto 0 auto" }}
              >
                See Results
              </button>
            )}
          </>
        )}

        {!voted && (
          <>
            <Typography
              component="h2"
              variant="h5"
              sx={{ fontWeight: 700, color: poll.themeColor }}
            >
              {poll.question}
            </Typography>

            <FormControl sx={{ mt: 2, display: "block" }}>
              <RadioGroup value={vote} onChange={changeVoteHandler}>
                {poll.answers.map((answer) => (
                  <FormControlLabel
                    key={answer.id}
                    value={answer.id}
                    control={
                      <Radio
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={
                          <RadioButtonCheckedIcon
                            sx={{ color: poll.themeColor }}
                          />
                        }
                      />
                    }
                    label={answer.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <button
              onClick={submitVoteHandler}
              className="button"
              disabled={loading}
            >
              VOTE{" "}
              {loading && (
                <CircularProgress size={18} sx={{ color: "white" }} />
              )}
            </button>
          </>
        )}
      </Paper>

      <style jsx>{`
        .button[disabled] {
          background-color: grey;
        }
        .button {
          border: none;
          color: white;
          background-color: ${poll.themeColor};
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

export const getServerSideProps = async ({ params, req, res, query }) => {
  // const isVoted = getCookie(`poll-${params.id}`, { req, res });

  // console.log("SERVER SIDE PROPS!");

  // if (isVoted && query?.voted !== "true") {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: `/poll/${params.id}?voted=true`,
  //     },
  //   };
  // }

  // if (!isVoted && query?.voted === "true") {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: `/poll/${params.id}`,
  //     },
  //   };
  // }

  const poll = await prisma.poll.findUnique({
    where: {
      id: +params.id,
    },
    include: {
      answers: true,
    },
  });

  return {
    props: {
      poll: JSON.parse(JSON.stringify(poll)),
    },
  };
};

export default Poll;
