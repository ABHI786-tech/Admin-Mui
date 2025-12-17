import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { axiosClient } from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RightStatus } from "../utils/constant";

const ViewRights = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee_id: "",
    right: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  // 🔹 Fetch employees
  const getAllEmployee = async () => {
    try {
      const res = await axiosClient.get("/allemployee");
      setEmployees(res.data.employees || []);
    } catch {
      toast.error("Failed to load employees");
    }
  };

  // 🔹 Fetch rights
  const fetchRights = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/rights/${id}`);
      setFormData({
        employee_id: res.data.employee_id || "",
        right: res.data.right || "",
        status: res.data.status || "",
      });
    } catch {
      toast.error("Failed to load rights data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRights();
      getAllEmployee();
    }
  }, [id]);

  // 🔹 Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Validation
  const validate = () => {
    const temp = {};
    if (!formData.employee_id) temp.employee_id = "Employee is required";
    if (!formData.right) temp.right = "Right is required";
    if (!formData.status) temp.status = "Status is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axiosClient.put(`/rights/${id}`, formData);
      toast.success(res.data.message || "Rights updated successfully");
      navigate("/rights/populate");
    } catch {
      toast.error("Failed to update rights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, width: "100%", maxWidth: 500 }}>
        <Typography variant="h4" mb={3} align="center" fontWeight="bold">
          Update Rights
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {/* Employee */}
            <TextField
              select
              label="Employee Name"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.employee_id)}
              helperText={errors.employee_id}
            >
              <MenuItem value="">---------select----------</MenuItem>
              {employees.map((emp) => (
                <MenuItem key={emp._id} value={emp._id}>
                  {emp.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Right */}
            <TextField
              label="Right"
              name="right"
              value={formData.right}
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.right)}
              helperText={errors.right}
            />

            {/* Status */}
            <TextField
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.status)}
              helperText={errors.status}
            >
              <MenuItem value="">---------select----------</MenuItem>
              {RightStatus.map((status, i) => (
                <MenuItem key={i} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>

            {/* Submit */}
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={22} /> : "Update Rights"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ViewRights;
