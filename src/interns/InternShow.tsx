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
        <TextField source="firstname" /> <TextField source="lastname" />
      </ReferenceField>

      <BooleanField source="isRemunerated" label="Remunerated?" />
      <NumberField
        source="remuneration"
        label="Remuneration"
        options={{ style: "currency", currency: "EUR" }}
      />

      <ManagerCard />
    </SimpleShowLayout>
  </Show>
);
