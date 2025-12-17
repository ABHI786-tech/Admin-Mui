import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { toast } from "react-toastify";
import { axiosClient } from "../utils/axios";
import { Link } from "react-router-dom";

function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    /* ===== Validation ===== */
    if (!email) {
      setErrorMsg("Email is required");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosClient.post("/forgetpassword", { email });

      const message =
        res?.data?.message ||
        res?.data ||
        "Password reset link sent!";
      toast.success(message);

      setEmail("");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Something went wrong!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minHeight="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#e5e7eb"
    >
      <Paper
        elevation={4}
        sx={{
          width: { xs: "95%", md: "50%", lg: "35%" },
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          Forgot Password
        </Typography>

        <Box component="form" onSubmit={submitHandler}>
          {/* Email */}
          <TextField
            fullWidth
            label="Registered Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMsg("");
            }}
            placeholder="Enter your email"
            margin="normal"
            error={!!errorMsg}
            helperText={errorMsg}
          />

          {/* Submit */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, py: 1.2 }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

          {/* Back to Login */}
          <Box mt={2}>
            <MuiLink
              component={Link}
              to="/login"
              underline="hover"
              fontWeight="bold"
            >
              Back to Login
            </MuiLink>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default ForgetPassword;
