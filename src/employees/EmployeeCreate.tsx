import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberField,
  BooleanField,
} from "react-admin";

const choices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
];
export const EmployeeCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="firstname" label="Prénom" />
      <TextInput source="lastname" label="Nom" />
      <TextInput source="email" label="Email" />
      <SelectInput source="department" label="Département" choices={choices} />
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="active" label="Actif" />
    </SimpleForm>
  </Create>
);
