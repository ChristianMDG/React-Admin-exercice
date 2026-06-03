import {
  Show,
  SimpleShowLayout,
  TextField,
  EmailField,
  BooleanField,
  NumberField,
  ReferenceField,
} from "react-admin";
import ManagerCard from "./ManagerCard";

export const InternShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="first_name" label="Prénom" />
      <TextField source="last_name" label="Nom" />
      <EmailField source="email" label="Email" />
      <TextField source="department" label="Département" />

      <ReferenceField
        source="managerId"
        reference="employees"
        label="Manager"
        link="show"
      >
        <TextField source="firstname" /> <TextField source="lastname" />
      </ReferenceField>

      <BooleanField source="isRemunerated" label="Rémunéré ?" />
      <NumberField
        source="remuneration"
        label="Rémunération"
        options={{ style: "currency", currency: "EUR" }}
      />

      <ManagerCard />
    </SimpleShowLayout>
  </Show>
);
