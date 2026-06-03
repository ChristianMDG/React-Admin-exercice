// interns/ManagerCard.tsx
import { useRecordContext, useGetOne } from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  Link,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ManagerCard = () => {
  const record = useRecordContext();
  const managerId = record?.managerId;

  const {
    data: manager,
    isLoading,
    error,
  } = useGetOne("employees", {
    id: managerId,
    enabled: !!managerId,
  });

  if (!record) return null;

  if (!managerId) {
    return (
      <Card sx={{ mt: 2, bgcolor: "#b88533" }}>
        <CardContent>
          <Typography color="textSecondary">
            No manager assigned to this intern
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={24} />
            <Typography>Loading manager information...</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Alert severity="error">Error loading manager: {error.message}</Alert>
        </CardContent>
      </Card>
    );
  }

  if (!manager) {
    return (
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Alert severity="warning">Manager not found (ID: {managerId})</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mt: 2, bgcolor: "#5e9778" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Manager Information
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography>
            <strong>Full Name:</strong>{" "}
            <Link
              component={RouterLink}
              to={`/employees/${manager.id}/show`}
              underline="hover"
            >
              {manager.firstname} {manager.lastname}
            </Link>
          </Typography>

          <Typography>
            <strong>Department:</strong> {manager.department}
          </Typography>

          <Typography>
            <strong>Email:</strong>{" "}
            <Link href={`mailto:${manager.email}`} underline="hover">
              {manager.email}
            </Link>
          </Typography>

          <Typography>
            <strong>Status:</strong>{" "}
            {manager.active ? (
              <span style={{ color: "green", fontWeight: "bold" }}>Active</span>
            ) : (
              <span style={{ color: "red", fontWeight: "bold" }}>Inactive</span>
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ManagerCard;
