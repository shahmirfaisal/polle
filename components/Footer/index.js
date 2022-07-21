import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

export const Footer = () => {
  return (
    <Box component="footer" bgcolor="#e9e9e9" py={5} mt={15}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item sm={6} xs={12}>
            <Box
              display="flex"
              alignItems="center"
              sx={{ justifyContent: { xs: "center", sm: "left" } }}
            >
              <Image
                src="/logo.svg"
                width={30}
                height={30}
                objectFit="contain"
              />
              <Typography sx={{ ml: 1, fontWeight: 600 }}>POLLE</Typography>
            </Box>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Typography sx={{ textAlign: { xs: "center", sm: "right" } }}>
              Built by <a href="https://shahmir.me/">Shahmir Faisal</a>
            </Typography>
          </Grid>
        </Grid>

        <Typography align="center" sx={{ mt: 4 }}>
          Built for{" "}
          <a target="_blank" href="https://hashnode.com/">
            Hashnode
          </a>{" "}
          and{" "}
          <a target="_blank" href="https://planetscale.com/">
            Planetscale
          </a>{" "}
          <a
            target="_blank"
            href="https://townhall.hashnode.com/planetscale-hackathon"
          >
            Hackathon
          </a>
          .
        </Typography>
      </Container>
    </Box>
  );
};
