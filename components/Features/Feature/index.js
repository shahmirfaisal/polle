import { Container, Paper, Typography, Box } from "@mui/material";
import Image from "next/image";

export const Feature = ({ title, text, image }) => {
  return (
    <Container maxWidth="md" sx={{}}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 600 }}
        component="h2"
      >
        {title}
      </Typography>
      <Typography align="center" sx={{ mt: 1, mb: 0 }}>
        {text}
      </Typography>

      <Box display="flex" justifyContent="center">
        <Image
          src={image}
          width={600}
          height={600}
          objectFit="contain"
          alt={title}
        />
      </Box>
    </Container>
  );
};
