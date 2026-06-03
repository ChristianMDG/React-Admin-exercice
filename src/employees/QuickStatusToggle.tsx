// employees/QuickStatusToggle.tsx
import {
  useRecordContext,
  useUpdate,
  useNotify,
  useRefresh,
} from "react-admin";
import { Button, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const QuickStatusToggle = () => {
  const record = useRecordContext();

  const notify = useNotify();
  const refresh = useRefresh();

  const [update, { isLoading }] = useUpdate();

  if (!record) return null;

  const handleToggle = () => {
    update(
      "employees", // Ressource
      {
        id: record.id,
        data: {
          active: !record.active,
        },
        previousData: record,
      },
      {
        onSuccess: () => {
          notify(
            `Employé ${record.first_name} ${record.last_name} ${
              record.active ? "désactivé" : "activé"
            } avec succès`,
            { type: "success" },
          );
          refresh();
        },
        onError: (error) => {
          notify(`Erreur lors de la modification : ${error.message}`, {
            type: "error",
          });
        },
      },
    );
  };

  return (
    <Button
      variant="contained"
      color={record.active ? "error" : "success"}
      onClick={handleToggle}
      disabled={isLoading}
      size="small"
      startIcon={
        isLoading ? (
          <CircularProgress size={16} color="inherit" />
        ) : record.active ? (
          <CancelIcon />
        ) : (
          <CheckCircleIcon />
        )
      }
      sx={{
        minWidth: 100,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      {isLoading ? "Chargement..." : record.active ? "Désactiver" : "Activer"}
    </Button>
  );
};

export default QuickStatusToggle;
