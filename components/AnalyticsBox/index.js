import { Paper, Typography } from "@mui/material";

export const AnalyticsBox = ({ icon, title, value }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        p: 4,
        mt: 4,
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
