import React, { useEffect, useState } from "react";
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

const initialValues = {
  email: "",
  password: "",
  captcha: "",
};

function LoginPage() {
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [formData, setFormData] = useState(initialValues);
  const [errorMsg, setErrorMsg] = useState({});

  const navigate = useNavigate();
  const { fetchUserProfile } = useMainContext();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMsg({ ...errorMsg, [name]: "" }); // clear error
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    /* ===== VALIDATION ===== */
    let error = {};
    if (!formData.email) error.email = "Please enter your email";
    if (!formData.password) error.password = "Please enter password";
    if (!formData.captcha) error.captcha = "Please enter captcha";

    setErrorMsg(error);
    if (Object.keys(error).length !== 0) return;

    setLoading(true);
    try {
      const res = await axiosClient.post("/login", formData);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      navigate("/");
      await fetchUserProfile();
      setFormData(initialValues)
      return res.data;
    } catch (err) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  /* ===== CAPTCHA LOGIC (UNCHANGED) ===== */
  const captchaOperator = ["+", "-", "*"];

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator =
      captchaOperator[Math.floor(Math.random() * captchaOperator.length)];
    setCaptcha(`${num1} ${operator} ${num2}`);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

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
          Login Now
        </Typography>

        <Box component="form" onSubmit={submitHandler}>
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

          {/* Captcha */}
          <Box mt={2}>
            <Typography fontWeight="700" mb={1}>
              Captcha
            </Typography>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography
                variant="h6"
                bgcolor="#e5e7eb"
                px={2}
                py={0.5}
                borderRadius={1}
              >
                {captcha}
              </Typography>

              <Button variant="text"  sx={{fontWeight: 600, textDecoration: "underline"}} onClick={generateCaptcha}>
                Refresh
              </Button>
            </Box>

            <TextField
              fullWidth
              name="captcha"
              value={formData.captcha}
              onChange={inputHandler}
              placeholder="Enter captcha result"
              error={!!errorMsg.captcha}
              helperText={errorMsg.captcha}
            />
          </Box>

          {/* Submit */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, py: 1.2 }}
            disabled={loading}
          >
            {loading ? "Logging..." : "Login Now"}
          </Button>

          {/* Links */}
          <Box mt={2} display="flex" justifyContent="space-between">
            <MuiLink
              component={Link}
              to="/forgetpassword"
              underline="hover"
              fontWeight="bold"
            >
              Forgot Password?
            </MuiLink>

            <MuiLink
              component={Link}
              to="/register"
              underline="hover"
              fontWeight="bold"
            >
              Create Account
            </MuiLink>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;
