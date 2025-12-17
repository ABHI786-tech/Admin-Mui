import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeUser, setUser } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../utils/axios";
import { Box, CircularProgress, Typography } from "@mui/material";

const MainContext = createContext();

export const useMainContext = () => useContext(MainContext);

export const MainContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: "",
    salary: "",
    mobile: "",
    email: "",
    role: "",
    dob: "",
    address: "",
  });

  const LogoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    toast.success("Logout successful!");
    navigate("/login");
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axiosClient.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setUser({ user: response.data }));
      // toast.success(response.data.message || "User profile fetched");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      dispatch(removeUser());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // ===== Loading UI (MUI) =====
  if (loading) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#e5e7eb"
        flexDirection="column"
      >
        <CircularProgress />
        <Typography mt={2} variant="body1" color="textSecondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <MainContext.Provider value={{ fetchUserProfile, LogoutHandler }}>
      {children}
    </MainContext.Provider>
  );
};
