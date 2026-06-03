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
          label="Prénom"
          validate={required()}
          fullWidth
        />
        <TextInput
          source="last_name"
          label="Nom"
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
          label="Département"
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
                    ? "Select the departement first"
                    : "Managers actifs du même département"
                }
                fullWidth
              />
            );
          }}
        </FormDataConsumer>

        <BooleanInput source="isRemunerated" label="Stagiaire rémunéré ?" />

        <FormDataConsumer>
          {({ formData }) => {
            const isRemunerated = formData.isRemunerated;

            const validateRemuneration = (value: number) => {
              if (isRemunerated && !value) {
                return "La rémunération est obligatoire pour un stagiaire rémunéré";
              }
              return undefined;
            };

            return isRemunerated ? (
              <NumberInput
                source="remuneration"
                label="Rémunération (€)"
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
