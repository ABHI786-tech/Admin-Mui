import React, { useState } from "react";
import { Box, Paper, Typography, TextField, MenuItem, Button, Stack } from "@mui/material";
import { EmployeesRoles } from "../utils/constant";
import { toast } from "react-toastify";
import { axiosClient } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useMainContext } from "../context/mainContext";

const AddEmployee = () => {
  const navigate = useNavigate();
  const { fetchUserProfile } = useMainContext();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    salary: "",
    mobile: "",
    email: "",
    role: "",
    image: null,
    dob: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const temp = {};
    if (!formData.name) temp.name = "Name is required";
    if (!formData.image) temp.image = "Image is required";
    if (!formData.dob) temp.dob = "Date of birth is required";
    if (!formData.mobile) temp.mobile = "Mobile number is required";
    if (!formData.email) temp.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) temp.email = "Enter a valid email";
    if (!formData.role) temp.role = "Role is required";
    if (!formData.salary) temp.salary = "Salary is required";
    else if (Number(formData.salary) < 1000) temp.salary = "Salary cannot be less than 1000";
    if (!formData.address) temp.address = "Address is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      if (!token) return;

      const dataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        dataToSend.append(key, formData[key]);
      });

      const response = await axiosClient.post("/addemployee", dataToSend, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message || "Employee added successfully!");
      setFormData({
        name: "",
        salary: "",
        mobile: "",
        email: "",
        role: "",
        image: null,
        dob: "",
        address: "",
      });
      setErrors({});
      navigate("/");
      fetchUserProfile();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, width: "100%", maxWidth: 600 }}>
        <Typography variant="h4" mb={3} align="center" fontWeight="bold">
          Add Employee
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {/* Image */}
            <TextField
              label="Employee Image"
              name="image"
              type="file"
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.image)}
              helperText={errors.image}
            />

            {/* Name */}
            <TextField
              label="Employee Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.name)}
              helperText={errors.name}
            />

            {/* DOB */}
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

            {/* Mobile */}
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

            {/* Email */}
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

            {/* Role */}
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

            {/* Salary */}
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

            {/* Address */}
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

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? "Adding..." : "Add Employee Data"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AddEmployee;
