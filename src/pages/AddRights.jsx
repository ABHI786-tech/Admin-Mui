import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { axiosClient } from "../utils/axios";
import { toast } from "react-toastify";

const AddRights = () => {
  const [employee, setEmployee] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: "",
    right: "",
  });
  const [loading, setLoading] = useState(false);

  /* ========== Get Employees ========== */
  const getAllEmployee = async () => {
    try {
      const response = await axiosClient.get("/allemployee");
      setEmployee(response.data.employees);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEmployee();
  }, []);

  /* ========== Handle Change ========== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ========== Submit ========== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.employee_id || !formData.right) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosClient.post("/addrights", formData);
      toast.success(response.data.message || "Add right successful!");

      setFormData({
        employee_id: "",
        right: "",
      });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 6,
        backgroundColor: "#f4f6f8",
      }}
    >
      <Card sx={{ width: 420, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
            Add Employee Rights
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            {/* Employee Select */}
            <TextField
              select
              fullWidth
              label="Employee Name"
              name="employee_id"
              value={formData.employee_id}
              onChange={(e)=>handleChange(e)}
              margin="normal"
            >
              <MenuItem value="">Select Employee</MenuItem>
              {employee.map((cur) => (
                <MenuItem key={cur._id} value={cur._id}>
                  {cur.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Rights Input */}
            <TextField
              fullWidth
              label="Employee Rights"
              name="right"
              value={formData.right}
              onChange={(e)=>handleChange(e)}
              placeholder="e.g. Add Employee, View Reports"
              margin="normal"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, py: 1.2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: "white" }} />
              ) : (
                "Add Rights"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddRights;
