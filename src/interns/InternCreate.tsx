import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  NumberInput,
  required,
  email,
  FormDataConsumer,
} from "react-admin";
import { useGetList } from "react-admin";

const departmentChoices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

export const InternCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="first_name"
          label="First Name"
          validate={required()}
          fullWidth
        />
        <TextInput
          source="last_name"
          label="Last Name"
          validate={required()}
          fullWidth
        />
        <TextInput
          source="email"
          label="Email"
          validate={[required(), email()]}
          fullWidth
        />
        <SelectInput
          source="department"
          label="Department"
          choices={departmentChoices}
          validate={required()}
          fullWidth
        />

        <FormDataConsumer>
          {({ formData }) => {
            const department = formData.department;

            const { data: managers, isLoading } = useGetList("employees", {
              filter: {
                active: true,
                department: department,
              },
              enabled: !!department,
              pagination: { page: 1, perPage: 100 },
            });

            const managerChoices =
              managers?.map((m: any) => ({
                id: m.id,
                name: `${m.firstname} ${m.lastname}`,
              })) || [];

            return (
              <SelectInput
                source="managerId"
                label="Manager"
                choices={managerChoices}
                validate={required()}
                disabled={isLoading || !department}
                helperText={
                  !department
                    ? "Select the department first"
                    : "Active managers in the same department"
                }
                fullWidth
              />
            );
          }}
        </FormDataConsumer>

        <BooleanInput source="isRemunerated" label="Remunerated Intern?" />

        <FormDataConsumer>
          {({ formData }) => {
            const isRemunerated = formData.isRemunerated;

            const validateRemuneration = (value: number) => {
              if (isRemunerated && !value) {
                return "Remuneration is required for a remunerated intern";
              }
              return undefined;
            };

            return isRemunerated ? (
              <NumberInput
                source="remuneration"
                label="Remuneration (€)"
                validate={validateRemuneration}
                min={0}
                fullWidth
              />
            ) : null;
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
};
