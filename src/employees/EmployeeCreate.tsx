import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  BooleanInput,
  required,
  minValue,
  email,
} from "react-admin";

const departmentChoices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

export const EmployeeCreate = () => (
  <Create title="New Employee" redirect="list">
    <SimpleForm>
      <TextInput
        source="firstname"
        label="First Name"
        validate={required("The first name is required")}
      />
      <TextInput
        source="lastname"
        label="Last Name"
        validate={required("The last name is required")}
      />
      <TextInput
        source="email"
        label="Email"
        validate={[
          required("The email is required"),
          email("The email is not valid"),
        ]}
      />
      <SelectInput
        source="department"
        label="Department"
        choices={departmentChoices}
        validate={required("The department is required")}
      />
      <NumberInput
        source="salary"
        label="Salary (€)"
        validate={[
          required("The salary is required"),
          minValue(1500, "The minimum salary is 1,500 €"),
        ]}
      />
      <BooleanInput source="active" label="Active" />
    </SimpleForm>
  </Create>
);
