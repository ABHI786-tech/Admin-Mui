import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { axiosClient } from "../utils/axios";

/* ================= Styled Components ================= */

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/* ================= Component ================= */

const AllEmployee = () => {
  const [employeeData, setEmployeeData] = useState([]);

  const getEmployee = async () => {
    try {
      const res = await axiosClient.get("/allemployee", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setEmployeeData(res.data.employees);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      const res = await axiosClient.delete(`/employee/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      toast.success(res.message || "Employee deleted successfully");
      getEmployee();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" align="center" mb={4}>
        All Employees Details
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead  sx={{backgroundColor:"primary"}}>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employeeData.map((employee) => (
              <StyledTableRow key={employee._id}>
                <StyledTableCell align="center">
                  {employee.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.mobile}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.email}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                  >
                    {/* <Button
                      component={Link}
                      to={`/rights/populate?id=${employee._id}`}
                      variant="contained"
                      size="small"
                    >
                      View
                    </Button> */}

                    <Button
                      component={Link}
                      to={`/updateemployee/${employee._id}`}
                      variant="contained"
                      color="success"
                      size="small"
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => deleteEmployee(employee._id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllEmployee;
