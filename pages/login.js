import {
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { errorHandler } from "../utils/errorHandler";
import { useRouter } from "next/router";
import { getUser } from "../lib/getUser";

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
    <Container maxWidth="xl">
      <Typography
        component="h1"
        variant="h3"
        align="center"
        sx={{ fontWeight: 700 }}
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
    </Container>
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
