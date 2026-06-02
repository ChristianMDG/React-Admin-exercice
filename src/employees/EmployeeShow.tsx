import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  EmailField,
  TopToolbar,
  ListButton,
  EditButton,
} from "react-admin";

const EmployeeShowActions = () => (
  <TopToolbar>
    <ListButton label="Return to list" />
    <EditButton />
  </TopToolbar>
);

export const EmployeeShow = () => (
  <Show actions={<EmployeeShowActions />} title="Employee Profile">
    <SimpleShowLayout>
      <TextField source="firstname" label="First Name" />
      <TextField source="lastname" label="Last Name" />
      <EmailField source="email" label="Email" />
      <TextField source="department" label="Department" />
      <NumberField
        source="salary"
        label="Salary"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="active" label="Active" />
    </SimpleShowLayout>
  </Show>
);
