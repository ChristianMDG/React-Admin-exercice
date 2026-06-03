import { useRecordContext, useGetList } from "react-admin";
import { Typography, Paper, Box, CircularProgress } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

const DepartmentStats = () => {
  const employee = useRecordContext();

  const { total, isLoading } = useGetList("employees", {
    filter: {
      department: employee?.department,
      active: true,
    },
    pagination: { page: 1, perPage: 1 },
    enabled: !!employee?.department,
  });

  if (!employee?.department) return null;
  if (isLoading) {
    return (
      <Paper sx={{ mt: 2, p: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <CircularProgress size={20} />
          <Typography>Loading the statistics...</Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ mt: 2, p: 2, bgcolor: "#48844d" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <GroupIcon color="success" />
        <Typography variant="body1">
          <strong>{employee.department}</strong> :
          <strong
            style={{ fontSize: "1.2rem", marginLeft: "8px", color: "#2e7d32" }}
          >
            {total || 0}
          </strong>{" "}
          Coworker(s) actif(s) in the department
        </Typography>
      </Box>
    </Paper>
  );
};

export default DepartmentStats;
