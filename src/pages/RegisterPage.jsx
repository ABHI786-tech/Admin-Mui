import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Link as MuiLink,
} from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { axiosClient } from "../utils/axios";
import { toast } from "react-toastify";
import { useMainContext } from "../context/mainContext";

function RegisterPage() {
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({});

  const navigate = useNavigate();
  const { fetchUserProfile } = useMainContext();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMsg({ ...errorMsg, [name]: "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let error = {};
    if (!formData.name) error.name = "Please enter your name";
    if (!formData.email) error.email = "Please enter your email";
    if (!formData.password) error.password = "Please enter password";

    setErrorMsg(error);

    if (Object.keys(error).length !== 0) return;

    setLoading(true);
    try {
      const res = await axiosClient.post("/register", formData);
      toast.success("User registered successfully");
      localStorage.setItem("token", res.data.token);
      await fetchUserProfile();
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
    width={'100%'}
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
          Register
        </Typography>

        <Box component="form" onSubmit={submitHandler}>
          {/* Name */}
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={inputHandler}
            placeholder="Enter your name"
            margin="normal"
            error={!!errorMsg.name}
            helperText={errorMsg.name}
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={inputHandler}
            placeholder="Enter your email"
            margin="normal"
            error={!!errorMsg.email}
            helperText={errorMsg.email}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={isShow ? "text" : "password"}
            value={formData.password}
            onChange={inputHandler}
            placeholder="Enter your password"
            margin="normal"
            error={!!errorMsg.password}
            helperText={errorMsg.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setIsShow(!isShow)}>
                    {isShow ? <FaEye /> : <FaEyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Submit */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, py: 1.2 }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Now"}
          </Button>

          {/* Login link */}
          <Box mt={3}>
            <Typography variant="body2">
              Already have an account?{" "}
              <MuiLink
                component={Link}
                to="/login"
                fontWeight="bold"
                underline="hover"
              >
                Login Now
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default RegisterPage;
