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
            Aucun manager assigné à ce stagiaire
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
            <Typography>Chargement des informations du manager...</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Alert severity="error">
            Erreur lors du chargement du manager : {error.message}
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!manager) {
    return (
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Alert severity="warning">
            Manager introuvable (ID: {managerId})
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mt: 2, bgcolor: "#5e9778" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Informations du manager
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography>
            <strong>Nom complet :</strong>{" "}
            <Link
              component={RouterLink}
              to={`/employees/${manager.id}/show`}
              underline="hover"
            >
              {manager.firstname} {manager.lastname}
            </Link>
          </Typography>

          <Typography>
            <strong>Département :</strong> {manager.department}
          </Typography>

          <Typography>
            <strong>Email :</strong>{" "}
            <Link href={`mailto:${manager.email}`} underline="hover">
              {manager.email}
            </Link>
          </Typography>

          <Typography>
            <strong>Statut :</strong>{" "}
            {manager.active ? (
              <span style={{ color: "green", fontWeight: "bold" }}>Actif</span>
            ) : (
              <span style={{ color: "red", fontWeight: "bold" }}>Inactif</span>
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ManagerCard;
