import { Box, Button } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { NotificationManager } from "react-notifications";

export const SharePoll = ({ poll }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: 1,
        borderColor: "divider",
      }}
    >
      <Box sx={{ borderRight: 1, borderColor: "divider", px: 1 }}>
        http://localhost:3000/poll/{poll?.id}
      </Box>
      <CopyToClipboard
        text={`http://localhost:3000/poll/${poll?.id}`}
        onCopy={() => NotificationManager.success("Copied to clipboard!")}
      >
        <Button sx={{ borderRadius: 0 }} variant="contained" size="small">
          Copy Link
        </Button>
      </CopyToClipboard>
    </Box>
  );
};
