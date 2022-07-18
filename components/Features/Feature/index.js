import { Container, Paper, Typography } from "@mui/material";

export const Feature = ({ title, text, image }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 30 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 600 }}
        component="h3"
      >
        {title}
      </Typography>
      <Typography align="center" sx={{ mt: 1, mb: 7 }}>
        {text}
      </Typography>
      <Paper sx={{ width: "100%", height: "400px" }}>
        <img
          src={image}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "top",
          }}
        />
      </Paper>
    </Container>
  );
};
