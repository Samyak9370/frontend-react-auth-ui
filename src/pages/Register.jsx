import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert
} from "@mui/material";
import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", { email, password });
      toast.success("Registration successfully");
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper elevation={5} sx={{ p: 4, width: 380 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Create Account
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          color="text.secondary"
          mb={2}
        >
          Register to access the platform
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        <Typography
          variant="body2"
          textAlign="center"
          mt={2}
          sx={{ cursor: "pointer", color: "primary.main" }}
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
