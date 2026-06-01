import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  SelectInput,
  SearchInput,
  TextInput,
} from "react-admin";

const choices = [
  { id: "informatique", name: "Informatique" },
  { id: "marketing", name: "Marketing" },
  { id: "rh", name: "RH" },
];

const employeeFilters = [
  <SearchInput key="q" source="q" alwaysOn />,
  <SelectInput key="department" source="department" choices={choices} />,
  <TextInput key="firstname" source="firstname" />,
  <TextInput key="lastname" source="lastname" />,
];
export const EmployeeList = () => (
  <List filters={employeeFilters}>
    <Datagrid rowClick="edit">
      <TextField source="firstname" label="Prénom / Nom" />
      <TextField source="lastname" />
      <TextField source="email" label="Email" />
      <TextField source="department" label="Département" />
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="active" label="Actif" />
    </Datagrid>
  </List>
);
