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
import QuickStatusToggle from "./QuickStatusToggle";

const choices = [
  { id: "informatique", name: "Informatique" },
  { id: "marketing", name: "Marketing" },
  { id: "rh", name: "RH" },
];

const employeeFilters = [
  <SearchInput key="q" source="q" alwaysOn />,
  <SelectInput key="department" source="department" choices={choices} />,
  <TextInput key="firstname" source="firstname" label="First Name" />,
  <TextInput key="lastname" source="lastname" label="Last Name" />,
];
export const EmployeeList = () => (
  <List filters={employeeFilters} perPage={5} title="List of Employees">
    <Datagrid rowClick="edit">
      <TextField source="firstname" label="First Name" />
      <TextField source="lastname" label="Last Name" />
      <TextField source="email" label="Email" />
      <TextField source="department" label="Department" />
      <NumberField
        source="salary"
        label="Salary"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="active" label="Active" />
      <QuickStatusToggle label="Toggle Status" />
    </Datagrid>
  </List>
);
