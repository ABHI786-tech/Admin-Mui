import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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

const AllRights = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchParams] = useSearchParams();
  const queryParamValue = searchParams.get("id");

  /* ===== Fetch Rights ===== */
  const getRights = async () => {
    try {
      const url = queryParamValue
        ? `/rights/populate?employee_id=${queryParamValue}`
        : `/rights/populate`;

      const res = await axiosClient.get(url);
      setEmployeeData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRights();
  }, []);

  /* ===== Delete Rights ===== */
  const deleteRights = async (id) => {
    try {
      await axiosClient.delete(`/rights/${id}`);
      toast.success("Right deleted successfully");
      getRights();
    } catch (error) {
      toast.error("Failed to delete right");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" align="center" mb={4}>
        All Rights
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                Employee Name
              </StyledTableCell>
              <StyledTableCell align="center">
                Task
              </StyledTableCell>
              <StyledTableCell align="center">
                Status
              </StyledTableCell>
              <StyledTableCell align="center">
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employeeData.length > 0 ? (
              employeeData.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell align="center">
                    {item?.employee_id?.name}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {item.right}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {item.status || "Active"}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                    >
                      <Button
                        component={Link}
                        to={`/rights/${item._id}`}
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
                        onClick={() => deleteRights(item._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No rights found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllRights;
