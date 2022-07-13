import { prisma } from "../../../lib/prisma";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
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
import Link from "next/link";
import { getVotesPercentage } from "../../../utils/votes";

const Poll = ({ poll }) => {
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
        gridTemplateColumns: { xs: "1fr", sm: "600px" },
      }}
    >
      <Paper sx={{ px: 3, py: 3 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 3 }}
          align="center"
          component="h1"
        >
          Poll Results
        </Typography>

        <Typography
          component="h2"
          variant="h5"
          sx={{ fontWeight: 700, color: poll.themeColor, mb: 3 }}
        >
          {poll.question}
        </Typography>

        <Box sx={{ mb: 5 }}>
          {poll.answers.map((answer) => (
            <Box sx={{ mb: 2 }} key={answer.id}>
              <Typography sx={{ fontWeight: 600 }}>{answer.name}</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LinearProgress
                  sx={{
                    height: "10px",
                    borderRadius: "100px",
                    flexGrow: "2",
                    mr: 2,
                  }}
                  value={getVotesPercentage(poll, answer)}
                  variant="determinate"
                />
                <Typography>{getVotesPercentage(poll, answer)}%</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Link href={`/poll/${poll.id}`}>
          <a className="button">Go Back to Poll</a>
        </Link>
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
          text-decoration: none;
          text-align: center;
        }
      `}</style>
    </Box>
  );
};

export const getServerSideProps = async ({ params, req, res, query }) => {
  const poll = await prisma.poll.findUnique({
    where: {
      id: +params.id,
    },
    include: {
      answers: {
        include: {
          votes: true,
        },
      },
    },
  });

  if (!poll.showResults) {
    return {
      redirect: {
        permanent: false,
        destination: `/poll/${poll.id}`,
      },
      props: {},
    };
  }

  return {
    props: {
      poll: JSON.parse(JSON.stringify(poll)),
    },
  };
};

export default Poll;
