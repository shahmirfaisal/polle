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
            <Image
              src="/logo.svg"
              width={50}
              height={50}
              objectFit="contain"
              alt="POLLE"
            />
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
                <Link passHref href="/">
                  <MuiLink
                    title="Home"
                    sx={{
                      cursor: "pointer",
                      color: pathname === "/" ? "primary.main" : "black",
                    }}
                    underline="none"
                  >
                    Home
                  </MuiLink>
                </Link>

                <Link passHref href="/login">
                  <MuiLink
                    title="Login"
                    sx={{
                      cursor: "pointer",
                      color: pathname === "/login" ? "primary.main" : "black",
                    }}
                    underline="none"
                  >
                    Login
                  </MuiLink>
                </Link>

                <Link passHref href="/signup">
                  <MuiLink
                    title="Signup"
                    sx={{
                      cursor: "pointer",
                      color: pathname === "/signup" ? "primary.main" : "black",
                    }}
                    underline="none"
                  >
                    Signup
                  </MuiLink>
                </Link>
              </>
            ) : user ? (
              <Link passHref href="/dashboard">
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
              <Link passHref href="/login">
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
