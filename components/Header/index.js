import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = ({ user }) => {
  const { pathname } = useRouter();

  return (
    <AppBar
      sx={{ backgroundColor: "white", color: "black" }}
      position="relative"
    >
      <Toolbar sx={{ py: 2 }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box display="flex" alignItems="center">
            <Image src="/logo.svg" width={50} height={50} objectFit="contain" />
            <Typography
              color="primary"
              sx={{ fontWeight: 700, ml: 1, fontSize: "1.3rem" }}
            >
              POLLE
            </Typography>
          </Box>

          <Box sx={{ "& > a": { ml: 3 } }}>
            {pathname === "/signup" || pathname === "/login" ? (
              <>
                <Link href="/">
                  <MuiLink
                    title="Home"
                    sx={{ cursor: "pointer" }}
                    underline="none"
                  >
                    Home
                  </MuiLink>
                </Link>

                <Link href="/login">
                  <MuiLink
                    title="Login"
                    sx={{ cursor: "pointer" }}
                    underline="none"
                  >
                    Login
                  </MuiLink>
                </Link>

                <Link href="/signup">
                  <MuiLink
                    title="Signup"
                    sx={{ cursor: "pointer" }}
                    underline="none"
                  >
                    Signup
                  </MuiLink>
                </Link>
              </>
            ) : user ? (
              <Link href="/dashboard">
                <Button
                  color="primary"
                  variant="contained"
                  component="a"
                  title="Dashboard"
                >
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button
                  color="primary"
                  variant="contained"
                  component="a"
                  title="Login"
                >
                  Get Started
                </Button>
              </Link>
            )}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
