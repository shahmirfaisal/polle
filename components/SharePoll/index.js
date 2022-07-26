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
        {process.env.NEXT_PUBLIC_SITE_URL}/poll/{poll?.id}
      </Box>
      <CopyToClipboard
        text={`${process.env.NEXT_PUBLIC_SITE_URL}/poll/${poll?.id}`}
        onCopy={() => NotificationManager.success("Copied to clipboard!")}
      >
        <Button sx={{ borderRadius: 0 }} variant="contained" size="small">
          Copy Link
        </Button>
      </CopyToClipboard>
    </Box>
  );
};
