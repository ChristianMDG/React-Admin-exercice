// interns/InternEdit.tsx
import {
  Edit,
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

export const InternEdit = () => {
  return (
    <Edit>
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
        <TextInput
          source="department"
          label="Département"
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
                name: `${m.first_name} ${m.last_name}`,
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
                    ? "Sélectionnez d'abord un département"
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
    </Edit>
  );
};
