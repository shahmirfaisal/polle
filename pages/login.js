import {
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
  Toolbar,
  AppBar,
  Box,
  Link as MuiLink,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { errorHandler } from "../utils/errorHandler";
import { useRouter } from "next/router";
import { getUser } from "../lib/getUser";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Header } from "../components/Header";
import { HomeLayout } from "../components/HomeLayout";
import { Footer } from "../components/Footer";
import { Seo } from "../components/Seo/";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signupHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });

      router.replace("/dashboard");
    } catch (error) {
      errorHandler(error);
    }

    setLoading(false);
  };

  return (
    <HomeLayout user={null}>
      <Container maxWidth="xl">
        <Seo
          title="Login - Polle"
          description="POLLE is the easiest and fastest way to create, distribute and analyze your polls, from start to finish!"
        />

        <Typography
          component="h1"
          variant="h3"
          align="center"
          sx={{ fontWeight: 700, mt: 4 }}
        >
          Login
        </Typography>

        <Paper
          component="form"
          onSubmit={signupHandler}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "600px",
            mx: "auto",
            p: 3,
            mt: 4,
          }}
        >
          <TextField
            type="email"
            label="Email"
            required
            sx={{ my: 3 }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <TextField
            type="password"
            label="Password"
            required
            sx={{ mb: 3 }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <Button variant="contained" type="submit" disabled={loading}>
            Login {loading && <CircularProgress size={25} />}
          </Button>
        </Paper>

        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account yet?{" "}
          <Link href="/signup">
            <a title="Signup">Create a new one!</a>
          </Link>
        </Typography>
      </Container>
    </HomeLayout>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const user = await getUser(req, res);

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};

export default LoginPage;
