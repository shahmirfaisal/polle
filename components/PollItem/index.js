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

export const PollItem = ({ poll, sx }) => {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const openDeleteDialogHandler = () => setOpenDeleteDialog(true);
  const closeDeleteDialogHandler = () => setOpenDeleteDialog(false);

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
      elevation={0}
      sx={{
        boxShadow:
          "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        p: 3,
        position: "relative",
        border: "0.3px solid rgba(0,0,0,0.05)",
        borderRadius: "16px",
        ...sx,
      }}
    >
      <Typography sx={{ fontWeight: 600 }} component="h3" variant="h5">
        <Link href={`/poll/${poll.id}`}>
          <MuiLink underline="hover" sx={{ cursor: "pointer" }}>
            {poll.question}
          </MuiLink>
        </Link>
      </Typography>

      <Box sx={{ mt: 3, mb: 2 }}>
        <EditIcon
          sx={{ cursor: "pointer" }}
          onClick={() => router.push(`/dashboard/edit-poll/${poll.id}`)}
        />
        <AutoGraphIcon sx={{ mx: 2, cursor: "pointer" }} />
        {deleteLoading ? (
          <CircularProgress size={20} />
        ) : (
          <DeleteIcon
            sx={{ cursor: "pointer" }}
            onClick={openDeleteDialogHandler}
          />
        )}
      </Box>

      <Typography
        sx={{ color: "#858282", fontWeight: 500, fontSize: "0.96rem" }}
      >
        {moment(poll.createdAt).fromNow()}
      </Typography>

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
