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
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../utils/axios";
import { EmployeesRoles } from "../utils/constant";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    salary: "",
    mobile: "",
    email: "",
    role: "",
    image: "",
    dob: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  // 🔹 Fetch employee
  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/updateemployee/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const emp = res.data.employee;
      setFormData({
        ...emp,
        dob: emp.dob ? emp.dob.split("T")[0] : "",
      });
    } catch {
      toast.error("Failed to load employee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const temp = {};
    if (!formData.name) temp.name = "Name is required";
    if (!formData.image) temp.image = "Image URL is required";
    if (!formData.dob) temp.dob = "Date of birth is required";
    if (!formData.mobile) temp.mobile = "Mobile number is required";
    if (!formData.email) temp.email = "Email is required";
    if (!formData.role) temp.role = "Role is required";
    if (!formData.salary || formData.salary < 1000)
      temp.salary = "Salary must be at least 1000";
    if (!formData.address) temp.address = "Address is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axiosClient.put(
        `/updateemployee/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message || "Employee updated successfully");
      setTimeout(() => navigate("/allemployee"), 1000);
    } catch {
      toast.error("Failed to update employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, width: "100%", maxWidth: 600 }}>
        <Typography variant="h4" mb={3} align="center" fontWeight="bold">
          Update Employee
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Employee Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.image)}
              helperText={errors.image}
            />

            <TextField
              label="Employee Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.name)}
              helperText={errors.name}
            />

            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.dob)}
              helperText={errors.dob}
            />

            <TextField
              label="Mobile Number"
              name="mobile"
              type="number"
              value={formData.mobile}
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.mobile)}
              helperText={errors.mobile}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            <TextField
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.role)}
              helperText={errors.role}
            >
              <MenuItem value="">---------select----------</MenuItem>
              {EmployeesRoles.map((role, i) => (
                <MenuItem key={i} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.salary)}
              helperText={errors.salary}
            />

            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
              error={Boolean(errors.address)}
              helperText={errors.address}
            />

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={22} /> : "Update Employee Data"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateEmployee;
