import {
  Box,
  Paper,
  Typography,
  Link as MuiLink,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import moment from "moment";
import { getTotalVotes } from "../../utils/votes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import axios from "axios";
import { useEffect, useState } from "react";
import { errorHandler } from "../../utils/errorHandler";
import { useRouter } from "next/router";
import { NotificationManager } from "react-notifications";
import ShareIcon from "@mui/icons-material/Share";
import { SharePoll } from "../SharePoll/";

export const PollItem = ({ poll, sx }) => {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);

  const openDeleteDialogHandler = () => setOpenDeleteDialog(true);
  const closeDeleteDialogHandler = () => setOpenDeleteDialog(false);

  const openShareDialogHandler = () => setOpenShareDialog(true);
  const closeShareDialogHandler = () => setOpenShareDialog(false);

  const deletePollHandler = async () => {
    setDeleteLoading(true);
    setOpenDeleteDialog(false);

    try {
      await axios.delete(`/api/polls/${poll.id}`);
      router.replace(router.asPath);
      NotificationManager.success("Poll Deleted!");
    } catch (error) {
      errorHandler(error);
      setDeleteLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        position: "relative",
        borderRadius: "16px",
        ...sx,
      }}
    >
      <Typography sx={{ fontWeight: 600 }} component="h3" variant="h5">
        <Link href={`/poll/${poll.id}`} passHref>
          <MuiLink target="_blank" underline="hover" sx={{ cursor: "pointer" }}>
            {poll.question}
          </MuiLink>
        </Link>
      </Typography>

      <Box sx={{ mt: 3, mb: 2, "& a": { color: "black" } }}>
        <Link href={`/dashboard/edit-poll/${poll.id}`} passHref>
          <a title="Edit">
            <EditIcon />
          </a>
        </Link>

        <Link href={`/dashboard/analytics/polls/${poll.id}`} passHref>
          <a title="Analytics">
            <AutoGraphIcon sx={{ mx: 2 }} />
          </a>
        </Link>

        <Tooltip title="Share" placement="top">
          <ShareIcon
            sx={{ mr: 2, cursor: "pointer" }}
            onClick={openShareDialogHandler}
          />
        </Tooltip>

        {deleteLoading ? (
          <CircularProgress size={20} />
        ) : (
          <Tooltip title="Delete" placement="top">
            <DeleteIcon
              sx={{ cursor: "pointer" }}
              onClick={openDeleteDialogHandler}
            />
          </Tooltip>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href={`/dashboard/analytics/polls/${poll.id}`} passHref>
          <MuiLink
            sx={{ cursor: "pointer" }}
            underline="hover"
            title="View Analytics"
          >
            View Analytics
          </MuiLink>
        </Link>

        <Typography
          sx={{ color: "#858282", fontWeight: 500, fontSize: "0.96rem" }}
        >
          {moment(poll.createdAt).fromNow()}
        </Typography>
      </Box>

      <Box
        sx={{
          border: 2,
          borderRadius: 100,
          borderColor: "primary.main",
          position: "absolute",
          top: 0,
          right: 0,
          transform: "translate(0%, -50%)",
          py: 0.6,
          px: 1.5,
          fontSize: "0.9rem",
        }}
      >
        {getTotalVotes(poll)} Votes
      </Box>

      <Dialog open={openShareDialog} onClose={closeShareDialogHandler}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Share your poll
          </Typography>
          <SharePoll poll={poll} />
        </Box>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={closeDeleteDialogHandler}>
        <DialogTitle>Are you sure to delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting the poll will result in the removal of its answers and
            votes as well.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={closeDeleteDialogHandler}>
            Cancel
          </Button>
          <Button color="primary" onClick={deletePollHandler}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
