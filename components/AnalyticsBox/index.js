import { Paper, Typography } from "@mui/material";

export const AnalyticsBox = ({ icon, title, value }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxShadow:
          "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        p: 4,
        mt: 4,
        border: "0.3px solid rgba(0,0,0,0.05)",
        borderRadius: "16px",
      }}
    >
      {icon}
      <Typography sx={{ my: 2, fontWeight: 700 }} variant="h3">
        {value}
      </Typography>
      <Typography>{title}</Typography>
    </Paper>
  );
};
