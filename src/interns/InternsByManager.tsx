import { useRecordContext, useGetList } from "react-admin";
import {
  Typography,
  List,
  ListItem,
  Link,
  CircularProgress,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

const InternsByManager = () => {
  const employee = useRecordContext();

  const {
    data: interns,
    isLoading,
    total,
  } = useGetList("interns", {
    filter: { managerId: employee?.id },
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
    enabled: !!employee?.id && employee?.active === true,
  });

  if (!employee?.id) return null;

  if (!employee.active) {
    return (
      <Paper sx={{ mt: 3, p: 2, bgcolor: "#fff3e0" }}>
        <Typography color="warning.main">
          This manager is inactive and cannot supervise interns.
        </Typography>
      </Paper>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <CircularProgress size={24} />
        <Typography>Loading interns...</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ mt: 3, p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <PersonIcon color="primary" />
        <Typography variant="h6">Supervised Interns ({total || 0})</Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />

      {interns && interns.length > 0 ? (
        <List>
          {interns.map((intern: any) => (
            <ListItem key={intern.id} sx={{ pl: 0 }}>
              <Link
                component={RouterLink}
                to={`/interns/${intern.id}/show`}
                underline="hover"
                sx={{ fontWeight: 500 }}
              >
                {intern.first_name} {intern.last_name}
              </Link>
              <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
                - {intern.department}
              </Typography>
              {intern.isRemunerated && (
                <Typography variant="body2" color="success.main" sx={{ ml: 1 }}>
                  (Remunerated: {intern.remuneration}€)
                </Typography>
              )}
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="textSecondary" sx={{ py: 2 }}>
          No interns supervised by {employee.firstname} {employee.lastname}
        </Typography>
      )}
    </Paper>
  );
};

export default InternsByManager;
