import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
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
import { toast } from "react-toastify";
import axios from "axios";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [isShowNew, setIsShowNew] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    newpassword: "",
    confirmpassword: "",
  });
  const [errorMsg, setErrorMsg] = useState({});

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMsg({ ...errorMsg, [name]: "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    /* ===== Validation ===== */
    let error = {};
    if (!formData.newpassword)
      error.newpassword = "New password is required";
    else if (formData.newpassword.length < 6)
      error.newpassword = "Password must be at least 6 characters";

    if (!formData.confirmpassword)
      error.confirmpassword = "Confirm password is required";
    else if (formData.newpassword !== formData.confirmpassword)
      error.confirmpassword = "Passwords do not match";

    setErrorMsg(error);
    if (Object.keys(error).length !== 0) return;

    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `resetpassword?token=${token}`,
        { newpassword: formData.newpassword }
      );

      const message =
        res?.data?.message || "Password reset successfully";
      toast.success(message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to reset password";
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
          Reset Password
        </Typography>

        <Box component="form" onSubmit={submitHandler}>
          {/* New Password */}
          <TextField
            fullWidth
            label="New Password"
            name="newpassword"
            type={isShowNew ? "text" : "password"}
            value={formData.newpassword}
            onChange={inputHandler}
            placeholder="Enter new password"
            margin="normal"
            error={!!errorMsg.newpassword}
            helperText={errorMsg.newpassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setIsShowNew(!isShowNew)}
                  >
                    {isShowNew ? <FaEye /> : <FaEyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password */}
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmpassword"
            type={isShowConfirm ? "text" : "password"}
            value={formData.confirmpassword}
            onChange={inputHandler}
            placeholder="Confirm new password"
            margin="normal"
            error={!!errorMsg.confirmpassword}
            helperText={errorMsg.confirmpassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setIsShowConfirm(!isShowConfirm)
                    }
                  >
                    {isShowConfirm ? <FaEye /> : <FaEyeSlash />}
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
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
