import { Container, Typography, Link as MuiLink } from "@mui/material";
import { HomeLayout } from "../components/HomeLayout/";
import Link from "next/link";

const Custom404 = () => {
  return (
    <HomeLayout>
      <Container
        maxWidth="lg"
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h2" sx={{ fontWeight: 700 }}>
          404
        </Typography>
        <Typography sx={{ my: 2 }}>Page Not Found!</Typography>
        <Link href="/" passHref>
          <MuiLink title="Home Page" sx={{ fontWeight: 500 }}>
            Go back to the home page.
          </MuiLink>
        </Link>
      </Container>
    </HomeLayout>
  );
};

export default Custom404;
