import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { authSlicePath } from "../redux/slice/authSlice";
import { useMainContext } from "../context/mainContext";

const NewNavbar = () => {
  const user = useSelector(authSlicePath);
  const { LogoutHandler } = useMainContext();
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        //  backgroundColor:"primary"
      
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* ===== LOGO ===== */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ cursor: "pointer", color: "white" }}
          onClick={() => navigate("/")}
        >
          Employee Management Service
        </Typography>

        {/* ===== RIGHT LINKS ===== */}
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            component={NavLink}
            to="/"
            sx={{
              color: "white",
              fontWeight: 600,
               "&:hover": { color: "black" },
              "&:active": { textDecoration: "underline" },
            }}
          >
            Home
          </Button>
          <Button
            component={NavLink}
            to="/contactus"
            sx={{
              color: "white",
              fontWeight: 600,
               "&:hover": { color: "black" },
              "&:active": { textDecoration: "underline" },
            }}
          >
            Contect-us
          </Button>

          {!user ? (
            <>
              <Button
                component={NavLink}
                to="/login"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  "&:hover": { color: "black" },
              "&:active": { textDecoration: "underline" },
                }}
              >
                Login
              </Button>

              <Button
                component={NavLink}
                to="/register"
                sx={{
                  color: "white",
                  fontWeight: 600,
                    "&:hover": { color: "black" },
              "&:active": { textDecoration: "underline" },
                }}
              >
                Register
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={LogoutHandler}
              sx={{ fontWeight: 600 }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NewNavbar;
