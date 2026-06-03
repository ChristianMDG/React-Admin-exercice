import {
  List,
  Datagrid,
  TextField,
  EmailField,
  ReferenceField,
  BooleanField,
  NumberField,
  DeleteButton,
  EditButton,
} from "react-admin";

import { Button, Dialog } from "@mui/material";
import { useState } from "react";
import QuickInternCreate from "./QuickInternCreate";

export default function InternList() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <List title="List of Interns">
        <Datagrid rowClick="edit">
          <TextField source="first_name" label="First Name" />
          <TextField source="last_name" label="Last Name" />
          <EmailField source="email" label="Email" />
          <TextField source="department" label="Department" />
          <ReferenceField
            source="managerId"
            reference="employees"
            label="Manager"
            link="show"
          >
            <TextField source="firstname" />
            <TextField source="lastname" />
          </ReferenceField>
          <BooleanField source="isRemunerated" label="Remunerated?" />
          <NumberField
            source="remuneration"
            label="Remuneration"
            options={{ style: "currency", currency: "EUR" }}
          />
          <EditButton />
          <DeleteButton mutationMode="pessimistic" />
        </Datagrid>
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
        sx={{ m: 2 }}
      >
        Ajouter un stagiaire rapide
      </Button>

      {/* Modale avec formulaire */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <QuickInternCreate
          onSuccess={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        />
      </Dialog>
    </>
  );
}
