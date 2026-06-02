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
export default function InternList() {
  return (
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
        <BooleanField source="isRemunerated" label="Rémunéré ?" />
        <NumberField
          source="remuneration"
          label="Rémunération"
          options={{ style: "currency", currency: "EUR" }}
        />
        <EditButton />
        <DeleteButton mutationMode="pessimistic" />
      </Datagrid>
    </List>
  );
}
