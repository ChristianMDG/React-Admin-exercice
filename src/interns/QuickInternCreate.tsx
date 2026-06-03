import { useCreate, useNotify, useRefresh, useGetList } from "react-admin";
import { SimpleForm, TextInput, SelectInput, required } from "react-admin";
import {
  DialogContent,
  DialogActions,
  Button,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";

const QuickInternCreate = ({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const [create, { isLoading, error }] = useCreate();
  const notify = useNotify();
  const refresh = useRefresh();

  const {
    data: managers,
    isLoading: isLoadingManagers,
    error: managersError,
  } = useGetList("employees", {
    filter: { active: true },
    pagination: { page: 1, perPage: 100 },
    sort: { field: "firstname", order: "ASC" },
  });

  const managerChoices =
    managers?.map((manager: any) => ({
      id: manager.id,
      name: `${manager.firstname} ${manager.lastname}`,
    })) || [];

  const handleSubmit = (data: any) => {
    const selectedManager = managers?.find(
      (m: any) => m.id === parseInt(data.managerId),
    );
    const defaultEmail = `${data.first_name.toLowerCase()}.${data.last_name.toLowerCase()}@intern.com`;

    create(
      "interns",
      {
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: defaultEmail,
          department: selectedManager?.department || "Not specified",
          managerId: parseInt(data.managerId),
          isRemunerated: false,
          remuneration: null,
        },
      },
      {
        onSuccess: () => {
          notify("Intern created successfully!", { type: "success" });
          refresh();
          onSuccess();
        },
        onError: (err) => {
          notify(`Error: ${err.message}`, { type: "error" });
        },
      },
    );
  };

  return (
    <>
      <DialogContent>
        {(error || managersError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error?.message || managersError?.message || "An error occurred"}
          </Alert>
        )}

        {isLoadingManagers ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
            <Box ml={2}>Loading managers...</Box>
          </Box>
        ) : managerChoices.length === 0 ? (
          <Alert severity="warning" sx={{ mb: 2 }}>
            No active managers available. Please create an active manager first.
          </Alert>
        ) : (
          <SimpleForm onSubmit={handleSubmit} toolbar={null}>
            <TextInput
              source="first_name"
              label="First Name"
              validate={required()}
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              source="last_name"
              label="Last Name"
              validate={required()}
              fullWidth
              disabled={isLoading}
            />
            <SelectInput
              source="managerId"
              label="Manager"
              choices={managerChoices}
              validate={required()}
              fullWidth
              disabled={isLoading}
            />
          </SimpleForm>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            const form = document.querySelector("form");
            if (form) {
              const event = new Event("submit", { bubbles: true });
              form.dispatchEvent(event);
            }
          }}
          disabled={
            isLoading || isLoadingManagers || managerChoices.length === 0
          }
          variant="contained"
          color="primary"
        >
          {isLoading ? <CircularProgress size={24} /> : "Create"}
        </Button>
      </DialogActions>
    </>
  );
};

export default QuickInternCreate;
